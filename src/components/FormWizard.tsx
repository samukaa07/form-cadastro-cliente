import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addressFields,
  cadastroSchema,
  personalDataFields,
  professionalFields,
  type CadastroFormValues,
} from '../schemas/cadastroSchema';
import { StepIndicator } from './StepIndicator';
import { PersonalDataStep } from './steps/PersonalDataStep';
import { AddressStep } from './steps/AddressStep';
import { ProfessionalStep } from './steps/ProfessionalStep';
import { SummaryStep } from './steps/SummaryStep';

const STORAGE_KEY = 'cadastro-cliente-form';

const emptyValues: CadastroFormValues = {
  fullName: '',
  birthDate: '',
  cpf: '',
  phone: '',
  email: '',
  cep: '',
  address: '',
  neighborhood: '',
  city: '',
  state: '',
  company: '',
  profession: '',
  salary: '',
  companyTime: '',
};

function getDefaultValues(): CadastroFormValues {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return emptyValues;

  try {
    return { ...emptyValues, ...JSON.parse(saved) };
  } catch {
    return emptyValues;
  }
}

const stepFieldsByStep = [personalDataFields, addressFields, professionalFields];

export function FormWizard() {
  const [step, setStep] = useState(1);

  const methods = useForm<CadastroFormValues>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: getDefaultValues(),
    mode: 'onBlur',
  });

  const { watch, trigger, handleSubmit } = methods;

  // Persiste os dados a cada alteração para não perder nada ao trocar de etapa/recarregar.
  useEffect(() => {
    const subscription = watch((values) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  async function handleNext() {
    const fieldsToValidate = stepFieldsByStep[step - 1];
    const valid = await trigger(fieldsToValidate);

    if (valid) {
      setStep((current) => current + 1);
    }
  }

  function handleBack() {
    setStep((current) => current - 1);
  }

  function handleFinish() {
    // A validação completa já ocorreu ao longo das etapas anteriores.
    setStep(4);
  }

  function handleNovoCadastro() {
    localStorage.removeItem(STORAGE_KEY);
    methods.reset(emptyValues);
    setStep(1);
  }

  return (
    <FormProvider {...methods}>
      <div className="form-wizard">
        <StepIndicator currentStep={step} />

        <form onSubmit={handleSubmit(handleFinish)}>
          {step === 1 && <PersonalDataStep />}
          {step === 2 && <AddressStep />}
          {step === 3 && <ProfessionalStep />}
          {step === 4 && <SummaryStep />}

          <div className="form-actions">
            {step > 1 && step < 4 && (
              <button type="button" className="btn btn-secondary" onClick={handleBack}>
                Voltar
              </button>
            )}

            {step < 3 && (
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Próximo
              </button>
            )}

            {step === 3 && (
              <button type="submit" className="btn btn-primary">
                Finalizar
              </button>
            )}

            {step === 4 && (
              <button type="button" className="btn btn-secondary" onClick={handleNovoCadastro}>
                Novo Cadastro
              </button>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

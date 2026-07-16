import { useFormContext, Controller } from 'react-hook-form';
import type { CadastroFormValues } from '../../schemas/cadastroSchema';
import { maskCPF, maskDate, maskPhone } from '../../utils/masks';
import { FormField } from '../FormField';

export function PersonalDataStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CadastroFormValues>();

  return (
    <div className="step">
      <h2>Dados Pessoais</h2>

      <FormField label="Nome completo" htmlFor="fullName" error={errors.fullName?.message}>
        <input id="fullName" type="text" placeholder="Digite seu nome completo" {...register('fullName')} />
      </FormField>

      <div className="form-row">
        <FormField label="Data de Nascimento" htmlFor="birthDate" error={errors.birthDate?.message}>
          <Controller
            name="birthDate"
            control={control}
            render={({ field }) => (
              <input
                id="birthDate"
                type="text"
                inputMode="numeric"
                placeholder="dd/mm/aaaa"
                maxLength={10}
                {...field}
                onChange={(event) => field.onChange(maskDate(event.target.value))}
              />
            )}
          />
        </FormField>

        <FormField label="CPF" htmlFor="cpf" error={errors.cpf?.message}>
          <Controller
            name="cpf"
            control={control}
            render={({ field }) => (
              <input
                id="cpf"
                type="text"
                inputMode="numeric"
                placeholder="000.000.000-00"
                maxLength={14}
                {...field}
                onChange={(event) => field.onChange(maskCPF(event.target.value))}
              />
            )}
          />
        </FormField>
      </div>

      <div className="form-row">
        <FormField label="Telefone" htmlFor="phone" error={errors.phone?.message}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input
                id="phone"
                type="text"
                inputMode="numeric"
                placeholder="(00) 00000-0000"
                maxLength={15}
                {...field}
                onChange={(event) => field.onChange(maskPhone(event.target.value))}
              />
            )}
          />
        </FormField>

        <FormField label="Email" htmlFor="email" error={errors.email?.message}>
          <input id="email" type="email" placeholder="voce@email.com" {...register('email')} />
        </FormField>
      </div>
    </div>
  );
}

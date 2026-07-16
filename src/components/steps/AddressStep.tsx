import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { CadastroFormValues } from '../../schemas/cadastroSchema';
import { maskCEP } from '../../utils/masks';
import { buscarEnderecoPorCep } from '../../services/cepService';
import { FormField } from '../FormField';

export function AddressStep() {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<CadastroFormValues>();

  const [buscandoCep, setBuscandoCep] = useState(false);
  const [cepNaoEncontrado, setCepNaoEncontrado] = useState(false);

  async function handleCepBlur(cep: string) {
    const digits = cep.replace(/\D/g, '');
    if (digits.length !== 8) return;

    setBuscandoCep(true);
    setCepNaoEncontrado(false);

    try {
      const endereco = await buscarEnderecoPorCep(digits);

      if (!endereco) {
        setCepNaoEncontrado(true);
        return;
      }

      setValue('address', endereco.logradouro, { shouldValidate: true });
      setValue('neighborhood', endereco.bairro, { shouldValidate: true });
      setValue('city', endereco.localidade, { shouldValidate: true });
      setValue('state', endereco.uf, { shouldValidate: true });
    } catch (error) {
      console.error('Erro ao buscar CEP', error);
      setCepNaoEncontrado(true);
    } finally {
      setBuscandoCep(false);
    }
  }

  return (
    <div className="step">
      <h2>Informações Residenciais</h2>

      <FormField label="CEP" htmlFor="cep" error={errors.cep?.message}>
        <Controller
          name="cep"
          control={control}
          render={({ field }) => (
            <input
              id="cep"
              type="text"
              inputMode="numeric"
              placeholder="00000-000"
              maxLength={9}
              {...field}
              onChange={(event) => field.onChange(maskCEP(event.target.value))}
              onBlur={(event) => {
                field.onBlur();
                handleCepBlur(event.target.value);
              }}
            />
          )}
        />
        {buscandoCep && <span className="field-hint">Buscando endereço...</span>}
        {cepNaoEncontrado && <span className="field-error">CEP não encontrado</span>}
      </FormField>

      <FormField label="Endereço" htmlFor="address" error={errors.address?.message}>
        <input id="address" type="text" placeholder="Rua, avenida..." {...register('address')} />
      </FormField>

      <div className="form-row">
        <FormField label="Bairro" htmlFor="neighborhood" error={errors.neighborhood?.message}>
          <input id="neighborhood" type="text" {...register('neighborhood')} />
        </FormField>

        <FormField label="Cidade" htmlFor="city" error={errors.city?.message}>
          <input id="city" type="text" {...register('city')} />
        </FormField>
      </div>

      <FormField label="Estado" htmlFor="state" error={errors.state?.message}>
        <input id="state" type="text" maxLength={2} placeholder="UF" {...register('state')} />
      </FormField>
    </div>
  );
}

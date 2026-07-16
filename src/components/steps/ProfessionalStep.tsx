import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { CadastroFormValues } from '../../schemas/cadastroSchema';
import { maskCurrency } from '../../utils/masks';
import { buscarProfissoes } from '../../services/professionService';
import type { Profession } from '../../types/form';
import { FormField } from '../FormField';

export function ProfessionalStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CadastroFormValues>();

  const [profissoes, setProfissoes] = useState<Profession[]>([]);
  const [carregandoProfissoes, setCarregandoProfissoes] = useState(true);
  const [erroProfissoes, setErroProfissoes] = useState(false);

  useEffect(() => {
    buscarProfissoes()
      .then(setProfissoes)
      .catch((error) => {
        console.error('Erro ao carregar profissões', error);
        setErroProfissoes(true);
      })
      .finally(() => setCarregandoProfissoes(false));
  }, []);

  return (
    <div className="step">
      <h2>Informações Profissionais</h2>

      <FormField label="Empresa" htmlFor="company" error={errors.company?.message}>
        <input id="company" type="text" placeholder="Nome da empresa" {...register('company')} />
      </FormField>

      <FormField label="Profissão" htmlFor="profession" error={errors.profession?.message}>
        <select id="profession" {...register('profession')} disabled={carregandoProfissoes}>
          <option value="">
            {carregandoProfissoes ? 'Carregando profissões...' : 'Selecione uma profissão'}
          </option>
          {profissoes.map((profissao) => (
            <option key={profissao.id} value={profissao.nome}>
              {profissao.nome}
            </option>
          ))}
        </select>
        {erroProfissoes && (
          <span className="field-error">
            Não foi possível carregar a lista de profissões. Verifique se o json-server está rodando.
          </span>
        )}
      </FormField>

      <div className="form-row">
        <FormField label="Salário" htmlFor="salary" error={errors.salary?.message}>
          <Controller
            name="salary"
            control={control}
            render={({ field }) => (
              <div className="input-with-prefix">
                <span>R$</span>
                <input
                  id="salary"
                  type="text"
                  inputMode="numeric"
                  placeholder="0,00"
                  {...field}
                  onChange={(event) => field.onChange(maskCurrency(event.target.value))}
                />
              </div>
            )}
          />
        </FormField>

        <FormField label="Tempo de Empresa" htmlFor="companyTime" error={errors.companyTime?.message}>
          <input id="companyTime" type="text" placeholder="Ex: 2 anos e 3 meses" {...register('companyTime')} />
        </FormField>
      </div>
    </div>
  );
}

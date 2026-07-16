import { useFormContext } from 'react-hook-form';
import type { CadastroFormValues } from '../../schemas/cadastroSchema';
import { exportarResumoPdf } from '../../utils/pdfExport';

export function SummaryStep() {
  const { getValues } = useFormContext<CadastroFormValues>();
  const data = getValues();

  return (
    <div className="step">
      <h2>Resumo do Cadastro</h2>

      <section className="summary-section">
        <h3>Dados Pessoais</h3>
        <p>
          <strong>Nome completo:</strong> {data.fullName}
        </p>
        <p>
          <strong>Data de Nascimento:</strong> {data.birthDate}
        </p>
        <p>
          <strong>CPF:</strong> {data.cpf}
        </p>
        <p>
          <strong>Telefone:</strong> {data.phone}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
      </section>

      <section className="summary-section">
        <h3>Informações Residenciais</h3>
        <p>
          <strong>CEP:</strong> {data.cep}
        </p>
        <p>
          <strong>Endereço:</strong> {data.address}
        </p>
        <p>
          <strong>Bairro:</strong> {data.neighborhood}
        </p>
        <p>
          <strong>Cidade:</strong> {data.city}
        </p>
        <p>
          <strong>Estado:</strong> {data.state}
        </p>
      </section>

      <section className="summary-section">
        <h3>Informações Profissionais</h3>
        <p>
          <strong>Empresa:</strong> {data.company}
        </p>
        <p>
          <strong>Profissão:</strong> {data.profession}
        </p>
        <p>
          <strong>Salário:</strong> R$ {data.salary}
        </p>
        <p>
          <strong>Tempo de Empresa:</strong> {data.companyTime}
        </p>
      </section>

      <button type="button" className="btn btn-primary" onClick={() => exportarResumoPdf(data)}>
        Exportar PDF
      </button>
    </div>
  );
}

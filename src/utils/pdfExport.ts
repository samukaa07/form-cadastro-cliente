import jsPDF from 'jspdf';
import type { CadastroFormValues } from '../schemas/cadastroSchema';

export function exportarResumoPdf(data: CadastroFormValues): void {
  const doc = new jsPDF();
  const marginX = 15;
  let y = 20;

  doc.setFontSize(16);
  doc.text('Resumo do Cadastro', marginX, y);

  y += 12;
  doc.setFontSize(12);

  const addSection = (title: string) => {
    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.text(title, marginX, y);
    doc.setFont('helvetica', 'normal');
    y += 8;
  };

  const addLine = (label: string, value: string) => {
    doc.text(`${label}: ${value}`, marginX, y);
    y += 7;
  };

  addSection('Dados Pessoais');
  addLine('Nome completo', data.fullName);
  addLine('Data de nascimento', data.birthDate);
  addLine('CPF', data.cpf);
  addLine('Telefone', data.phone);
  addLine('E-mail', data.email);

  addSection('Informações Residenciais');
  addLine('CEP', data.cep);
  addLine('Endereço', data.address);
  addLine('Bairro', data.neighborhood);
  addLine('Cidade', data.city);
  addLine('Estado', data.state);

  addSection('Informações Profissionais');
  addLine('Empresa', data.company);
  addLine('Profissão', data.profession);
  addLine('Salário', `R$ ${data.salary}`);
  addLine('Tempo de empresa', data.companyTime);

  doc.save(`cadastro-${data.fullName.trim().replace(/\s+/g, '-').toLowerCase()}.pdf`);
}

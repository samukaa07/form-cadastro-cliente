import { describe, expect, it, vi } from 'vitest';
import { exportarResumoPdf } from '../pdfExport';
import type { CadastroFormValues } from '../../schemas/cadastroSchema';

const save = vi.fn();

vi.mock('jspdf', () => {
  return {
    default: vi.fn().mockImplementation(function MockJsPdf(this: Record<string, unknown>) {
      this.save = save;
      this.text = vi.fn();
      this.setFontSize = vi.fn();
      this.setFont = vi.fn();
    }),
  };
});

const dadosCompletos: CadastroFormValues = {
  fullName: 'Maria da Silva',
  birthDate: '10/03/1992',
  cpf: '111.444.777-35',
  phone: '(11) 91234-5678',
  email: 'maria@email.com',
  cep: '01310-100',
  address: 'Av. Paulista',
  neighborhood: 'Bela Vista',
  city: 'São Paulo',
  state: 'SP',
  company: 'Empresa X',
  profession: 'Desenvolvedor de Software',
  salary: '5.000,00',
  companyTime: '3 anos',
};

describe('exportarResumoPdf', () => {
  it('gera o PDF e chama save com o nome do arquivo baseado no nome do cliente', () => {
    exportarResumoPdf(dadosCompletos);

    expect(save).toHaveBeenCalledWith('cadastro-maria-da-silva.pdf');
  });
});

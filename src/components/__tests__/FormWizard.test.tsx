import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormWizard } from '../FormWizard';
import { buscarProfissoes } from '../../services/professionService';
import { buscarEnderecoPorCep } from '../../services/cepService';

vi.mock('../../services/professionService');
vi.mock('../../services/cepService');
vi.mock('jspdf', () => {
  return {
    default: vi.fn().mockImplementation(function MockJsPdf(this: Record<string, unknown>) {
      this.save = vi.fn();
      this.text = vi.fn();
      this.setFontSize = vi.fn();
      this.setFont = vi.fn();
    }),
  };
});

const profissoesMock = [
  { id: 1, nome: 'Desenvolvedor de Software' },
  { id: 2, nome: 'Analista de Sistemas' },
];

async function preencherEtapaPessoal(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Nome completo'), 'Maria da Silva');
  await user.type(screen.getByLabelText('Data de Nascimento'), '10031992');
  await user.type(screen.getByLabelText('CPF'), '11144477735');
  await user.type(screen.getByLabelText('Telefone'), '11912345678');
  await user.type(screen.getByLabelText('Email'), 'maria@email.com');
  await user.click(screen.getByRole('button', { name: 'Próximo' }));
}

async function preencherEtapaEndereco(user: ReturnType<typeof userEvent.setup>) {
  await waitFor(() =>
    expect(screen.getByRole('heading', { name: 'Informações Residenciais' })).toBeInTheDocument()
  );
  await user.type(screen.getByLabelText('Endereço'), 'Av. Paulista');
  await user.type(screen.getByLabelText('Bairro'), 'Bela Vista');
  await user.type(screen.getByLabelText('Cidade'), 'São Paulo');
  await user.type(screen.getByLabelText('Estado'), 'SP');
  await user.type(screen.getByLabelText('CEP'), '01310100');
  await user.click(screen.getByRole('button', { name: 'Próximo' }));
}

describe('FormWizard', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.mocked(buscarProfissoes).mockResolvedValue(profissoesMock);
    vi.mocked(buscarEnderecoPorCep).mockResolvedValue({
      logradouro: 'Av. Paulista',
      bairro: 'Bela Vista',
      localidade: 'São Paulo',
      uf: 'SP',
    });
  });

  it('exibe erros de validação ao tentar avançar sem preencher os campos', async () => {
    const user = userEvent.setup();
    render(<FormWizard />);

    await user.click(screen.getByRole('button', { name: 'Próximo' }));

    expect(await screen.findByText('Informe o nome completo')).toBeInTheDocument();
  });

  it('permite navegar pelas 3 etapas e visualizar o resumo', async () => {
    const user = userEvent.setup();
    render(<FormWizard />);

    await preencherEtapaPessoal(user);
    await preencherEtapaEndereco(user);

    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Informações Profissionais' })).toBeInTheDocument()
    );
    await user.type(screen.getByLabelText('Empresa'), 'Empresa X');
    await waitFor(() => expect(screen.getByLabelText('Profissão')).not.toBeDisabled());
    await user.selectOptions(screen.getByLabelText('Profissão'), 'Desenvolvedor de Software');
    await user.type(screen.getByLabelText('Salário'), '500000');
    await user.type(screen.getByLabelText('Tempo de Empresa'), '3 anos');

    await user.click(screen.getByRole('button', { name: 'Finalizar' }));

    expect(await screen.findByText('Resumo do Cadastro')).toBeInTheDocument();
    expect(screen.getByText(/Maria da Silva/)).toBeInTheDocument();
    expect(screen.getByText(/5.000,00/)).toBeInTheDocument();
  });

  it('permite voltar para a etapa anterior mantendo os dados preenchidos', async () => {
    const user = userEvent.setup();
    render(<FormWizard />);

    await preencherEtapaPessoal(user);
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Informações Residenciais' })).toBeInTheDocument()
    );

    await user.click(screen.getByRole('button', { name: 'Voltar' }));

    expect(await screen.findByDisplayValue('Maria da Silva')).toBeInTheDocument();
  });
});

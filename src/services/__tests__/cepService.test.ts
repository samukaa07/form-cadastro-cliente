import { describe, expect, it, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { buscarEnderecoPorCep } from '../cepService';

vi.mock('axios');

describe('buscarEnderecoPorCep', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('retorna null quando o CEP não tem 8 dígitos', async () => {
    const resultado = await buscarEnderecoPorCep('123');
    expect(resultado).toBeNull();
    expect(axios.get).not.toHaveBeenCalled();
  });

  it('retorna o endereço quando a busca é bem-sucedida', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: {
        logradouro: 'Praça da Sé',
        bairro: 'Sé',
        localidade: 'São Paulo',
        uf: 'SP',
      },
    });

    const resultado = await buscarEnderecoPorCep('01001-000');

    expect(axios.get).toHaveBeenCalledWith('https://viacep.com.br/ws/01001000/json/');
    expect(resultado).toEqual({
      logradouro: 'Praça da Sé',
      bairro: 'Sé',
      localidade: 'São Paulo',
      uf: 'SP',
    });
  });

  it('retorna null quando o CEP não existe', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: { erro: true } });

    const resultado = await buscarEnderecoPorCep('99999999');

    expect(resultado).toBeNull();
  });
});

import { describe, expect, it, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { buscarProfissoes } from '../professionService';

vi.mock('axios');

describe('buscarProfissoes', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('retorna a lista de profissões do serviço mockado', async () => {
    const profissoesMock = [
      { id: 1, nome: 'Desenvolvedor de Software' },
      { id: 2, nome: 'Analista de Sistemas' },
    ];

    vi.mocked(axios.get).mockResolvedValueOnce({ data: profissoesMock });

    const resultado = await buscarProfissoes();

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/professions');
    expect(resultado).toEqual(profissoesMock);
  });
});

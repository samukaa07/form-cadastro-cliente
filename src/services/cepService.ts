import axios from 'axios';

export interface CepResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

// Integração direta com o endpoint público do ViaCEP (opção "Plus" do desafio).
export async function buscarEnderecoPorCep(cep: string): Promise<CepResponse | null> {
  const digits = cep.replace(/\D/g, '');

  if (digits.length !== 8) return null;

  const { data } = await axios.get<CepResponse>(`https://viacep.com.br/ws/${digits}/json/`);

  if (data.erro) return null;

  return data;
}

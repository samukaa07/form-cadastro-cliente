import axios from 'axios';
import type { Profession } from '../types/form';

// Serviço mockado com json-server (ver mock-server/db.json).
const MOCK_API_URL = 'http://localhost:3001';

export async function buscarProfissoes(): Promise<Profession[]> {
  const { data } = await axios.get<Profession[]>(`${MOCK_API_URL}/professions`);
  return data;
}

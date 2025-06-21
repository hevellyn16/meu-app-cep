

import { VIA_CEP_API_URL } from '~/utils/constants/cepConstants';
import { CepData } from '~/types/cep';

interface ViaCepErrorResponse {
  erro: boolean;
}

// A função agora retorna uma Promise de CepData
export const fetchCepData = async (cep: string): Promise<CepData> => {
  try {
    const response = await fetch(`${VIA_CEP_API_URL}${cep}/json/`);
    const data: CepData | ViaCepErrorResponse = await response.json(); // A resposta pode ser um CepData ou um erro

    // Verifique se a resposta é de erro, usando um type guard
    if ('erro' in data && data.erro === true) {
      throw new Error('CEP não encontrado. Verifique o número digitado.');
    }

    // Se não for erro, o TypeScript agora sabe que 'data' é do tipo CepData
    return data as CepData; // Usa type assertion para garantir ao TS que é CepData
  } catch (error) {
    console.error('Erro na requisição da API do ViaCEP:', error);
    throw error;
  }
};
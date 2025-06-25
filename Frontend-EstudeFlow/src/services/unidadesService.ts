import api from './api';

 interface Unidade {
 id: string; 
 nome: string;
 }
 export const unidadesService = {
 // Lista todas as unidades
 async listar(): Promise<Unidade[]> {
 const response = await api.get<Unidade[]>("/unidades");
 return response.data;
 },
 // Obtém uma unidade específica pelo ID
 async obter(id: string): Promise<Unidade> {
 const response = await api.get<Unidade>(`/unidades/${id}`);
 return response.data;
 },
 // Cria uma nova unidade
 async criar(nome: string): Promise<Unidade> {
 const response = await api.post<Unidade>("/unidades", { nome });
 return response.data;
 },
 // Atualiza uma unidade existente
 async atualizar(id: string, nome: string): Promise<Unidade> {
 const response = await api.put<Unidade>(`/unidades/${id}`, { nome });
 return response.data;
 },
 // Exclui uma unidade
 async excluir(id: string): Promise<void> {
 await api.delete(`/unidades/${id}`);
 }
 };
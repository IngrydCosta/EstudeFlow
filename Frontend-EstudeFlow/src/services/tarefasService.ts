 import api from './api';
 import { Tarefa } from '../types'; 

 interface CreateTarefaData {
 nome: string;
 dataEntrega: string;
 unidadeId: string;
 }
 export const tarefasService = {
 // Lista todas as tarefas
 async listar(): Promise<Tarefa[]> {
 const response = await api.get<Tarefa[]>('/tarefas');
 return response.data;
 },
 // Obtém uma tarefa específica pelo ID
 async obter(id: number): Promise<Tarefa> {
 const response = await api.get<Tarefa>(`/tarefas/${id}`);
 return response.data;
 },
 // Cria uma nova tarefa
 async criar(data: CreateTarefaData): Promise<Tarefa> {
 const response = await api.post<Tarefa>('/tarefas', data);
 return response.data;
 },
 // Atualiza uma tarefa existente 
 async atualizar(id: number, data: Partial<Tarefa>): Promise<Tarefa> {
 const response = await api.put<Tarefa>(`/tarefas/${id}`, data);
 return response.data;
 },
 // Exclui uma tarefa
 async excluir(id: number): Promise<void> {
 await api.delete(`/tarefas/${id}`);
 }
 }
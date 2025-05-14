export interface Tarefa {
  id: number;
  nome: string;
  dataEntrega: string;
  status: "Pendente" | "Atrasada" | "Concluída";
  unidadeId: string;
}

export interface UnidadeCurricular {
  id: string;
  nome: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tarefa: Omit<Tarefa, 'id' | 'status'>) => void;
}
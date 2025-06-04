import { useState } from 'react';
import PainelLateral from './painelLateral'; 
import Atividades from './atividades';
import Calendario from './calendario'; 
import Grafico from './grafico'; 
import { Tarefa } from './types';
import Modal from './modal';

interface DashboardProps {
  tarefas: Tarefa[];
  onTarefasChange: (tarefas: Tarefa[]) => void;
  onLogout: () => void; 
}

const Dashboard = ({ tarefas, onTarefasChange, onLogout }: DashboardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null);

  const handleOpenModal = () => {
    setTarefaEditando(null);
    setIsModalOpen(true);
  };

  const handleEditTarefa = (tarefa: Tarefa) => {
    setTarefaEditando(tarefa);
    setIsModalOpen(true);
  };

  const handleSaveTarefa = (novaTarefa: Omit<Tarefa, 'id' | 'status'>) => {
    if (tarefaEditando) {
      onTarefasChange(
        tarefas.map((t) =>
          t.id === tarefaEditando.id ? { ...t, ...novaTarefa } : t
        )
      );
    } else {
      const novaTarefaComId: Tarefa = {
        ...novaTarefa,
        id: tarefas.length ? Math.max(...tarefas.map((t) => t.id)) + 1 : 1,
        status: "Pendente",
      };
      onTarefasChange([...tarefas, novaTarefaComId]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#EDEBF]">
      <PainelLateral onOpenModal={handleOpenModal} onLogout={onLogout} /> 
      <div className="flex-1 p-5 pl-[308px] md:pl-[368px] flex flex-col">
        <div className="w-full">
          <Atividades
            tarefas={tarefas}
            onTarefasChange={onTarefasChange}
            onEditTarefa={handleEditTarefa}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5 w-full mt-10"> 
          <div className="w-full md:w-1/2">
             <Calendario tarefas={tarefas} />
          </div>
          <div className="w-full md:w-1/2">
            <Grafico tarefas={tarefas} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTarefa}
          tarefaEditando={tarefaEditando}
        />
      )}
    </div>
  );
};

export default Dashboard;


import { useState } from 'react'; 
import { Tarefa } from './types.tsx';
import PainelLateral from './painelLateral';
import Atividades from './atividades';
import Calendario from './calendario';
import Grafico from './grafico';
import Modal from './modal'; 



interface DashboardProps {
  tarefas: Tarefa[];
  onTarefasChange: (tarefas: Tarefa[]) => void;
}

const Dashboard = ({ tarefas, onTarefasChange }: DashboardProps) => {
  const [isTarefasModalOpen, setIsTarefasModalOpen] = useState(false);

  const handleAddTarefa = (novaTarefa: Omit<Tarefa, 'id' | 'status'>) => {
    const novoId = tarefas.length > 0 ? Math.max(...tarefas.map(t => t.id)) + 1 : 1;
    onTarefasChange([
      ...tarefas,
      { ...novaTarefa,
        id: novoId,
        ...novaTarefa,
        status: "Pendente"
      }
    ]);
    setIsTarefasModalOpen(false); 
  };

  return (
    <div className="min-h-screen bg-[#F7F5FF] flex">
      <PainelLateral 
       onOpenTarefasModal={() => setIsTarefasModalOpen(true)} />

      <main className="flex-1 ml-[316px] pt-3 pr-3 flex flex-col gap-8">
        <div className="w-full">
          <Atividades 
            tarefas={tarefas} 
            onTarefasChange={onTarefasChange} 
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center items-start gap-4 px-0">
          <Calendario tarefas={tarefas} />
          <Grafico tarefas={tarefas} />
        </div>
      </main>

     <Modal 
        isOpen={isTarefasModalOpen} 
        onClose={() => setIsTarefasModalOpen(false)} 
        onSave={handleAddTarefa}
      />
    </div>
  );
};
export default Dashboard;
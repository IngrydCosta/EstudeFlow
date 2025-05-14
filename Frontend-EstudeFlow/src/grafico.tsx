import { Bar } from 'react-chartjs-2';
import { Tarefa } from './types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


type GraficoProps = {
  tarefas: Tarefa[];
};

const Grafico = ({ tarefas }: GraficoProps) => {

   const dados = {
    pendentes: tarefas.filter(t => t.status === "Pendente").length,
    atrasadas: tarefas.filter(t => t.status === "Atrasada").length,
    concluidas: tarefas.filter(t => t.status === "Concluída").length
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Status das Tarefas'

      }
    }
  };

  const data = {
    labels: ['Pendentes', 'Atrasadas', 'Concluídas'],
    datasets: [
      {
        label: 'Quantidade',
        data: [dados.pendentes, dados.atrasadas, dados.concluidas],
        backgroundColor: ['#4A37C8', '#8879EB', '#EDEBFF']
      }
    ]
  };

  return (
    <div className="w-full md:w-[49%] h-auto md:h-[400px] flex flex-col items-center bg-white shadow-md rounded-[15px] overflow-hidden p-8">
           <div className="text-center"></div>
      <h2 className="text-2xl font-bold text-[#6755A7] text-center">Seu Progresso</h2>
      <Bar data={data} options={options} />
    </div>
    
  );
};

export default Grafico;

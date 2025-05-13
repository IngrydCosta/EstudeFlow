import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Grafico = () => {

  const dados = {
    pendentes: 8,
    atrasadas: 4,
    concluidas: 15
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
    <div className="grafico-container p-14 bg-white shadow-md rounded-md w-full max-w-lg mx-auto mt-1" >
      <h2 className="text-2xl font-semibold mb-4 text-center">Seu Progresso</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Grafico;

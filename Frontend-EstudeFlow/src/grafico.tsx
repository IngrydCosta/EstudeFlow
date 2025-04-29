import { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Grafico = () => {

  const [dados, setDados] = useState<number[]>([]);


  const valoresGrafico = useMemo(() => [12, 19, 3, 5, 2, 3, 7], []);

  useEffect(() => {

    setDados(valoresGrafico);
  }, [valoresGrafico]);


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Gráfico de Exemplo',
      },
    },
  };


  const data = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'], 
    datasets: [
      {
        label: 'Dados de Vendas',
        data: dados,  
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="grafico-container p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Desempenho das Vendas</h2>
      <div className="grafico">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Grafico;
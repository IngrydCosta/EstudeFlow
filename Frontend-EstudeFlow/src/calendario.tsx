import { useEffect, useState, useMemo } from "react";
import { Tarefa } from './types';

interface CalendarioProps {
  tarefas: Tarefa[];
}
  const Calendario = ({ tarefas }: CalendarioProps) => {
  const hoje = useMemo(() => new Date(), []);
  const [dias, setDias] = useState<number[]>([]);


  const tarefaId = "T1";
  const dataEntrega = new Date(hoje.getFullYear(), hoje.getMonth(), 28); 
  const diasRestantes = Math.ceil((dataEntrega.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const calcularDias = () => {
      const diasNoMes: number[] = [];
      const mes = hoje.getMonth();
      const ano = hoje.getFullYear();
      const ultimoDiaDoMes = new Date(ano, mes + 1, 0).getDate();

      for (let i = 1; i <= ultimoDiaDoMes; i++) {
        diasNoMes.push(i);
      }

      setDias(diasNoMes);
    };

    calcularDias();
  }, [hoje]);

  return (
    <div className="w-full md:w-[45%] h-auto md:h-[400px] flex flex-col items-center gap-2 p-1 bg-white shadow-md rounded-[15px] overflow-hidden">
      <div className="text-center">
      <h2 className="text-2xl font-bold text-[#6755A7] mb-4">Calendário</h2>

      <div className="  text-gray-800 flex flex-col mt-2 items-center">
        <p><strong>ID da Tarefa:</strong> {tarefaId}</p>
        <p><strong>Faltam:</strong> {diasRestantes} dias para entrega</p>
        <p><strong>Data de Entrega:</strong> {dataEntrega.toLocaleDateString()}</p>
      </div>
      </div>

      <div className="mt-4">
      
        <ul className="list-disc list-inside text-[#6755A7]">
          {tarefas.map((tarefa, index) => (
            <li key={index}>{tarefa.nome}</li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {dias.map((dia) => {
          const isHoje = dia === hoje.getDate();
          const isEntrega = dia === dataEntrega.getDate();

          let estilo = "w-10 h-8 flex items-center justify-center rounded-full text-sm";

          if (isHoje) {
            estilo += " bg-[#4A37C8] text-white font-bold";
          } else if (isEntrega) {
            estilo += " bg-[#EEEAF9] text-black font-bold";
          } else {
            estilo += " bg-gray-100 text-gray-800";
          }

          return (
            <div key={dia} className={estilo}>
              {dia}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendario;

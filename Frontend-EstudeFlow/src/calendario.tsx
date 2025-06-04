import { useEffect, useState, useMemo } from "react";
import { Tarefa } from './types';

interface CalendarioProps {
  tarefas: Tarefa[];
}

const Calendario = ({ tarefas }: CalendarioProps) => {
  const hoje = useMemo(() => new Date(), []);
  const [dias, setDias] = useState<number[]>([]);

  const parseData = (dataStr: string): Date => {
    if (!dataStr) return new Date(); 

    if (dataStr.includes('-')) {
      const [ano, mes, dia] = dataStr.split('-').map(Number);
      return new Date(ano, mes - 1, dia); 
    }

   
    const [dia, mes, ano] = dataStr.split('/').map(Number);
    return new Date(ano, mes - 1, dia);
  };

 
  const tarefasNaoConcluidas = useMemo(() => {
    return tarefas.filter(tarefa => tarefa.status !== "Concluída");
  }, [tarefas]);

  const tarefaMaisProxima = useMemo(() => {
    if (!tarefasNaoConcluidas.length) return null;

    return tarefasNaoConcluidas.reduce((maisProxima, tarefa) => {
      const dataEntrega = parseData(tarefa.dataEntrega);
      if (isNaN(dataEntrega.getTime()) || dataEntrega < hoje) return maisProxima; 

      if (!maisProxima) {
        return { ...tarefa, dataEntregaDate: dataEntrega };
      }

      const dataMaisProxima = parseData(maisProxima.dataEntrega);
      return dataEntrega < dataMaisProxima ? { ...tarefa, dataEntregaDate: dataEntrega } : maisProxima;
    }, null as (Tarefa & { dataEntregaDate: Date }) | null);
  }, [tarefasNaoConcluidas, hoje]);

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
  
    <div className="w-full h-full flex flex-col items-center gap-4 p-4 bg-white shadow-md rounded-[15px] overflow-auto">  
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#6755A7] mb-2">Calendário</h2> 

        <div className="text-gray-800 flex flex-col mt-1 items-center text-sm"> 
          {tarefaMaisProxima ? (
            <>
              <p><strong>ID da Tarefa:</strong> T{tarefaMaisProxima.id}</p>
              <p><strong>Faltam:</strong> {Math.ceil((tarefaMaisProxima.dataEntregaDate.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24))} dias</p>
              <p><strong>Entrega:</strong> {tarefaMaisProxima.dataEntrega}</p>
            </>
          ) : (
            <p>Nenhuma tarefa futura.</p>
          )}
        </div>
      </div>
      <div className="w-full px-2"> 
        <ul className="list-disc list-inside text-[#6755A7] text-sm"> 
          {tarefasNaoConcluidas.map((tarefa, index) => (
            <li key={index}>{tarefa.nome}</li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-7 gap-1 w-full px-2"> 
        {dias.map((dia) => {
          const isHoje = dia === hoje.getDate();
          const isEntrega = tarefaMaisProxima && parseData(tarefaMaisProxima.dataEntrega).getDate() === dia && parseData(tarefaMaisProxima.dataEntrega).getMonth() === hoje.getMonth();

          let estilo = "w-10 h-10 flex items-center justify-center rounded-full text-xs"; 

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


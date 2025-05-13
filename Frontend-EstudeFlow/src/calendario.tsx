import { useEffect, useState, useMemo } from "react";

const Calendario = () => {
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
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-white shadow-md rounded-[10px] overflow-hidden">
      <div className="text-center mb-10">
      <h2 className="text-xl font-bold text-[#6755A7]">Calendário</h2>

      <div className=" items-center text-gray-800 mt-20">
        <p><strong>ID da Tarefa:</strong> {tarefaId}</p>
        <p><strong>Faltam:</strong> {diasRestantes} dias para entrega</p>
        <p><strong>Data de Entrega:</strong> {dataEntrega.toLocaleDateString()}</p>
      </div>
      </div>
  
      <div className="grid grid-cols-7 gap-2">
        {dias.map((dia) => {
          const isHoje = dia === hoje.getDate();
          const isEntrega = dia === dataEntrega.getDate();

          let estilo = "w-10 h-12 flex items-center justify-center rounded-full text-sm";

          if (isHoje) {
            estilo += " bg-[#6755A7] text-white font-bold";
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

import { useEffect, useState, useMemo } from "react";


const Calendario = () => {

    const hoje = useMemo(() => new Date(), []);

    const [dias, setDias] = useState<number[]>([]);

    const diaEntrega = 28;

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
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg mx-auto">
            <h2 className="text-lg font-semibold mb-4">Calendário</h2>
            <div className="grid grid-cols-7 gap-2">
                {dias.map((dia) => {
                    const isHoje = dia === hoje.getDate();
                    const isEntrega = dia === diaEntrega;

                    let estilo =
                        "w-10 h-10 flex items-center justify-center rounded-full text-sm";

                    if (isHoje) {
                        estilo += " bg-blue-500 text-white font-bold";
                    } else if (isEntrega) {
                        estilo += " bg-yellow-400 text-black font-bold";
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
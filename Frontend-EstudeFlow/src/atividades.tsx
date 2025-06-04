import { useState } from "react";
import { Tarefa } from './types';

interface AtividadesProps {
  tarefas: Tarefa[];
  onTarefasChange: (tarefas: Tarefa[]) => void;
  onEditTarefa: (tarefa: Tarefa) => void;
}

const Atividades = ({ tarefas, onTarefasChange, onEditTarefa }: AtividadesProps) => {
  const [unidadeSelecionada, setUnidadeSelecionada] = useState<string>("");

  
  const unidadesUnicas = Array.from(new Set(tarefas.map(t => t.unidadeId)));

  const tarefasFiltradas = unidadeSelecionada
    ? tarefas.filter(t => t.unidadeId === unidadeSelecionada)
    : tarefas;

  const handleEdit = (id: number) => {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
      onEditTarefa(tarefa);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Deseja excluir esta tarefa?")) {
      onTarefasChange(tarefas.filter(t => t.id !== id));
    }
  };

  const handleStatusChange = (id: number, novoStatus: Tarefa['status']) => {
    onTarefasChange(tarefas.map(t => 
      t.id === id ? { ...t, status: novoStatus } : t
    ));
  };

  return (
    <section className="w-full max-w-[1550px] h-[410px] bg-white rounded-2xl shadow-lg relative top-4 mx-auto p-5">
      <h1 className="text-[#6755A7] text-2xl font-bold text-center mb-6">
        Suas Atividades
      </h1>

      <div className="mb-4">
        <select
          className="w-[300px] bg-[#6755A7] bg-opacity-30 text-black font-semibold p-2 rounded-md"
          value={unidadeSelecionada}
          onChange={(e) => setUnidadeSelecionada(e.target.value)}
        >
          <option value="">Selecione uma Unidade Curricular</option>
          {unidadesUnicas.map((unidade) => (
            <option key={unidade} value={unidade}>
              {unidade}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full border-2 border-[#4A37C8] rounded-[10px] shadow-lg overflow-hidden">
        <thead className="bg-[#4A37C8] text-white">
          <tr>
            <th className="text-center p-2">Tarefa</th>
            <th className="text-center p-2">Data de Entrega</th>
            <th className="text-center p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {tarefasFiltradas.map((tarefa, index) => {
            const isEven = index % 2 === 0;
            const bgColor = isEven ? "bg-white" : "bg-[#EEEAF9]";
            const selectBg = isEven ? "bg-white" : "bg-[#EEEAF9]";

            return (
              <tr key={tarefa.id} className={`${bgColor}`}>
                <td className="text-center p-2">
                  <div className="flex items-center justify-center gap-2">
                    <span>{tarefa.nome}</span>
                    <img
                      src="assets/iconedit.svg"
                      alt="edit"
                      onClick={() => handleEdit(tarefa.id)}
                      className="inline-block cursor-pointer"
                    />
                    <img
                      src="assets/icondelete.svg"
                      alt="delete"
                      onClick={() => handleDelete(tarefa.id)}
                      className="inline-block cursor-pointer"
                    />
                  </div>
                </td>
                <td className="text-center p-2">{tarefa.dataEntrega}</td>
                <td className="text-center p-2">
                  <select
                    className={`p-2 rounded-md ${selectBg}`}
                    value={tarefa.status}
                    onChange={(e) => handleStatusChange(tarefa.id, e.target.value as "Pendente" | "Atrasada" | "Concluída")}
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Atrasada">Atrasada</option>
                    <option value="Concluída">Concluída</option>
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Atividades;
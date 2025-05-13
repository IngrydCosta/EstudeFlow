import { useState } from "react";

interface UnidadeCurricular {
  id: string;
  nome: string;
}

interface Tarefa {
  id: number;
  nome: string;
  dataEntrega: string;
  status: string;
  unidadeId: string;
}

const Atividades = () => {
  const [unidades] = useState<UnidadeCurricular[]>([
    { id: "uc1", nome: "Matemática" },
    { id: "uc2", nome: "História" },
    { id: "uc3", nome: "Biologia" }
  ]);

  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { id: 1, nome: "Atividade 1", dataEntrega: "2025-04-25", status: "Pendente", unidadeId: "uc1" },
    { id: 2, nome: "Atividade 2", dataEntrega: "2025-04-26", status: "Concluída", unidadeId: "uc2" },
    { id: 3, nome: "Atividade 3", dataEntrega: "2025-04-27", status: "Atrasada", unidadeId: "uc1" },
  ]);

  const [unidadeSelecionada, setUnidadeSelecionada] = useState<string>("");

  const tarefasFiltradas = unidadeSelecionada
    ? tarefas.filter(t => t.unidadeId === unidadeSelecionada)
    : tarefas;

  const handleEdit = (id: number) => {
    alert(`Editar tarefa com ID ${id} (abrir modal futuramente)`);
  };

  const handleDelete = (id: number) => {
    const confirmar = confirm("Deseja realmente excluir esta tarefa?");
    if (confirmar) {
      setTarefas(tarefas.filter(t => t.id !== id));
    }
  };

  const handleStatusChange = (id: number, novoStatus: string) => {
    setTarefas(tarefas.map(t =>
      t.id === id ? { ...t, status: novoStatus } : t
    ));
  };

  return (
    <section className="w-[1450px] h-[380px] bg-white rounded-2xl shadow-lg static top-8 left-[300px] p-6">
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
          {unidades.map((uc) => (
            <option key={uc.id} value={uc.id}>
              {uc.nome}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full border-2 border-[#6755A7] rounded-[10px] shadow-lg overflow-hidden">
        <thead className="bg-[#6755A7] text-white">
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
                    onChange={(e) => handleStatusChange(tarefa.id, e.target.value)}
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

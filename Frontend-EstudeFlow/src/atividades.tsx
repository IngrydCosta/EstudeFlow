const Atividades = () => {
    return (
      <section className="w-[1450px] h-[380px] bg-white rounded-2xl shadow-lg fixed top-8 left-[380px] p-6">
        <h1 className="text-[#6755A7] text-2xl font-bold text-center mb-6">Suas Atividades</h1>
  
        <div className="mb-4">
          <select className="w-[300px] bg-[#6755A7] bg-opacity-30 text-black font-semibold p-2 rounded-md">
            <option value="" disabled selected>Selecione uma Unidade Curricular</option>
            <option value="uc1">Unidade Curricular 1</option>
            <option value="uc2">Unidade Curricular 2</option>
            <option value="uc3">Unidade Curricular 3</option>
          </select>
        </div>
  
        <table className="w-full border-2 border-[#6755A7] rounded-md shadow-lg">
          <thead className="bg-[#6755A7] text-white">
            <tr>
              <th>Tarefa</th>
              <th>Data de Entrega</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((i) => (
              <tr key={i}>
                <td className="flex justify-between items-center">
                  <span>Teste {i}</span>
                  <span>
                    <img src="img/border_color.svg" alt="edit" className="inline-block" />
                    <img src="img/delete.svg" alt="delete" className="inline-block" />
                  </span>
                </td>
                <td>25/04/2025</td>
                <td>
                  <select className="p-2 rounded-md">
                    <option>Pendente</option>
                    <option>Atrasada</option>
                    <option>Concluída</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
  
  export default Atividades;
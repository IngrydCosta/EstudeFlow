const PainelLateral = () => {
    return (
      <aside className="w-[316px] h-[825px] bg-white text-black rounded-2xl shadow-lg fixed top-8 left-8 flex flex-col items-center">
        <div className="logo flex justify-center items-center mb-6">
          <img src="img/icon.svg" alt="Logo" className="w-20 -ml-48" />
          <p className="text-xl font-semibold">Estude<strong>Flow</strong></p>
        </div>
  
        <nav className="menu flex flex-col gap-6 px-6 text-lg">
          <button className="w-[200px] h-[50px] flex items-center justify-start gap-2 hover:bg-gradient-to-r from-[#6755A7] to-[#4A37C8] text-[#4A37C8] rounded-md transition-colors">
            <img src="img/ícones.svg" alt="Dashboard" />
            <strong>Dashboard</strong>
          </button>
          <button className="w-[200px] h-[50px] flex items-center justify-start gap-2 hover:bg-gradient-to-r from-[#6755A7] to-[#4A37C8] text-[#4A37C8] rounded-md transition-colors">
            <img src="img/editor_choice.svg" alt="Tarefas" />
            <strong>Tarefas</strong>
          </button>
          <button className="w-[200px] h-[50px] flex items-center justify-start gap-2 hover:bg-gradient-to-r from-[#6755A7] to-[#4A37C8] text-[#4A37C8] rounded-md transition-colors">
            <img src="img/person_2.svg" alt="Logout" />
            <strong>Logout</strong>
          </button>
        </nav>
      </aside>
    );
  }
  
  export default PainelLateral;
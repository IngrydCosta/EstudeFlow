
interface PainelLateralProps {
  onOpenModal: () => void; 
  onLogout: () => void; 
}

const PainelLateral = ({ onOpenModal, onLogout }: PainelLateralProps) => {

  return (
   
    <aside className="w-[316px] h-[825px] bg-white text-black rounded-2xl shadow-lg fixed top-8 left-8 flex flex-col items-center">
      <div className="logo flex justify-center items-center mb-6 mt-4">
        <img src="/assets/iconmain.svg" alt="Logo" className="w-16 h-16 mr-2"/> 
        <p className="text-xl font-semibold">Estude<strong>Flow</strong></p>
      </div>

      <nav className="menu flex flex-col gap-6 px-6 text-lg mt-4">
        <button className="w-[200px] h-[50px] flex items-center justify-start gap-2 text-[#4A37C8] bg-white hover:text-white hover:bg-gradient-to-r hover:from-[#6755A7] hover:to-[#4A37C8] rounded-md transition-colors">
          <img src="/assets/icondashboard.svg" alt="Dashboard" />
          <strong>Dashboard</strong>
        </button>

        <button
          onClick={onOpenModal} 
          className="w-[200px] h-[50px] flex items-center justify-start gap-2 text-[#4A37C8] bg-white hover:text-white hover:bg-gradient-to-r hover:from-[#6755A7] hover:to-[#4A37C8] rounded-md transition-colors"
        >
          <img src="/assets/icontarefas.svg" alt="Tarefas" />
          <strong>Tarefas</strong>
        </button>

      
        <button
          onClick={onLogout} 
          className="w-[200px] h-[50px] flex items-center justify-start gap-2 text-[#4A37C8] bg-white hover:text-white hover:bg-gradient-to-r hover:from-[#6755A7] hover:to-[#4A37C8] rounded-md transition-colors"
        >
          <img src="/assets/iconlogout.svg" alt="Logout" />
          <strong>Logout</strong>
        </button>
      </nav>
    </aside>
  );
};

export default PainelLateral;


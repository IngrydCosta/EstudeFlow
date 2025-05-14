import { useNavigate } from 'react-router-dom';

interface PainelLateralProps {
  onOpenTarefasModal: () => void; 
}

const PainelLateral = ({ onOpenTarefasModal }: PainelLateralProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <aside className="w-[280px] md:w-[316px] h-screen md:h-[825px] bg-white text-black rounded-2xl shadow-lg fixed top-0 md:top-8 left-2 md:left-8 flex flex-col items-center">
      <div className="logo flex justify-center items-center mb-6">
        <img src="/assets/iconmain.svg" alt="Logo"/>
        <p className="text-xl font-semibold">Estude<strong>Flow</strong></p>
      </div>

      <nav className="menu flex flex-col gap-6 px-6 text-lg">
        <button className="w-[200px] h-[50px] flex items-center justify-start gap-2 text-[#4A37C8] bg-white hover:text-white hover:bg-gradient-to-r hover:from-[#6755A7] hover:to-[#4A37C8] rounded-md transition-colors">
          <img src="assets/icondashboard.svg" alt="Dashboard" />
          <strong>Dashboard</strong>
        </button>

        <button
          onClick={onOpenTarefasModal} 
          className="w-[200px] h-[50px] flex items-center justify-start gap-2 text-[#4A37C8] bg-white hover:text-white hover:bg-gradient-to-r hover:from-[#6755A7] hover:to-[#4A37C8] rounded-md transition-colors"
        >
          <img src="assets/icontarefas.svg" alt="Tarefas" />
          <strong>Tarefas</strong>
        </button>

      
        <button
          onClick={handleLogout}
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

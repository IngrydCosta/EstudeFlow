import PainelLateral from './painelLateral';
import Atividades from './atividades';
import Calendario from './calendario';
import Grafico from './grafico';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <PainelLateral />
   
      <main className="ml-[340px] mt-8 p-4 w-full flex flex-col gap-8">
        
      
        <Atividades />

        <div className="flex w-full justify-center gap-8 mt-8 px-8">
          <Calendario />
          <Grafico />
        </div>

      </main>
    </div>
  );
};

export default Dashboard;

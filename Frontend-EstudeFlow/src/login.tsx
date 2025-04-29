import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logoIcon from './assets/icon.svg';
import userIcon from './assets/user.svg';
import lockIcon from './assets/lock.svg';
import './style.css';


export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDEBFF] font-[Poppins]">
      <div className="bg-[#6755A711] w-[500px] h-[700px] p-20 rounded-2xl shadow-md text-center">
        <div className="flex items-center mb-10 justify-center">
          <img src={logoIcon} alt="Logo" className="w-[85px]" />
          <p className="text-[40px]  right-px">Estude<strong>Flow</strong></p>
        </div>
        <h1 className="  text-[#6755A7] text-[30px] mb-5 justify-center"><strong>Login</strong></h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="input flex items-center border-b border-[#6755A780] py-2">
            <img src={userIcon} alt="user" className="w-5 h-6 mr-2" />
            <input
              type="text"
              placeholder="USUÁRIO"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="bg-transparent border-none outline-none text-[#6755A7] text-sm flex-1"
            />
          </div>

          <div className="input flex items-center border-b border-[#6755A780] py-2">
            <img src={lockIcon} alt="lock" className="w-5 h-6 mr-2" />
            <input
              type="password"
              placeholder="SENHA"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="bg-transparent border-none outline-none text-[#6755A7] text-sm flex-1"
            />
          </div>

          <button
            type="submit"
            className="w-full h-[45px] bg-[#6755A7] text-white rounded-md text-sm hover:bg-[#5a4aa4] transition"
          >
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
}

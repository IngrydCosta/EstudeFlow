import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from './services/api'; 
import { AxiosError } from 'axios';
import './style.css';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (usuario.trim() === '' || senha.trim() === '') {
      setErro('Por favor, preencha todos os campos');
      return;
    }

    try {
      // Requisição de login
      const resposta = await api.post('/autenticacao/login', {
        username: usuario,
        senha: senha,
      });

      console.log('Login realizado:', resposta.data);

      onLoginSuccess();
      navigate('/dashboard');
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      console.error('Erro no login:', error);
      setErro(error.response?.data?.error || 'Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDEBFF] font-[Poppins]">
      <div className="bg-[#6755A711] w-[500px] h-[700px] p-20 rounded-2xl shadow-md text-center">
        <div className="flex items-center mb-10 justify-center">
          <img src="/assets/icon.svg" alt="Logo" className="w-[85px]" />
          <p className="text-[40px] right-px text-[rgba(0, 0, 0, 1)]">
            Estude<strong>Flow</strong>
          </p>
        </div>

        <h1 className="text-[#6755A7] text-[30px] mb-5 justify-center">
          <strong>Login</strong>
        </h1>

        {erro && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="input flex items-center border-b border-[#6755A780] py-2">
            <img src="/assets/user.svg" alt="user" className="w-5 h-6 mr-2" />
            <input
              type="text"
              placeholder="USUÁRIO"
              value={usuario}
              onChange={(e) => {
                setUsuario(e.target.value);
                setErro('');
              }}
              required
              className="bg-transparent border-none outline-none text-[#6755A7] text-sm flex-1 placeholder-[#6755A780]"
            />
          </div>

          <div className="input flex items-center border-b border-[#6755A780] py-2">
            <img src="/assets/lock.svg" alt="lock" className="w-5 h-6 mr-2" />
            <input
              type="password"
              placeholder="SENHA"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
                setErro('');
              }}
              required
              className="bg-transparent border-none outline-none text-[#6755A7] text-sm flex-1 placeholder-[#6755A780]"
            />
          </div>

          <button
            type="submit"
            className="w-full h-[45px] bg-gradient-to-r from-[#6755A7] to-[#4A37C8] text-white rounded-md text-sm hover:opacity-90 transition-all shadow-md"
          >
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

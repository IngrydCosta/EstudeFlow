import ReactDOM from "react-dom";
import { useState, useEffect } from 'react';
import { Tarefa } from './types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tarefa: Omit<Tarefa, 'id' | 'status'>) => void;
  tarefaEditando?: Tarefa | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, tarefaEditando }) => {
  const [unidadeCurricular, setUnidadeCurricular] = useState('');
  const [tarefa, setTarefa] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');

  // Essa função formata a data de YYYY-MM-DD para DD/MM/YYYY
  const formatarData = (data: string): string => {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  // Essa função converte  DD/MM/YYYY para YYYY-MM-DD (para o input)
  const desformatarData = (data: string): string => {
    if (!data) return '';
    const [dia, mes, ano] = data.split('/').map(Number);
    return `${ano}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    // Limpa os campos ao abrir o modal
    setTarefa('');
    setDataEntrega('');
    setUnidadeCurricular('');

    // Preenche os campos apenas se for edição
    if (isOpen && tarefaEditando) {
      setTarefa(tarefaEditando.nome);
      setDataEntrega(desformatarData(tarefaEditando.dataEntrega));
      setUnidadeCurricular(tarefaEditando.unidadeId);
    }
  }, [isOpen, tarefaEditando]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unidadeCurricular || !tarefa || !dataEntrega) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    onSave({
      nome: tarefa,
      dataEntrega: formatarData(dataEntrega), // Formata para DD/MM/YYYY
      unidadeId: unidadeCurricular,
    });
    // Limpa os campos após salvar
    setTarefa('');
    setDataEntrega('');
    setUnidadeCurricular('');
    onClose();
  };

  const handleClose = () => {
    setTarefa('');
    setDataEntrega('');
    setUnidadeCurricular('');
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleClose}
    >
      <div 
        className="bg-white w-full max-w-md rounded-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-center mb-4 text-[#6755A7]">
          {tarefaEditando ? "Editar Tarefa" : "Cadastro de Tarefas"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Unidade Curricular <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={unidadeCurricular}
              onChange={(e) => setUnidadeCurricular(e.target.value)}
              placeholder="Digite a unidade curricular"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tarefa <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={tarefa}
              onChange={(e) => setTarefa(e.target.value)}
              placeholder="Digite a tarefa"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Data de Entrega
            </label>
            <input
              type="date"
              value={dataEntrega}
              onChange={(e) => setDataEntrega(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-600 focus:outline-none"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-600 focus:outline-none"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Tarefa } from './types.tsx';
import Login from './login';
import Dashboard from './dashboard';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    
    { id: 1, nome: "Tarefa 1", dataEntrega: "28/05/2025", status: "Pendente", unidadeId: "uc1" }
  ]);

 return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              <Navigate to="/dashboard" /> : 
              <Login onLoginSuccess={() => setIsAuthenticated(true)} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
              <Dashboard tarefas={tarefas} onTarefasChange={setTarefas} /> : 
              <Navigate to="/" />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
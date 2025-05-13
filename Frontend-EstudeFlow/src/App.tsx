
import { Routes, Route } from 'react-router-dom';
import Login from './login';
import Dashboard from './dashboard';

function App() {
  return (
    <Routes>
      {/* Rota para o login */}
      <Route path="/" element={<Login />} />

      {/* Rota para o dashboard, após o login */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;






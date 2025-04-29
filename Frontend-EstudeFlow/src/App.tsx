

import { Routes, Route } from 'react-router-dom';
import Login from './login';
/*import Dashboard from ''; */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;





/*<Route path="/dashboard" element={<Dashboard />} />*/



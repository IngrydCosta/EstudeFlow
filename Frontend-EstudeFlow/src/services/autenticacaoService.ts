import api from './api'; 

await api.post('/autenticacao/login', {
  username: 'admin',
  senha: '123'
});

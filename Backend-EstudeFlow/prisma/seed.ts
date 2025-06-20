import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Iniciando seed do banco de dados...');
    
    // Cria usuário de teste
    console.log('Criando usuário de teste...');
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash('123456', salt);
    
    const usuario = await prisma.usuario.upsert({
      where: { email: 'teste@estudeflow.com' },
      update: {},
      create: {
        nome: 'Usuário Teste',
        email: 'teste@estudeflow.com',
        senha: senhaHash
      }
    });

    // Cria unidades
    const unidades = [
      { id: 1, nome: 'Matemática', usuarioId: usuario.id },
      { id: 2, nome: 'Português', usuarioId: usuario.id },
      { id: 3, nome: 'História', usuarioId: usuario.id },
      { id: 4, nome: 'Geografia', usuarioId: usuario.id },
      { id: 5, nome: 'Ciências', usuarioId: usuario.id }
    ];
    
    console.log('Criando unidades...');
    for (const unidade of unidades) {
      await prisma.unidade.upsert({
        where: { id: unidade.id },
        update: {},
        create: unidade
      });
    }
    
    // Cria algumas tarefas de exemplo
    console.log('Criando tarefas de exemplo...');
    const tarefas = [
      { 
        nome: 'Estudar equações do segundo grau', 
        dataEntrega: new Date('2025-06-15'), 
        status: 'Pendente',
        unidadeId: 1,
        usuarioId: usuario.id
      },
      { 
        nome: 'Ler capítulo sobre Modernismo', 
        dataEntrega: new Date('2025-06-10'), 
        status: 'Pendente',
        unidadeId: 2,
        usuarioId: usuario.id
      },
      { 
        nome: 'Fazer resumo sobre Revolução Industrial', 
        dataEntrega: new Date('2025-06-05'), 
        status: 'Atrasada',
        unidadeId: 3,
        usuarioId: usuario.id
      }
    ];
    
    for (const tarefa of tarefas) {
      await prisma.tarefa.create({
        data: tarefa
      });
    }
    
    console.log('Seed concluído com sucesso!');
  } catch (error) {
    console.error('Erro durante o seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();


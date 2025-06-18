import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Iniciando seed do banco de dados...');
    
    // Cria unidades
    const unidades = [
      { id: 'uc1', nome: 'Introdução a IA' },
      { id: 'uc2', nome: 'Estrutura de Dados' },
      { id: 'uc3', nome: 'Desenvolvimento web' },
      { id: 'uc4', nome: 'Laboratório de Software' },
      { id: 'uc5', nome: 'Arquitetura de Computadores' }
    ];
    
    console.log('Criando unidades...');
    for (const unidade of unidades) {
      await prisma.unidade.upsert({
        where: { id: unidade.id },
        update: {},
        create: unidade
      });
    }
    
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
    
    // Cria algumas tarefas de exemplo
    console.log('Criando tarefas de exemplo...');
    const tarefas = [
      { 
        nome: 'P-Folio', 
        dataEntrega: new Date('2025-06-15'), 
        status: 'Pendente',
        unidadeId: 'uc1',
        usuarioId: usuario.id
      },
      { 
        nome: 'Efolio', 
        dataEntrega: new Date('2025-06-10'), 
        status: 'Pendente',
        unidadeId: 'uc2',
        usuarioId: usuario.id
      },
      { 
        nome: 'PfolioGlobal', 
        dataEntrega: new Date('2025-06-05'), 
        status: 'Atrasada',
        unidadeId: 'uc3',
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


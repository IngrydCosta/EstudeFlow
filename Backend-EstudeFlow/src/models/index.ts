import prismaClient from "../utils/prismaUtils";

export default {
    usuario: prismaClient.usuario,
    tarefa: prismaClient.tarefa,
    unidade: prismaClient.unidade
    

}
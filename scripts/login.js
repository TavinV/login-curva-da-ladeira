const form = document.querySelector("form")
import * as requests from "../modules/requests.js" 
import redirect from "../modules/redirecionar.js"

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const [dados, erro] = await requests.GET();

    if (erro) {
        console.error("Erro ao obter os usuários:", erro);
        return;
    }
    
    const users = dados;
    
    // Buscar usuário e comparar as senhas

    const loginDoForm = document.getElementById("login").value.trim()
    const senhaDoForm = document.getElementById("senha").value.trim()

    const conta = users.filter(u => u.login == loginDoForm && u.senha == senhaDoForm)
    
    if (conta.length > 0){
        const contaverificada = conta[0]
        
        redirect(contaverificada)
    } else {
        document.querySelector('.erro').innerText = 'Usuário e(ou) senha incorretos!'
    }
});

// Checando se há um usuário logado

async function userLogado(){
    let id = localStorage.getItem("id")

    if (id){
        const [dados, erro] = await requests.GET();
        
        if (erro) {
            console.error("Erro ao obter os usuários:", erro);
            return;
        }

        const users = dados;
        const conta = users.filter(u => u.id == id)

        if (conta.length > 0){
            console.log("logado")
            redirect(conta[0])
        } else {
            localStorage.removeItem("id")
        }
    }
}

window.addEventListener("load", userLogado)
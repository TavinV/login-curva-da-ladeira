const form = document.querySelector("form")
import * as requests from "../modules/requests.js" 

const redirecionamentos = {
    adm: "../pages/admin.html",
    user: "../pages/boasvindas.html"
}

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
        const url = contaverificada.adm ? redirecionamentos.adm : redirecionamentos.user
        
        localStorage.setItem("id", contaverificada.id)
        window.location.href = url
    } else {
        document.querySelector('.erro').innerText = 'Usuário e(ou) senha incorretos!'
    }
});

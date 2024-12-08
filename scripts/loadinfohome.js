const form = document.querySelector("form")
import * as requests from "../modules/requests.js"
import * as redirect from "../modules/redirecionar.js"

async function carregarInfo() {

    const [dados, erro] = await requests.GET();

    if (erro) {
        console.error("Erro ao obter os usuários:", erro);
        return;
    }

    const users = dados;
    const id = localStorage.getItem("id")

    if (!id || id == null) {
        redirect.forceLogin()
        return;
    }

    const userLoggado = users.find(u => u.id == id) || []

    if (userLoggado.length == 0) {
        localStorage.removeItem("id")
        redirect.forceLogin()

        return;
    }

    // Carregando as informações

    document.querySelector(".user-info").innerText = `Bem vindo, ${userLoggado.nome} ${userLoggado.sobrenome}`
    document.querySelector(".welcome-message h2").innerText = `Bem-vindo à ShopNow, ${userLoggado.nome} `
}

window.addEventListener('load', carregarInfo)
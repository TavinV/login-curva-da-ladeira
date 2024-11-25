const form = document.querySelector("form")
import * as requests from "../modules/requests.js" 

const redirecionamentos = {
    adm: "../../pages/dashboard.html",
    user: "../../pages/home.html"
}

const [dados, erro] = await requests.GET();
if (erro) {
    console.error("Erro ao obter os usuários:", erro);
}

const users = dados;
const id = localStorage.getItem("id")

if (!id || id == null){
    window.location.href = '../../index.html'
}

const userLoggado = users.find(u => u.id == id)

// Carregando as informações

document.querySelector(".user_info-title").innerText = `Bem vindo, ${userLoggado.nome} ${userLoggado.sobrenome}`

document.getElementById("nome").innerText = "Nome: " + userLoggado.nome
document.getElementById("sobrenome").innerText = "Sobrenome: " + userLoggado.sobrenome
document.getElementById("rg").innerText = "RG: " + userLoggado.rg
document.getElementById("email").innerText = "Email: " + userLoggado.email

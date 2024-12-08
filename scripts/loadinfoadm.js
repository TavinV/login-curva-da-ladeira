import * as requests from "../modules/requests.js"
import * as redirect from "../modules/redirecionar.js"

async function onPageLoad() {
    let id = localStorage.getItem("id")

    if (!id || id === null) {
        redirect.forceLogin()
    }

    const [dados, erro] = await requests.GET();

    if (erro) {
        console.error("Erro ao obter os usuários:", erro);
        return;
    }

    const users = dados;
    let conta = users.filter(u => u.id == id)
    conta = conta[0]

    if (!conta || !conta.adm) {
        redirect.forceLogin()
    }
}

window.addEventListener("load", onPageLoad)

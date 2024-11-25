const form = document.querySelector("form")
import * as requests from "../modules/requests.js" 

form.addEventListener('submit', async (e) => { 
    const nome = document.getElementById('nome').value.trim()
    const sobrenome = document.getElementById('sobrenome').value.trim()
    const rg = document.getElementById('rg').value.trim()
    const email = document.getElementById('email').value.trim()
    const login = document.getElementById('login').value.trim()
    const senha = document.getElementById('senha').value.trim()

    const [dados, erro] = await requests.POST_REGISTER(nome,sobrenome,rg, email, senha,login);
    if (dados[0] == "201") {
        window.location.href = "../../index.html"
    } 
});
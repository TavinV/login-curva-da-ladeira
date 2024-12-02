import * as requests from "../modules/requests.js" 

async function registrar() { 
    
    const nome = document.getElementById('nome').value.trim()
    const sobrenome = document.getElementById('sobrenome').value.trim()
    const rg = document.getElementById('rg').value.trim()
    const email = document.getElementById('email').value.trim()
    const login = document.getElementById('login').value.trim()
    const senha = document.getElementById('senha').value.trim()
    
    const [dados, erro] = await requests.POST_REGISTER(nome,sobrenome,rg, email, senha,login);
        
    if (dados == 201) {
        document.querySelector('popup').classList.toggle('active')
    } else {
        document.querySelector('.erro').innerText = erro
    }
};

const button = document.getElementById('registrar')

button.addEventListener("click", registrar)
const redirecionamentos = {
    adm: "../pages/admin.html",
    user: "../pages/boasvindas.html"
}

// {
//     "id": "0",
//     "nome": "Pedro",
//     "sobrenome": "Calais",
//     "email": "pedrocalais@gmail.com",
//     "login": "pedrolagum",
//     "senha": "descendoacurvadaladeira",
//     "rg": "287203074",
//     "adm": true
//   },

function redirect(user){
    const url = user.adm ? redirecionamentos.adm : redirecionamentos.user
    localStorage.setItem("id", user.id)
    window.location.href = url
}

export default redirect;
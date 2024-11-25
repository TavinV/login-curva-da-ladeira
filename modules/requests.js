const api = `http://localhost:3000/usuarios`

export async function GET() {
    try {
        const resposta = await fetch(api);
        const dados = await resposta.json();
        return [dados, null]; // dados e erro é nulo
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        return [erro, null]; // erro e os dados são nulos
    }
}


export async function POST_REGISTER(nome,sobrenome,rg,email,senha,login){
    //Enviar um função que puxa o valor de uma API - FETCH

    let info = [nome, sobrenome,rg,senha,login, email]
    let missingFields = info.filter(f => f == null || f == "")

    const user = {nome, sobrenome, rg, email, senha, login, adm: false}

    if (missingFields.length > 0) {
        return (null, "Campos obrigatórios faltando")
    } 
    else {
        try {       
            fetch(api, {
                method: 'POST', //Metodo POST HTTP
                headers: {
                    'Content-Type': 'application/json' //Tipo de conteudo enviado JSON
                },
                body: JSON.stringify(user) //Dados a serem enviados e convertidos
            })
            .then(resposta => resposta.JSON) //Converte a resposta para JSON
            return ["201", null]
            
        } catch (error) {
            return [null, erro]
        }
        
    }
}
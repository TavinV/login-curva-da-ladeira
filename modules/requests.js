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

async function verificarContaJaRegistrada(login, email, rg) {
    const [dados, erro] = await GET();

    if (erro) {
        console.error("Erro ao obter os usuários:", erro);
        return;
    }

    const users = dados;

    let loginJaExistente = users.filter(u => u.login == login)
    let emailJaExistente = users.filter(u => u.email == email)
    let rgJaExistente = users.filter(u => u.rg == rg)

    console.log(emailJaExistente)
    // Retorna o primeiro erro encontrado ou true se não houver problemas
    if (loginJaExistente.length > 0) return [false, "Esse login já foi cadastrado."];
    if (emailJaExistente.length > 0) return [false, "Esse email já foi cadastrado."];
    if (rgJaExistente.length > 0) return [false, "Esse RG já foi cadastrado."];

    // Se não houver nenhum problema, o usuário pode ser registrado
    return [true, null];
}

export async function POST_REGISTER(nome, sobrenome, rg, email, senha, login) {
    //Enviar um função que puxa o valor de uma API - FETCH

    let info = [nome, sobrenome, rg, senha, login, email]
    let missingFields = info.filter(f => f == null || f == "")

    const user = { nome, sobrenome, rg, email, senha, login, adm: false }

    if (missingFields.length > 0) {
        return [null, "Campos obrigatórios faltando"]
    }

    else {
        const contaPodeSerRegistrada = await verificarContaJaRegistrada(login, email, rg)
        console.log(login, email, senha)

        if (!contaPodeSerRegistrada[0]) {
            return [null, contaPodeSerRegistrada[1]]
        }

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
            return [null, 'Erro interno do servidor']
        }

    }
}

export async function DELETE(id) {
    fetch(`${api}/${id}`, {
        method: 'DELETE', //Metodo PUT HTTP
    })
        .then(resposta => resposta.JSON) //Converte a resposta para JSON
}

export async function PUT(id, body) {
    fetch(`${api}/${id}`, {
        method: 'PUT', //Metodo PUT HTTP
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}
import * as requests from '../modules/requests.js'

// Funções para controlar o popup de edição
function openEditModal(user) {

    document.getElementById("editName").value = user.nome;
    document.getElementById("editLastName").value = user.sobrenome;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editRG").value = user.rg;
    document.getElementById("editModal").style.display = "block";
}


// // Funções para controlar o popup de exclusão
function openDeleteModal(name) {
    document.getElementById("deleteUserName").innerText = name;
    document.getElementById("deleteModal").style.display = "block";
}

function deleteUser() {
    requests.DELETE(currentUserID)
    closeDeleteModal();
}

function updateUser() {

    let user = users.find(user => user.id == currentUserID);
    let novoUsuario = {
        nome: document.getElementById("editName").value,
        sobrenome: document.getElementById("editLastName").value,
        rg: document.getElementById("editRG").value,
        email: document.getElementById("editEmail").value,
        senha: user.senha,
        login: user.login,
        adm: user.adm
    }

    requests.PUT(currentUserID, novoUsuario)
}


document.querySelector("#confirm-delete-button").addEventListener('click', deleteUser)
document.getElementById('editForm').addEventListener('submit', updateUser)
// Carregando os usuários

function createUserCard(user) {
    return `
        <div class="card" data-id="${user.id}">
            <h3>${user.nome} ${user.sobrenome}</h3>
            <p>Email: ${user.email}</p>
            <p>RG: ${user.rg}</p>
            <div class="card-actions">
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Apagar</button>
            </div>
        </div>
    `;
}

let users = []
let currentUserID = null

async function carregarUsers() {
    const [dados, erro] = await requests.GET();
    if (erro) {
        console.error("Erro ao carregar os usuários: \n", erro);
    } else {
        users = dados
        const userCardsContainer = document.querySelector(".user-cards");

        // Insere os cards no contêiner
        users.forEach(user => {
            if (user.id != 0) {// Excluindo o usuário padrão
                const userCardHtml = createUserCard(user);
                userCardsContainer.innerHTML += userCardHtml;
            }
        });

        // Delegação de eventos no contêiner
        userCardsContainer.addEventListener("click", function (event) {
            const button = event.target;
            const card = button.closest(".card");

            if (card) {
                const userId = card.getAttribute("data-id");
                currentUserID = userId

                let user = users.find(user => user.id == userId);

                if (button.classList.contains("edit-btn")) {
                    openEditModal(user);
                }

                if (button.classList.contains("delete-btn")) {
                    openDeleteModal(`${user.nome} ${user.sobrenome} (ID: ${userId})`);
                }
            }
        });
    }
}


function buscarPorRG() {
    const searchInput = document.getElementById("searchInput").value.trim();

    // Limpa o contêiner
    const userCardsContainer = document.querySelector(".user-cards");
    userCardsContainer.innerHTML = "";

    // Filtra os usuários com base no RG
    const filteredUsers = users.filter(user => user.rg.includes(searchInput));

    // Renderiza apenas os usuários filtrados
    if (filteredUsers.length > 0) {
        filteredUsers.forEach(user => {
            const userCardHtml = createUserCard(user);
            userCardsContainer.innerHTML += userCardHtml;
        });
    } else {
        userCardsContainer.innerHTML = "<p>Nenhum usuário encontrado.</p>";
    }
}

document.getElementById("searchButton").addEventListener("click", buscarPorRG);

// Permite buscar ao pressionar "Enter" na barra de busca
document.getElementById("searchInput").addEventListener("keyup", function (event) {
    buscarPorRG();
});


window.addEventListener('load', carregarUsers)
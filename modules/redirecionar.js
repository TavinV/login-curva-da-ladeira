const redirecionamentos = {
    adm: "../pages/admin.html",
    user: "../pages/boasvindas.html",
    login: "../index.html"
}

export function redirect(user) {
    const url = user.adm ? redirecionamentos.adm : redirecionamentos.user
    localStorage.setItem("id", user.id)
    window.location.href = url
}

export function forceLogin() {
    localStorage.removeItem("id")
    window.location.href = redirecionamentos.login
}

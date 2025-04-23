import axios from "axios";

const api = axios.create({
    baseURL:"http://10.89.240.64:5000/api/v1/",
    headers:{
        'accept':'application/json'
    }
})

const sheets = {
    postLogin:(user)=>api.post("login/",user),
    postCadastro: (user) => api.post("user/", user),
    postCadastroEvento: (evento) => api.post("evento/", evento),
    postCadastroOrganizador: (orgs) => api.post("organizador/", orgs),
    postCadastroIngresso: (ingresso) => api.post("ingresso/", ingresso),
    getEventos: () => api.get("evento/"),
    getIngressoPorEvento: (idEvento) => api.get(`ingresso/evento/${idEvento}`),

}
export default sheets;
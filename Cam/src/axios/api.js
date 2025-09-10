    import axios  from "axios";

    const api = axios.create({
        baseURL: "http://10.89.240.85:5000/api/v1",

        headers:{
            accept: "application/json",
        }
    });

    export const createEvento = async (form,imageUri) => {
        const data = new FormData();
        
        for(let key in form){
            data.append(key, form[key])
        }

        if(imageUri){
            const filename = imageUri.split("/").pop()
            const match = /\.(\w+)$/.exec(filename);
            // [.extensão,extensão] ou seja [".png","png"]
            const type = match ?  `image/${match[1]}`:`image`;

            data.append("imagem", {
                uri:imageUri,   
                name:filename,
                type:type
            })
        }

        return api.post("/evento", data, {
            headers:{
                "Content-Type": "multipart/form-data",
            }
        })

    }

    export const getEventos = async () => {
        return api.get("/evento"); // já retorna todos os eventos
    };
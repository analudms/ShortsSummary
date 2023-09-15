import {server} from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")
 
//função que observa quando o botão é clicado
form.addEventListener("submit",async (event) => {
    event.preventDefault() //não recarregar a página
    content.classList.add("placeholder")


    const videoURL = input.value //recuperando o valor do input
   
    //verificando se é um shorts
    if(!videoURL.includes("shorts")){
       return content.textContent = "Esse vídeo não parece ser um short."
    }

    //obtendo id do vídeo
    const [_, params] = videoURL.split("/shorts/")
    const [videoID] = params.split("?si")

    content.textContent = "Obtendo o texto do áudio..."

    //passando a requisição do vídeo pelo id e ele devolve a transcrição do áudio
    const transcription = await server.get("/summary/" + videoID)

    content.textContent = "Realizando o resumo..."

    //enviando o resultado da transcrição
    const summary = await server.post("/summary", {
        text: transcription.data.result,
    })

    content.textContent = summary.data.result
    content.classList.remove("placeholder")
    
})

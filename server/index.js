//importando bibliotecas
import cors from 'cors'
import express from 'express' //error

import { convert } from "./convert.js"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js" 
//criando constante para utilizar as bibliotecas
const app = express()
app.use(express.json())
app.use(cors())

//recupera o id, faz download do vídeo e converte o video em audio
app.get("/summary/:id", async (request, response) => {
    try {
    console.log('antes do download')
    await download(request.params.id)
    console.log('depois do download')

    const audioConverted = await convert()
    console.log('depois do convert')

    
    const result = await transcribe(audioConverted)
    console.log('depois do transcribe')
    

    return response.json({result})
    }catch (error){
        console.log(error)
        return response.json({error})
    }
})

app.post("/summary", async (request, response) => {
    try {
        const result = await summarize(request.body.text)
        return response.json({result})
    }catch (error){
        console.log(error)
        return response.json({error})
    }
   
})

//iniciar servidor (escutando requisições)
app.listen(3333, () => console.log("Server is runner on port 3333"))
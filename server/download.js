//importando biblioteca
import ytdl from "ytdl-core"
import fs from "fs"

//exportando função para usar em outro arquivo
export const download = (videoId) =>
  console.log("chegou na funcao download o videoID:", videoId)

  new Promise((resolve, reject) => {
    //prometendo a quem fez uma solicitação retornar uma resposta, positiva ou negativa
    const videoURL = `https://youtube.com/shorts/${videoId}`
    console.log("realizando o download:", videoId)

    //definindo qualidade a serem baixadas
    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000;

        if (seconds > 60) {
          throw new Error("A duração desse vídeo é maior que 60 segundos.")
        }
      })
      .on("end", () => {
        console.log("Download do vídeo finalizado.")
        resolve()
      })
      .on("error", (error) => {
        console.log(
          "Não foi possível fazer o download do vídeo; Detalhes do erro:",
          error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  });

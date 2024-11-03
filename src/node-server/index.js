const express = require('express')
const {exec} = require("child_process");
const { stdout, stderr } = require('process');
const { Console } = require('console');

const shell_command = '"C:\\Program Files (x86)\\SoulseekQt\\SoulseekQt.exe"';

const kill_soulseek_process = 'taskkill /IM SoulseekQt.exe /F'

const app = express()

const port = 3000
let server


function killSoulseek(){
    exec(kill_soulseek_process,(error,stdout,stderr) => {
        if (error) {
            console.log(`Error al cerrar Soulseek: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })
}
app.get('/',(req,res)=>{
    exec(shell_command,(error,stdout,stderr) => {
        if(error){
            console.log(`Error: ${error.message}`)
            return
        }
        if(stderr){
            console.log(`stderr: ${stderr}`)
            return
        }
        console.log(`stdout: ${stdout}`)
    })
})

function startServer(){
    server = app.listen(port,() => {
        console.log(`Server started  >>> port: ${port}`)
        console.log(server)
    })
}

startServer()

process.on("SIGINT",()=>{
    if(server){
        server.close(()=>{
            killSoulseek()
        })
       
    }else{
        console.log("server already closed")
    }
})
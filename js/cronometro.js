// Verifica se o sorteio já foi realizado, utilizando o localStorage para armazenar o estado
let sorteioRealizado = localStorage.getItem("sorteioRealizado") === "true";

// Formata o tempo em segundos para o formato dias:hh:mm:ss
function formatarTempo(tempo) {
    const dias = String(Math.floor(tempo / 86400)).padStart(2, '0'); // Calcula dias
    const horas = String(Math.floor((tempo % 86400) / 3600)).padStart(2, '0'); // Calcula horas restantes
    const minutos = String(Math.floor((tempo % 3600) / 60)).padStart(2, '0'); // Calcula minutos restantes
    const segundos = String(tempo % 60).padStart(2, '0'); // Calcula segundos restantes
    return `${dias} / ${horas}:${minutos}:${segundos}`; // Retorna o tempo formatado
}

// Define a data e hora do sorteio e inicia o cronômetro para contagem regressiva
function diadosorteio(dia, mes, ano, hora) {
    const sorteioData = new Date(ano, mes - 1, dia, hora); // Cria o objeto Date com a data e hora do sorteio
    const intervalId = setInterval(() => {
        const agora = new Date(); // Obtém a hora atual
        const diferenca = sorteioData - agora; // Calcula a diferença de tempo em milissegundos

        if (diferenca > 0) {
            const segundosTotais = Math.floor(diferenca / 1000); // Converte a diferença para segundos
            document.getElementById("cronometro").textContent = formatarTempo(segundosTotais); // Atualiza o cronômetro no DOM
        } else {
            clearInterval(intervalId); // Para o cronômetro quando o tempo expira
            document.getElementById("cronometro").textContent = "00 / 00:00:00"; // Exibe 00 / 00:00:00 quando o tempo termina
            if (!sorteioRealizado) { // Verifica se o sorteio ainda não foi realizado
                sorteioRealizado = true; // Define o estado do sorteio como realizado
                localStorage.setItem("sorteioRealizado", "true"); // Armazena o estado no localStorage
                exibirMensagemSorteio(); // Exibe mensagem e inicia o sorteio
            }
        }
    }, 1000); // Executa a função a cada segundo
}


// Exemplo de uso da função diadosorteio
if (!sorteioRealizado) {
    diadosorteio(30, 9, 2025, 5,); // Configura a data e hora do sorteio
} else {
    document.getElementById("cronometro").textContent = "Serviço social:"; // Exibe mensagem caso o sorteio já tenha sido realizado
    document.getElementById("mensagem-sorteio").textContent = "Sorteio já realizado! Assim que possível será publicado no ambiênte 'Sorteios'."; // Mensagem de sorteio finalizado
}

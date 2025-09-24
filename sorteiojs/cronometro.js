// Verifica se o sorteio já foi realizado, utilizando o localStorage para armazenar o estado
let sorteioRealizado = localStorage.getItem("sorteioRealizado") === "true";

// Formata o tempo em segundos para o formato dias:hh:mm:ss
function formatarTempo(tempo) {
    const dias = String(Math.floor(tempo / 86400)).padStart(2, '0');
    const horas = String(Math.floor((tempo % 86400) / 3600)).padStart(2, '0');
    const minutos = String(Math.floor((tempo % 3600) / 60)).padStart(2, '0');
    const segundos = String(tempo % 60).padStart(2, '0');
    return `${dias} / ${horas}:${minutos}:${segundos}`;
}

// Define o tempo restante em minutos e inicia o cronômetro
function diadosorteio(minutosParaSorteio) {
    const agora = new Date();
    const sorteioData = new Date(agora.getTime() + minutosParaSorteio * 60000);

    const intervalId = setInterval(() => {
        const agoraAtualizado = new Date();
        const diferenca = sorteioData - agoraAtualizado;

        if (diferenca > 0) {
            const segundosTotais = Math.floor(diferenca / 1000);
            document.getElementById("cronometro").textContent = formatarTempo(segundosTotais);
        } else {
            clearInterval(intervalId);
            document.getElementById("cronometro").textContent = "Parabéns...";
            if (!sorteioRealizado) {
                sorteioRealizado = true;
                localStorage.setItem("sorteioRealizado", "true");
                exibirMensagemSorteio();
            }
        }
    }, 1000);
}

// Exibe a mensagem de "Sorteando..." e inicia o sorteio após 15 segundos
function exibirMensagemSorteio() {
    const mensagemSorteio = document.getElementById("mensagem-sorteio");
    mensagemSorteio.textContent = "Sorteando...";
    mensagemSorteio.classList.add("animacao-sorteio");

    setTimeout(() => {
        mensagemSorteio.textContent = "";
        realizarSorteio();
    }, 15000);
}

// Seleciona aleatoriamente os ganhadores entre os participantes confirmados
function realizarSorteio() {
    const ganhadores = [];
    const chavesParticipantes = Object.keys(numerosConfirmados || {});

    // Captura os valores dos prêmios diretamente do DOM
    const valoresPremios = [
        parseFloat(document.getElementById("primeiro-ganhador").textContent.replace(",", ".")) || 0,
        parseFloat(document.getElementById("segundo-ganhador").textContent.replace(",", ".")) || 0,
        parseFloat(document.getElementById("terceiro-ganhador").textContent.replace(",", ".")) || 0,
        parseFloat(document.getElementById("quarto-ganhador").textContent.replace(",", ".")) || 0,
        parseFloat(document.getElementById("quinto-ganhador").textContent.replace(",", ".")) || 0
    ];

    while (ganhadores.length < 5 && chavesParticipantes.length > 0) {
        const indexAleatorio = Math.floor(Math.random() * chavesParticipantes.length);
        const ganhador = chavesParticipantes.splice(indexAleatorio, 1)[0];
        ganhadores.push({ numero: ganhador, nome: numerosConfirmados[ganhador] });
    }

    const resultadoContainer = document.getElementById("resultado-sorteio");
    resultadoContainer.innerHTML = "<h2>Serviço social:</h2>" +
        ganhadores.map((g, i) =>
            `<p class="p5">${i + 1}° = R$ ${valoresPremios[i].toFixed(2)} / Núm: ${g.numero} (${g.nome})</p>`
        ).join("");
}

// Exemplo de uso da função diadosorteio com minutos
if (!sorteioRealizado) {
    diadosorteio(1); // Realiza o sorteio em x minutos a partir de agora
} else {
    
}

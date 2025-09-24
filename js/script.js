// Define o valor de cada número na rifa 
const valorPorNumero = 30; // Cada número custa R$30. 
let valorArrecadado = 0; // Inicializa o valor total arrecadado. 

// Lista de números confirmados com nomes 
let numerosConfirmados = {
    1: "J A O 971",
    
    2: "xxx", 3: "xxx", 4: "xxx", 5: "xxx", 6: "xxx", 7: "xxx", 8: "xxx", 9: "xxx", 10: "xxx",
    //11: "xxx", 12: "xxx", 13: "xxx", 14: "xxx", 15: "xxx", 16: "xxx", 17: "xxx", 18: "xxx", 19: "xxx", 20: "xxx",
    //21: "xxx", 22: "xxx", 23: "xxx", 24: "xxx", 25: "xxx", 26: "xxx", 27: "xxx", 28: "xxx", 29: "xxx", 30: "xxx",
    //31: "xxx", 32: "xxx", 33: "xxx", 34: "xxx", 35: "xxx", 36: "xxx", 37: "xxx", 38: "xxx", 39: "xxx", 40: "xxx",
    //41: "xxx", 42: "xxx", 43: "xxx", 44: "xxx", 45: "xxx", 46: "xxx", 47: "xxx", 48: "xxx", 49: "xxx", 50: "xxx",
    //51: "xxx", 52: "xxx", 53: "xxx", 54: "xxx", 55: "xxx", 56: "xxx", 57: "xxx", 58: "xxx", 59: "xxx", 60: "xxx",
    //61: "xxx", 62: "xxx", 63: "xxx", 64: "xxx", 65: "xxx", 66: "xxx", 67: "xxx", 68: "xxx", 69: "xxx", 70: "xxx",
    //71: "xxx", 72: "xxx", 73: "xxx", 74: "xxx", 75: "xxx", 76: "xxx", 77: "xxx", 78: "xxx", 79: "xxx", 80: "xxx",
    //81: "xxx", 82: "xxx", 83: "xxx", 84: "xxx", 85: "xxx", 86: "xxx", 87: "xxx", 88: "xxx", 89: "xxx", 90: "xxx",
    //91: "xxx", 92: "xxx", 93: "xxx", 94: "xxx", 95: "xxx", 96: "xxx", 97: "xxx", 98: "xxx", 99: "xxx", 100: "xxx"
}; // Objeto para armazenar números e seus respectivos nomes. 

// Atualiza os valores exibidos na página e calcula os ganhos 
function atualizarValores() {
    // Calcula o valor total arrecadado com base nos números confirmados 
    valorArrecadado = Object.keys(numerosConfirmados).length * valorPorNumero;

    // Calcula os valores das premiações com base nas porcentagens 
    const quintoGanhador = valorArrecadado * 0.04;
    const quartoGanhador = valorArrecadado * 0.06;
    const terceiroGanhador = valorArrecadado * 0.08;
    const segundoGanhador = valorArrecadado * 0.10;
    const primeiroGanhador = valorArrecadado * 0.12;
    const manutencao = valorArrecadado * 0.03; //destinados à manutenção. 

    // Calcula o valor restante para o cliente após deduzir premiações e manutenção 
    const cliente = valorArrecadado - (
        quintoGanhador +
        quartoGanhador +
        terceiroGanhador +
        segundoGanhador +
        primeiroGanhador +
        manutencao
    );

    // Atualiza os valores no DOM (interface da página) 
    document.getElementById('valor-arrecadado').textContent = valorArrecadado.toFixed(2); // Valor total arrecadado. 
    document.getElementById('manutenção').textContent = manutencao.toFixed(2); // Valor da manutenção. 
    document.getElementById('primeiro-ganhador').textContent = primeiroGanhador.toFixed(2); // Premiação do 1º ganhador. 
    document.getElementById('segundo-ganhador').textContent = segundoGanhador.toFixed(2); // Premiação do 2º ganhador. 
    document.getElementById('terceiro-ganhador').textContent = terceiroGanhador.toFixed(2); // Premiação do 3º ganhador. 
    document.getElementById('quarto-ganhador').textContent = quartoGanhador.toFixed(2); // Premiação do 4º ganhador. 
    document.getElementById('quinto-ganhador').textContent = quintoGanhador.toFixed(2); // Premiação do 5º ganhador. 
    document.getElementById('cliente').textContent = cliente.toFixed(2); // Valor restante para o cliente. 

    atualizarListaParticipantes(); // Atualiza a lista de participantes na interface. 
}

// Atualiza a lista de números e nomes confirmados no DOM 
function atualizarListaParticipantes() {
    const listaContainer = document.getElementById('lista-participantes');
    listaContainer.innerHTML = ''; // Limpa o conteúdo atual da lista. 

    // Cria um contêiner flexível para exibir os participantes 
    const listaFlexContainer = document.createElement('div');
    listaFlexContainer.style.display = 'flex'; // Define a disposição em linhas flexíveis. 
    listaFlexContainer.style.flexWrap = 'wrap'; // Permite que os itens se ajustem automaticamente. 
    listaContainer.appendChild(listaFlexContainer);

    // Adiciona cada número e nome confirmado à lista 
    Object.entries(numerosConfirmados).forEach(([numero, nome]) => {
        const listItem = document.createElement('div');
        listItem.style.margin = '1px'; // Espaçamento entre os itens. 
        listItem.textContent = ` ${numero}(${nome})`; // Exibe número e nome confirmados. 
        listaFlexContainer.appendChild(listItem); // Adiciona o item ao contêiner. 
    });
}

// Adiciona ou remove um número confirmado na lista 
function modificarNumeroConfirmado(numero, nome = null) {
    if (nome) {
        numerosConfirmados[numero] = nome; // Adiciona o número com o nome no objeto. 
    } else {
        delete numerosConfirmados[numero]; // Remove o número do objeto. 
    }
    atualizarValores(); // Atualiza valores e interface após alterações. 
}
// Inicializa os valores exibidos na página 
atualizarValores(); // Exibe os valores iniciais na interface. 
// Cria botões para os números disponíveis na rifa e configura eventos 
const numbersContainer = document.querySelector('.numbers-container');
for (let i = 1; i <= 50; i++) { // Loop para criar botões de 1 a 0000. 
    const button = document.createElement('button');
    button.textContent = i; // Define o texto do botão com o número. 
    button.className = 'number-btn'; // Adiciona classe ao botão. 
    button.disabled = numerosConfirmados.hasOwnProperty(i); // Desativa botão se o número já estiver confirmado. 
    // Adiciona um evento de clique ao botão 
    button.addEventListener('click', () => {

        alert('Programa parado!'); // Pausa a seleção de números.
        //const confirmacao = confirm(` ${i}. Deseja continuar?`); // Pausa o envio da mensagem para o WhatsApp. 

        if (confirmacao) {
            const numeroWhatsApp = "5562981208278"; // Número de WhatsApp para envio. 
            const mensagem = `Olá! Escolhi o número ${i} na rifa *Projeto rifa solidaria.*`; // Mensagem a ser enviada. 
            const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;
            window.open(url, '_blank'); // Abre a URL do WhatsApp em nova aba. 
            modificarNumeroConfirmado(i, `aguardando confirmação ${i}`); // Marca o número como aguardando confirmação. 
            button.disabled = true; // Desativa o botão após a escolha. 
        }
    });
    numbersContainer.appendChild(button); // Adiciona o botão ao contêiner na interface. 
}

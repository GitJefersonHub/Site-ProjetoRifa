// Define o valor de cada número na rifa 
const valorPorNumero = 20; // Cada número custa R$20. 
let valorArrecadado = 0; // Inicializa o valor total arrecadado. 

// Lista de números confirmados com nomes 
let numerosConfirmados = {
    9: "xxx"
}; // Objeto para armazenar números e seus respectivos nomes. 

// Atualiza os valores exibidos na página e calcula os ganhos 
function atualizarValores() {
    // Calcula o valor total arrecadado com base nos números confirmados 
    valorArrecadado = Object.keys(numerosConfirmados).length * valorPorNumero;

    // Calcula os valores das premiações com base nas porcentagens 
    const quintoGanhador = valorArrecadado * 0.0291; // 2,91% do total arrecadado. 
    const quartoGanhador = valorArrecadado * 0.0459; // 4,59%. 
    const terceiroGanhador = valorArrecadado * 0.0629; // 6,29%. 
    const segundoGanhador = valorArrecadado * 0.08237; // 8,237%. 
    const primeiroGanhador = valorArrecadado * 0.10514; // 10,514%. 
    const manutencao = valorArrecadado * 0.0699; // 6,99% destinados à manutenção. 

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
        listItem.style.margin = '10px'; // Espaçamento entre os itens. 
        listItem.textContent = `${numero}: ${nome}`; // Exibe número e nome confirmados. 
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
for (let i = 1; i <= 40; i++) { // Loop para criar botões de 1 a 40. 
    const button = document.createElement('button');
    button.textContent = i; // Define o texto do botão com o número. 
    button.className = 'number-btn'; // Adiciona classe ao botão. 
    button.disabled = numerosConfirmados.hasOwnProperty(i); // Desativa botão se o número já estiver confirmado. 
    // Adiciona um evento de clique ao botão 
    button.addEventListener('click', () => {

        alert('Programa parado para manutenção!'); // Pausa a seleção de números.
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

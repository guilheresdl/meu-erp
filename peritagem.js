function exibirOpcoes() {
    const pecaSelecionada = document.getElementById("pecas").value;
    const acoesContainer = document.getElementById("acoesContainer");
    const opcoesEspecificas = document.getElementById("opcoesEspecificas");
    
    // Limpar opções anteriores
    acoesContainer.innerHTML = "";

    // Verifica a peça selecionada e define as opções de ação
    let opcoes = [];
    switch (pecaSelecionada) {
        case "haste":
            opcoes = ["Fabricar", "Cromar", "Rec. Rosca"];
            break;
        case "camisa":
            opcoes = ["Fabricar", "Brunir", "Rec. Rosca"];
            break;
        case "olhal":
            opcoes = ["Fabricar", "Rec. Furo", "Rec. Rosca"];
            break;
        case "flange":
            opcoes = ["Fabricar", "Recuperar"];
            break;
        case "fundo":
            opcoes = ["Fabricar", "Rec. Olhal"];
            break;
        case "embolo":
            opcoes = ["Fabricar", "Rec. Olhal", "Rec. Rosca"];
            break;
        case "espacador":
            opcoes = ["Fabricar", "Recuperar"];
            break;
        case "jogoVedacao":
            opcoes = ["Substituir", "Cliente Vai Fornecer"];
            break;
        default:
            opcoesEspecificas.classList.add("hidden");
            return;
    }

    // Adiciona as novas opções de ação como checkboxes
    opcoes.forEach(opcao => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = opcao;
        checkbox.value = opcao.toLowerCase().replace(/ /g, "-");

        const label = document.createElement("label");
        label.htmlFor = opcao;
        label.textContent = opcao;

        // Agrupando checkbox e label em um div
        const div = document.createElement("div");
        div.classList.add("checkbox-group");
        div.appendChild(checkbox);
        div.appendChild(label);
        acoesContainer.appendChild(div);
    });

    opcoesEspecificas.classList.remove("hidden");
}

function adicionarPeca() {
    const nomePeca = document.getElementById("pecas").value;
    const acoes = Array.from(document.querySelectorAll('#acoesContainer input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
    const diametro = document.getElementById("diametro").value;
    const comprimento = document.getElementById("comprimento").value;
    const largura = document.getElementById("largura").value;

    // Adiciona uma nova linha na tabela
    const table = document.getElementById("tabelaResumos").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${nomePeca.charAt(0).toUpperCase() + nomePeca.slice(1)}</td>
        <td>${acoes.join(', ')}</td>
        <td>${diametro}</td>
        <td>${comprimento}</td>
        <td>${largura}</td>
        <td><span class="delete-button" onclick="excluirLinha(this)">X</span></td>
    `;

    // Limpa os campos após a adição
    document.getElementById("pecas").value = "";
    document.getElementById("acoesContainer").innerHTML = ""; // Limpa as ações
    document.getElementById("diametro").value = "";
    document.getElementById("comprimento").value = "";
    document.getElementById("largura").value = "";
    document.getElementById("opcoesEspecificas").classList.add("hidden"); // Esconde as opções específicas
}

function excluirLinha(button) {
    const row = button.parentNode.parentNode; // Captura a linha que contém o botão
    row.parentNode.removeChild(row); // Remove a linha da tabela
}

function definirDataHoje() {
    const dataInput = document.getElementById("dataPeritagem");
    const hoje = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    dataInput.value = hoje; // Define a data atual no campo
}


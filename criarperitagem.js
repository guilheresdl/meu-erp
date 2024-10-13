document.getElementById('data').value = new Date().toISOString().split('T')[0];

function mostrarOpcoesPeca() {
    const pecaSelecionada = document.getElementById("peca").value;
    const opcoesDiv = document.getElementById("opcoesPeca");
    opcoesDiv.innerHTML = ''; // Limpa o conteúdo anterior
    if (pecaSelecionada === "") {
        opcoesDiv.classList.add("hidden");
        return;
    }

    let acoes = [];
    let campos = '';

    switch (pecaSelecionada) {
        case 'Haste':
            acoes = ['Fabricar', 'Cromar', 'Recuperar Rosca'];
            break;
        case 'Camisa':
            acoes = ['Fabricar', 'Brunir', 'Recuperar Rosca'];
            break;
        case 'Olhal':
            acoes = ['Fabricar', 'Recuperar Furo', 'Recuperar Rosca'];
            break;
        case 'Flange':
            acoes = ['Fabricar', 'Recuperar'];
            break;
        case 'Fundo':
            acoes = ['Fabricar', 'Recuperar Olhal'];
            break;
        case 'Êmbolo':
            acoes = ['Fabricar', 'Recuperar Olhal', 'Recuperar Rosca'];
            break;
        case 'Espaçador':
            acoes = ['Fabricar', 'Recuperar'];
            break;
        case 'Jogo de Vedação':
            acoes = ['Substituir', 'Cliente Vai Fornecer'];
            break;
    }

    campos += `
        <div class="form-group">
            <label>Ações Disponíveis:</label>
            ${acoes.map(acao => `<label><input type="checkbox" name="acao" value="${acao}">${acao}</label>`).join(' ')}
        </div>
        <div class="form-group">
            <label for="diametro">Diâmetro (mm):</label>
            <input type="text" id="diametro" name="diametro">
        </div>
        <div class="form-group">
            <label for="comprimento">Comprimento (mm):</label>
            <input type="text" id="comprimento" name="comprimento">
        </div>
        <div class="form-group">
            <label for="largura">Largura (mm):</label>
            <input type="text" id="largura" name="largura">
        </div>
    `;

    opcoesDiv.innerHTML = campos;
    opcoesDiv.classList.remove("hidden");
}

function adicionarPeca() {
    const peca = document.getElementById("peca").value;
    const acoesSelecionadas = Array.from(document.querySelectorAll('input[name="acao"]:checked')).map(e => e.value);
    const diametro = document.getElementById("diametro").value;
    const comprimento = document.getElementById("comprimento").value;
    const largura = document.getElementById("largura").value;

    if (!peca || !acoesSelecionadas.length || !diametro || !comprimento) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const tabela = document.getElementById("resumoTabela").querySelector("tbody");
    const novaLinha = tabela.insertRow();

    novaLinha.innerHTML = `
        <td>${peca}</td>
        <td>${acoesSelecionadas.join(", ")}</td>
        <td>${diametro}</td>
        <td>${comprimento}</td>
        <td>${largura || 'N/A'}</td>
        <td><button type="button" onclick="removerLinha(this)">Remover</button></td>
    `;

    document.getElementById("peca").value = "";
    document.getElementById("opcoesPeca").innerHTML = "";
    document.getElementById("opcoesPeca").classList.add("hidden");
}

function removerLinha(botao) {
    const linha = botao.closest("tr");
    linha.remove();
}

function resetarFormulario() {
    document.getElementById("peritagemForm").reset();
    document.getElementById("resumoTabela").querySelector("tbody").innerHTML = "";
}

function gerarPDF() {
    alert("Função para gerar PDF será implementada.");
}


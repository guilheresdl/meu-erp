document.getElementById('data').value = new Date().toISOString().split('T')[0];

// Atualiza as opções disponíveis quando uma peça é selecionada
document.getElementById('peca').addEventListener('change', function() {
    const pecaSelecionada = this.value;
    const opcoesPeca = document.getElementById('opcoesPeca');
    
    let html = '';

    switch (pecaSelecionada) {
        case 'haste':
            html = `<div class="form-group">
                        <label>Ação:</label>
                        <input type="checkbox" id="fabricarHaste"> Fabricar
                        <input type="checkbox" id="cromarHaste"> Cromar
                        <input type="checkbox" id="recRoscaHaste"> Rec. Rosca
                    </div>
                    <div class="form-group">
                        <label for="diametroHaste">Diâmetro (mm):</label>
                        <input type="text" id="diametroHaste" required>
                    </div>
                    <div class="form-group">
                        <label for="comprimentoHaste">Comprimento (mm):</label>
                        <input type="text" id="comprimentoHaste" required>
                    </div>
                    <div class="form-group">
                        <label for="larguraHaste">Largura (mm):</label>
                        <input type="text" id="larguraHaste">
                    </div>`;
            break;

        case 'camisa':
            html = `<div class="form-group">
                        <label>Ação:</label>
                        <input type="checkbox" id="fabricarCamisa"> Fabricar
                        <input type="checkbox" id="brunirCamisa"> Brunir
                        <input type="checkbox" id="recRoscaCamisa"> Rec. Rosca
                    </div>
                    <div class="form-group">
                        <label for="diametroCamisa">Diâmetro (mm):</label>
                        <input type="text" id="diametroCamisa" required>
                    </div>
                    <div class="form-group">
                        <label for="comprimentoCamisa">Comprimento (mm):</label>
                        <input type="text" id="comprimentoCamisa" required>
                    </div>
                    <div class="form-group">
                        <label for="larguraCamisa">Largura (mm):</label>
                        <input type="text" id="larguraCamisa">
                    </div>`;
            break;

        case 'olhal':
            html = `<div class="form-group">
                        <label>Ação:</label>
                        <input type="checkbox" id="fabricarOlhal"> Fabricar
                        <input type="checkbox" id="recFuroOlhal"> Rec. Furo
                        <input type="checkbox" id="recRoscaOlhal"> Rec. Rosca
                    </div>
                    <div class="form-group">
                        <label for="diametroOlhal">Diâmetro (mm):</label>
                        <input type="text" id="diametroOlhal" required>
                    </div>
                    <div class="form-group">
                        <label for="comprimentoOlhal">Comprimento (mm):</label>
                        <input type="text" id="comprimentoOlhal" required>
                    </div>
                    <div class="form-group">
                        <label for="larguraOlhal">Largura (mm):</label>
                        <input type="text" id="larguraOlhal">
                    </div>`;
            break;

        case 'flange':
            html = `<div class="form-group">
                        <label>Ação:</label>
                        <input type="checkbox" id="fabricarFlange"> Fabricar
                        <input type="checkbox" id="recuperarFlange"> Recuperar
                    </div>
                    <div class="form-group">
                        <label for="diametroFlange">Diâmetro (mm):</label>
                        <input type="text" id="diametroFlange" required>
                    </div>
                    <div class="form-group">
                        <label for="comprimentoFlange">Comprimento (mm):</label>
                        <input type="text" id="comprimentoFlange" required>
                    </div>
                    <div class="form-group">
                        <label for="larguraFlange">Largura (mm):</label>
                        <input type="text" id="larguraFlange">
                    </div>`;
            break;

        case 'fundo':
            html = `<div class="form-group">
                        <label>Ação:</label>
                        <input type="checkbox" id="fabricarFundo"> Fabricar
                        <input type="checkbox" id="recOlhalFundo"> Rec. Olhal
                    </div>
                    <div class="form-group">
                        <label for="diametroFundo">Diâmetro (mm):</label>
                        <input type="text" id="diametroFundo" required>
                    </div>
                    <div class="form-group">
                        <label for="comprimentoFundo">Comprimento (mm):</label>
                        <input type="text" id="comprimentoFundo" required>
                    </div>
                    <div class="form-group">
                        <label for="larguraFundo">Largura (mm):</label>
                        <input type="text" id="larguraFundo">
                    </div>`;
            break;

        case 'embolo':
            html = `<div class="form-group">
                        <label>Ação:</label>
                        <input type="checkbox" id="fabricarEmbolo"> Fabricar
                        <input type="checkbox" id="recOlhalEmbolo"> Rec. Olhal
                        <input type="checkbox" id="recRoscaEmbolo"> Rec. Rosca
                    </div>
                    <div class="form-group">
                        <label for="diametroEmbolo">Diâmetro (mm):</label>
                        <input type="text" id="diametroEmbolo" required>
                    </div>
                    <div class="form-group">
                        <label for="comprimentoEmbolo">Comprimento (mm):</label>
                        <input type="text" id="comprimentoEmbolo" required>
                    </div>
                    <div class="form-group">
                        <label for="larguraEmbolo">Largura (mm):</label>
                        <input type="text" id="larguraEmbolo">
                    </div>`;
            break;

        case 'espacador':
            html = `<div class="form-group">
                        <label>Ação:</label>
                        <input type="checkbox" id="fabricarEspacador"> Fabricar
                        <input type="checkbox" id="recuperarEspacador"> Recuperar
                    </div>
                    <div class="form-group">
                        <label for="diametroEspacador">Diâmetro (mm):</label>
                        <input type="text" id="diametroEspacador" required>
                    </div>
                    <div class="form-group">
                        <label for="comprimentoEspacador">Comprimento (mm):</label>
                        <input type="text" id="comprimentoEspacador" required>
                    </div>
                    <div class="form-group">
                        <label for="larguraEspacador">Largura (mm):</label>
                        <input type="text" id="larguraEspacador">
                    </div>`;
            break;

        case 'jogoVedacao':
            html = `<div class="form-group">
                        <label>Ação:</label>
                        <input type="checkbox" id="substituirJogoVedacao"> Substituir
                        <input type="checkbox" id="clienteFornecer"> Cliente Vai Fornecer
                    </div>`;
            break;
    }

    opcoesPeca.innerHTML = html;
});

// Função para adicionar a peça à tabela de resumo
function adicionarPeca() {
    const pecaSelecionada = document.getElementById('peca').value;
    const acao = getAcao(pecaSelecionada);
    const diametro = document.getElementById(`diametro${pecaSelecionada.charAt(0).toUpperCase() + pecaSelecionada.slice(1)}`).value;
    const comprimento = document.getElementById(`comprimento${pecaSelecionada.charAt(0).toUpperCase() + pecaSelecionada.slice(1)}`).value;
    const largura = document.getElementById(`largura${pecaSelecionada.charAt(0).toUpperCase() + pecaSelecionada.slice(1)}`).value;

    const tabela = document.querySelector('#resumoTable tbody');
    const novaLinha = tabela.insertRow();

    novaLinha.innerHTML = `
        <td>${pecaSelecionada.charAt(0).toUpperCase() + pecaSelecionada.slice(1)}</td>
        <td>${acao}</td>
        <td>${diametro}</td>
        <td>${comprimento}</td>
        <td>${largura}</td>
    `;

    // Limpar campos após adicionar
    document.getElementById('peca').value = '';
    document.getElementById('opcoesPeca').innerHTML = '';
}

function getAcao(peca) {
    const acoes = [];
    const checkboxes = document.querySelectorAll(`#opcoesPeca input[type="checkbox"]`);

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            acoes.push(checkbox.id.replace(peca.toLowerCase() + 'Haste', '').replace(peca.toLowerCase() + 'Camisa', '').replace(peca.toLowerCase() + 'Olhal', '').replace(peca.toLowerCase() + 'Flange', '').replace(peca.toLowerCase() + 'Fundo', '').replace(peca.toLowerCase() + 'Embolo', '').replace(peca.toLowerCase() + 'Espacador', '').replace(peca.toLowerCase() + 'JogoVedacao', ''));
        }
    });

    return acoes.join(', ');
}

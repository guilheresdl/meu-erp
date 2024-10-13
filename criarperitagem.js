// Função para definir a data atual no campo de data
function definirDataAtual() {
    const dataInput = document.getElementById("data");
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const ano = dataAtual.getFullYear();
    dataInput.value = `${dia}/${mes}/${ano}`;
}

// Chama a função para definir a data ao carregar a página
window.onload = definirDataAtual;

function exibirOpcoes() {
    const peca = document.getElementById("peca").value;
    const opcoesContainer = document.getElementById("opcoesPeca");
    const acoesContainer = document.querySelector('.acoes-container');
    const medidasContainer = document.querySelector('.medidas-container');
    acoesContainer.innerHTML = ""; // Limpa as opções anteriores
    medidasContainer.classList.add("hidden"); // Oculta o container de medidas

    if (peca) {
        opcoesContainer.classList.remove("hidden");

        let acoesDisponiveis = [];
        switch (peca) {
            case 'haste':
                acoesDisponiveis = ['Fabricar', 'Cromar', 'Rec. Rosca'];
                break;
            case 'camisa':
                acoesDisponiveis = ['Trocar', 'Limpar'];
                break;
            case 'olhal':
                acoesDisponiveis = ['Verificar', 'Substituir'];
                break;
            case 'flange':
                acoesDisponiveis = ['Instalar', 'Remover'];
                break;
            case 'fundo':
                acoesDisponiveis = ['Ajustar', 'Trocar'];
                break;
            case 'embolo':
                acoesDisponiveis = ['Lubrificar', 'Limpar'];
                break;
            case 'espacador':
                acoesDisponiveis = ['Medir', 'Ajustar'];
                break;
            case 'jogoVedacao':
                acoesDisponiveis = ['Trocar', 'Verificar'];
                break;
        }

        // Adiciona as ações disponíveis
        acoesDisponiveis.forEach(acao => {
            const acaoDiv = document.createElement('div');
            acaoDiv.classList.add('acao-disponivel');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = acao;

            const label = document.createElement('label');
            label.setAttribute('for', acao);
            label.textContent = acao;

            acaoDiv.appendChild(checkbox);
            acaoDiv.appendChild(label);
            acoesContainer.appendChild(acaoDiv);
        });

        medidasContainer.classList.remove("hidden"); // Mostra o container de medidas
    }
}

function adicionarPeca() {
    const peca = document.getElementById("peca").value;
    const acoes = Array.from(document.querySelectorAll('.acao-disponivel input:checked'))
        .map(input => input.id)
        .join(", ");
    const diametro = document.getElementById("diametro").value;
    const comprimento = document.getElementById("comprimento").value;
    const largura = document.getElementById("largura").value;

    const tabela = document.getElementById("resumoTable").getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();

    // Adiciona as células na nova linha
    novaLinha.insertCell(0).textContent = peca;
    novaLinha.insertCell(1).textContent = acoes;
    novaLinha.insertCell(2).textContent = diametro;
    novaLinha.insertCell(3).textContent = comprimento;
    novaLinha.insertCell(4).textContent = largura;

    // Célula para excluir a linha
    const acaoCell = novaLinha.insertCell(5);
    const excluirBtn = document.createElement('span');
    excluirBtn.textContent = 'X';
    excluirBtn.classList.add('excluir');
    excluirBtn.onclick = function() {
        tabela.deleteRow(novaLinha.rowIndex - 1); // -1 porque o índice da tabela começa em 0 e a primeira linha é o cabeçalho
    };
    acaoCell.appendChild(excluirBtn);

    // Limpa os campos após adicionar
    document.getElementById("peca").value = "";
    document.getElementById("diametro").value = "";
    document.getElementById("comprimento").value = "";
    document.getElementById("largura").value = "";
    document.querySelector('.acoes-container').innerHTML = ""; // Limpa as opções
    document.querySelector('.medidas-container').classList.add("hidden"); // Oculta o container de medidas
}

function enviarFormulario() {
    // Aqui você pode adicionar a lógica para enviar o formulário e os anexos
    alert('Formulário enviado!');
}

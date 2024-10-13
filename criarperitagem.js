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

// Função para exibir opções de ações conforme a peça selecionada
function exibirOpcoes() {
    const peca = document.getElementById("peca").value;
    const acoesContainer = document.querySelector('.acoes-container');
    const medidasContainer = document.querySelector('.medidas-container');
    const opcoesPeca = document.getElementById("opcoesPeca");

    acoesContainer.innerHTML = ""; // Limpa as opções anteriores
    medidasContainer.classList.add("hidden"); // Oculta o container de medidas
    opcoesPeca.classList.remove("hidden"); // Garante que o container de opções da peça seja exibido

    if (peca) {
        medidasContainer.classList.remove("hidden"); // Mostra o container de medidas

        let acoesDisponiveis = [];
        switch (peca) {
            case 'haste':
                acoesDisponiveis = ['Fabricar', 'Cromar', 'Recuperar Olhal'];
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
            checkbox.name = acao; // Adiciona um nome para o checkbox

            const label = document.createElement('label');
            label.setAttribute('for', acao);
            label.textContent = acao;

            acaoDiv.appendChild(checkbox);
            acaoDiv.appendChild(label);
            acoesContainer.appendChild(acaoDiv);
        });
    }
}

// Função para adicionar uma peça à tabela
function adicionarPeca() {
    const peca = document.getElementById("peca").value;
    const acoes = Array.from(document.querySelectorAll('.acao-disponivel input:checked'))
        .map(input => input.name)
        .join(", "); // Use o nome para manter a referência correta
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
    medidasContainer.classList.add("hidden"); // Oculta o container de medidas
}

// Função para gerar o PDF
async function gerarPDF() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();
    const cliente = document.getElementById("cliente").value;
    const equipamento = document.getElementById("equipamento").value;
    const ss = document.getElementById("ss").value;
    const id = document.getElementById("id").value;
    const responsavel = document.getElementById("responsavel").value;
    const data = document.getElementById("data").value;

    // Título do PDF
    doc.setFontSize(18);
    doc.text(`Peritagem SS ${ss} - ${id}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Cliente: ${cliente}`, 10, 20);
    doc.text(`Equipamento: ${equipamento}`, 10, 25);
    doc.text(`Data: ${data}`, 10, 30);
    
    const tabela = document.getElementById("resumoTable").getElementsByTagName('tbody')[0];
    const totalLinhas = tabela.rows.length;

    doc.text("Peças:", 10, 45);

    for (let i = 0; i < totalLinhas; i++) {
        const linha = tabela.rows[i];
        const peca = linha.cells[0].textContent;
        const acoes = linha.cells[1].textContent;
        const diametro = linha.cells[2].textContent;
        const comprimento = linha.cells[3].textContent;
        const largura = linha.cells[4].textContent;

        // Adiciona as informações da peça no PDF
        const y = 50 + (i * 10); // Define a posição vertical para cada linha
        doc.text(`${peca} - ${acoes}`, 10, y);
        doc.text(`Diâmetro: ${diametro} mm`, 10, y + 5);
        doc.text(`Comprimento: ${comprimento} mm`, 10, y + 10);
        doc.text(`Largura: ${largura} mm`, 10, y + 15);
    }

    // Adiciona imagens se houver
    const anexos = document.getElementById("anexos").files;
    if (anexos.length > 0) {
        const imagePromises = [];

        for (let i = 0; i < anexos.length; i++) {
            const file = anexos[i];
            const reader = new FileReader();
            imagePromises.push(new Promise((resolve) => {
                reader.onload = (event) => {
                    resolve(event.target.result);
                };
                reader.readAsDataURL(file);
            }));
        }

        const images = await Promise.all(imagePromises);
        const espacoEntreImagens = 5; // Espaço entre as imagens
        let yImagem = 50 + (totalLinhas * 10) + 10; // Ajusta a posição vertical para a primeira imagem
        images.forEach((imgSrc, index) => {
            doc.addImage(imgSrc, 'JPEG', 10, yImagem, 50, 50);
            yImagem += 50 + espacoEntreImagens; // Atualiza a posição para a próxima imagem
        });
    }

    // Informações finais
    const yFinal = yImagem + 10; // Espaço entre imagens e informações finais
    doc.text(`Responsável: ${responsavel}`, 10, yFinal);
    doc.text(`Data: ${data}`, 10, yFinal + 5);

    // Salvar PDF
    doc.save(`peritagem_ss_${ss}_${id}.pdf`);
}

// Função para enviar o formulário
function enviarFormulario() {
    // Aqui você pode adicionar a lógica para enviar o formulário e os anexos
    alert('Formulário enviado!');
}

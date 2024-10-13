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
                acoesDisponiveis = ['Recuperar', 'Trocar'];
                break;
            case 'espacador':
                acoesDisponiveis = ['Verificar', 'Trocar'];
                break;
            case 'jogoVedacao':
                acoesDisponiveis = ['Substituir', 'Ajustar'];
                break;
        }

        acoesDisponiveis.forEach(acao => {
            const div = document.createElement('div');
            div.classList.add('acao-disponivel');
            div.innerHTML = `<input type="checkbox"> ${acao}`;
            acoesContainer.appendChild(div);
        });
    }
}

// Função para adicionar a peça à tabela
function adicionarPeca() {
    const peca = document.getElementById("peca").value;
    const acoes = Array.from(document.querySelectorAll('.acoes-container input[type="checkbox"]:checked'))
        .map(cb => cb.nextSibling.textContent.trim()).join(", ");
    const diametro = document.getElementById("diametro").value;
    const comprimento = document.getElementById("comprimento").value;
    const largura = document.getElementById("largura").value;

    const tabela = document.getElementById("resumoTable").getElementsByTagName('tbody')[0];
    const novaLinha = tabela.insertRow();

    novaLinha.insertCell(0).textContent = peca;
    novaLinha.insertCell(1).textContent = acoes;
    novaLinha.insertCell(2).textContent = diametro;
    novaLinha.insertCell(3).textContent = comprimento;
    novaLinha.insertCell(4).textContent = largura;

    // Criando a célula de excluir
    const acaoCell = novaLinha.insertCell(5);
    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.onclick = () => tabela.deleteRow(novaLinha.rowIndex - 1);
    acaoCell.appendChild(botaoExcluir);

    // Limpa os campos após adicionar a peça
    document.getElementById("peca").value = "";
    document.querySelector('.acoes-container').innerHTML = "";
    document.getElementById("diametro").value = "";
    document.getElementById("comprimento").value = "";
    document.getElementById("largura").value = "";
}

// Função para gerar o PDF com os dados da peritagem
async function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const { autoTable } = window.jspdf;

    const doc = new jsPDF();
    const cliente = document.getElementById("cliente").value;
    const equipamento = document.getElementById("equipamento").value;
    const ss = document.getElementById("ss").value + document.getElementById("id").value;
    const responsavel = document.getElementById("responsavel").value;
    const data = document.getElementById("data").value;

    doc.text(`Peritagem - ${data}`, 14, 20);
    doc.text(`Cliente: ${cliente}`, 14, 30);
    doc.text(`Equipamento: ${equipamento}`, 14, 40);
    doc.text(`SS: ${ss}`, 14, 50);
    doc.text(`Responsável: ${responsavel}`, 14, 60);

    const tabela = document.getElementById("resumoTable");
    const rows = [];
    for (let i = 1; i < tabela.rows.length; i++) {
        const row = tabela.rows[i].cells;
        const rowData = [];
        for (let j = 0; j < row.length; j++) {
            rowData.push(row[j].textContent);
        }
        rows.push(rowData);
    }

    autoTable(doc, {
        head: [['Peça', 'Ação', 'Diâmetro (mm)', 'Comprimento (mm)', 'Largura (mm)', 'Ação']],
        body: rows,
        startY: 70
    });

    // Gerar e salvar o PDF
    doc.save(`peritagem_${cliente}.pdf`);
}

// Função para enviar o formulário (adicionar lógica conforme necessário)
function enviarFormulario() {
    alert('Formulário enviado!'); // Placeholder para lógica de envio
}

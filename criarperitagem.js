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
            case 'Haste':
                acoesDisponiveis = ['Fabricar', 'Cromar', 'Recuperar Olhal'];
                break;
            case 'Camisa':
                acoesDisponiveis = ['Trocar', 'Limpar'];
                break;
            case 'Olhal':
                acoesDisponiveis = ['Verificar', 'Substituir'];
                break;
            case 'Flange':
                acoesDisponiveis = ['Instalar', 'Remover'];
                break;
            case 'Fundo':
                acoesDisponiveis = ['Ajustar', 'Trocar'];
                break;
            case 'Embolo':
                acoesDisponiveis = ['Recuperar', 'Trocar'];
                break;
            case 'Espacador':
                acoesDisponiveis = ['Verificar', 'Trocar'];
                break;
            case 'Jogo de Vedacao':
                acoesDisponiveis = ['Substituir', 'Ajustar'];
                break;
        }

        // Adiciona as ações disponíveis ao container
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
    botaoExcluir.onclick = () => tabela.deleteRow(novaLinha.rowIndex - 1); // Exclui a linha
    acaoCell.appendChild(botaoExcluir);

    // Limpa os campos após adicionar
    document.getElementById("peca").value = "";
    document.getElementById("diametro").value = "";
    document.getElementById("comprimento").value = "";
    document.getElementById("largura").value = "";
    document.getElementById("opcoesPeca").classList.add("hidden");
}

// Função para gerar PDF com informações adicionais
async function gerarPDF() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();
    const ss = document.getElementById("ss").value;
    const id = document.getElementById("id").value;
    const cliente = document.getElementById("cliente").value;
    const equipamento = document.getElementById("equipamento").value;
    const responsavel = document.getElementById("responsavel").value;
    const data = document.getElementById("data").value;

    // Título do PDF
    doc.setFontSize(16);
    doc.text(`Peritagem da SS ${ss} - ID ${id}`, 14, 20);
    
    // Cliente e Equipamento
    doc.setFontSize(12);
    doc.text(`Cliente: ${cliente}`, 14, 40);
    doc.text(`Equipamento: ${equipamento}`, 14, 50);
    doc.text(`\nPeças Adicionadas:`, 14, 60);

    // Obtém as informações da tabela de resumo
    const tabela = document.getElementById("resumoTable").getElementsByTagName('tbody')[0];
    const numLinhas = tabela.rows.length;

    let yPos = 80; // Inicia a posição vertical
    const espacoEntre = 40; // Aumenta o espaço entre as peças

    // Adiciona as peças e suas dimensões ao PDF
    for (let i = 0; i < numLinhas; i++) {
        const linha = tabela.rows[i];
        const peca = linha.cells[0].textContent;
        const acoes = linha.cells[1].textContent;
        const diametro = linha.cells[2].textContent;
        const comprimento = linha.cells[3].textContent;
        const largura = linha.cells[4].textContent;

        // Adiciona as informações da peça
        doc.text(`Peça: ${peca}`, 14, yPos);
        doc.text(`Ações: ${acoes}`, 14, yPos + 10);
        doc.text(`Dimensões: ${diametro} mm (D), ${comprimento} mm (C), ${largura} mm (L)`, 14, yPos + 20);
        doc.text(`-------------------------------------`, 14, yPos + 30);

        // Atualiza a posição vertical para a próxima peça
        yPos += espacoEntre; 
    }

    // Adiciona anexos se houver
    const anexos = document.getElementById("anexos").files;
    if (anexos.length > 0) {
        doc.text(`Anexos:`, 14, yPos);
        yPos += 10; // Adiciona espaço após o título de anexos

        for (let i = 0; i < anexos.length; i++) {
            const anexo = anexos[i];

            // Verifica se o anexo é uma imagem
            if (anexo.type.startsWith("image/")) {
                const imgData = await readImageFile(anexo);
                // Adiciona a imagem ao PDF
                doc.addImage(imgData, 'JPEG', 14, yPos, 50, 50); // 50x50 é o tamanho da imagem, ajuste conforme necessário
                yPos += 60; // Atualiza a posição vertical para a próxima imagem
            } else {
                doc.text(`- ${anexo.name}`, 14, yPos);
                yPos += 10; // Aumenta o espaço entre os anexos
            }
        }
        yPos += 10; // Espaço adicional após a lista de anexos
    }

    // Adiciona informações do responsável e da data
    doc.text(`Responsável: ${responsavel}`, 14, yPos);
    doc.text(`Data: ${data}`, 14, yPos + 10);

    // Gerar e salvar o PDF
    doc.save(`peritagem_ss_id.pdf`);
}

// Função para ler o arquivo de imagem e retornar os dados em Base64
function readImageFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            resolve(event.target.result);
        };
        reader.onerror = function(error) {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}




// Função para salvar a página como PDF
async function salvarPaginaComoPDF() {
    const content = document.getElementById('contentToSave');

    html2canvas(content).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        // Adiciona a imagem da página ao PDF
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('pagina_peritagem.pdf');
    });
}

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

// Função para enviar o formulário para o Google Sheets
async function enviarFormulario() {
    const ss = document.getElementById("ss").value;
    const id = document.getElementById("id").value;
    const cliente = document.getElementById("cliente").value;
    const equipamento = document.getElementById("equipamento").value;
    const responsavel = document.getElementById("responsavel").value;
    const data = document.getElementById("data").value;

    const url = "https://script.google.com/macros/s/AKfycbw1tNZjLku_komqEL-mjp4olisoLJ83J04e-bvVoG3bFWArrwet5M7zNjV8sXJ_tH4l/exec"; // Substitua pela URL do seu script

    // Criar o payload a ser enviado
    const dados = new URLSearchParams();
    dados.append('ss', ss);
    dados.append('id', id);
    dados.append('cliente', cliente);
    dados.append('equipamento', equipamento);
    dados.append('responsavel', responsavel);
    dados.append('data', data);

    // Envia os dados para o Google Sheets
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: dados,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (!response.ok) throw new Error('Erro ao enviar os dados.');

        const resultado = await response.text();
        alert("Dados enviados com sucesso: " + resultado);
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        alert('Erro ao enviar os dados');
    }
}

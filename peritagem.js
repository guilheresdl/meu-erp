document.getElementById('data').value = new Date().toISOString().split('T')[0];

document.getElementById('peca').addEventListener('change', function() {
    const pecaSelecionada = this.value;
    const opcoesPeca = document.getElementById('opcoesPeca');
    
    let html = '';

    switch (pecaSelecionada) {
        case 'haste':
            html = `<div class="form-group">
                        <label>Ação:</label>
                        <input type="checkbox" id="fabricar"> Fabricar
                        <input type="checkbox" id="cromar"> Cromar
                        <input type="checkbox" id="recRosca"> Rec. Rosca
                    </div>
                    <div class="form-group">
                        <label for="diametro">Diâmetro (mm):</label>
                        <input type="text" id="diametro" required>
                    </div>
                    <div class="form-group">
                        <label for="comprimento">Comprimento (mm):</label>
                        <input type="text" id="comprimento" required>
                    </div>
                    <div class="form-group">
                        <label for="largura">Largura (mm):</label>
                        <input type="text" id="largura">
                    </div>`;
            break;
        // Adicione as opções para as outras peças da mesma forma

        default:
            html = '';
    }

    opcoesPeca.innerHTML = html;
    opcoesPeca.classList.remove('hidden');
});

function adicionarPeca() {
    const peca = document.getElementById('peca').value;
    const acao = Array.from(document.querySelectorAll('#opcoesPeca input[type="checkbox"]:checked')).map(cb => cb.id).join(', ');
    const diametro = document.getElementById('diametro').value;
    const comprimento = document.getElementById('comprimento').value;
    const largura = document.getElementById('largura').value;

    if (peca && acao && diametro && comprimento) {
        const tabela = document.getElementById('resumoTable').querySelector('tbody');
        const novaLinha = tabela.insertRow();

        novaLinha.insertCell(0).textContent = peca;
        novaLinha.insertCell(1).textContent = acao;
        novaLinha.insertCell(2).textContent = diametro;
        novaLinha.insertCell(3).textContent = comprimento;
        novaLinha.insertCell(4).textContent = largura;

        document.getElementById('peritagemForm').reset();
        document.getElementById('opcoesPeca').innerHTML = '';
    } else {
        alert("Preencha todos os campos obrigatórios.");
    }
}

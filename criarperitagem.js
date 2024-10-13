// Script para adicionar funcionalidades à página "Criar Peritagem"
document.addEventListener('DOMContentLoaded', () => {
    const pecaSelect = document.getElementById('pecas');
    const opcoesPecaDiv = document.getElementById('opcoesPeca');
    const acoesDisponiveisDiv = document.getElementById('acoesDisponiveis');
    const adicionarPecaBtn = document.getElementById('adicionarPeca');
    const tabelaCorpo = document.getElementById('tabelaCorpo');

    pecaSelect.addEventListener('change', () => {
        const peca = pecaSelect.value;
        opcoesPecaDiv.classList.remove('hidden');
        acoesDisponiveisDiv.innerHTML = ''; // Limpa opções anteriores

        // Definindo as ações e inputs baseados na peça selecionada
        let acoesHtml = '';
        if (peca === 'haste') {
            acoesHtml += `
                <label><input type="checkbox" value="fabricar"> Fabricar</label>
                <label><input type="checkbox" value="cromar"> Cromar</label>
                <label><input type="checkbox" value="recRosca"> Recuperar Rosca</label>`;
        } else if (peca === 'camisa') {
            acoesHtml += `
                <label><input type="checkbox" value="fabricar"> Fabricar</label>
                <label><input type="checkbox" value="brunir"> Brunir</label>
                <label><input type="checkbox" value="recRosca"> Recuperar Rosca</label>`;
        } else if (peca === 'olhal') {
            acoesHtml += `
                <label><input type="checkbox" value="fabricar"> Fabricar</label>
                <label><input type="checkbox" value="recFuro"> Recuperar Furo</label>
                <label><input type="checkbox" value="recRosca"> Recuperar Rosca</label>`;
        } else if (peca === 'flange') {
            acoesHtml += `
                <label><input type="checkbox" value="fabricar"> Fabricar</label>
                <label><input type="checkbox" value="recuperar"> Recuperar</label>`;
        } else if (peca === 'fundo') {
            acoesHtml += `
                <label><input type="checkbox" value="fabricar"> Fabricar</label>
                <label><input type="checkbox" value="recuperar"> Recuperar</label>`;
        } else if (peca === 'embolo') {
            acoesHtml += `
                <label><input type="checkbox" value="fabricar"> Fabricar</label>
                <label><input type="checkbox" value="recuperar"> Recuperar</label>`;
        } else if (peca === 'espacador') {
            acoesHtml += `
                <label><input type="checkbox" value="fabricar"> Fabricar</label>
                <label><input type="checkbox" value="recuperar"> Recuperar</label>`;
        } else if (peca === 'jogoVedacao') {
            acoesHtml += `
                <label><input type="checkbox" value="fabricar"> Fabricar</label>`;
        }

        acoesDisponiveisDiv.innerHTML = acoesHtml;
    });

    adicionarPecaBtn.addEventListener('click', () => {
        const peca = pecaSelect.value;
        const diametro = document.getElementById('diametro').value;
        const comprimento = document.getElementById('comprimento').value;
        const largura = document.getElementById('largura').value;

        if (peca && diametro && comprimento && largura) {
            const novaLinha = `
                <tr>
                    <td>${peca}</td>
                    <td>${getAcoesSelecionadas()}</td>
                    <td>${diametro}</td>
                    <td>${comprimento}</td>
                    <td>${largura}</td>
                </tr>`;
            tabelaCorpo.insertAdjacentHTML('beforeend', novaLinha);
            // Limpa os campos após adicionar
            clearFields();
        } else {
            alert("Por favor, preencha todos os campos antes de adicionar.");
        }
    });

    function getAcoesSelecionadas() {
        const acoesCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        return Array.from(acoesCheckboxes).map(checkbox => checkbox.value).join(', ');
    }

    function clearFields() {
        pecaSelect.value = '';
        document.getElementById('diametro').value = '';
        document.getElementById('comprimento').value = '';
        document.getElementById('largura').value = '';
        opcoesPecaDiv.classList.add('hidden');
        acoesDisponiveisDiv.innerHTML = '';
    }
});

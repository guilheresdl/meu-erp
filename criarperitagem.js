document.getElementById('pecas').addEventListener('change', function () {
    const pecaSelecionada = this.value;
    const acoesDisponiveisDiv = document.getElementById('acoesDisponiveis');

    // Limpar ações anteriores
    acoesDisponiveisDiv.innerHTML = '';

    let acoes = [];

    // Definindo ações de acordo com a peça selecionada
    switch (pecaSelecionada) {
        case 'haste':
            acoes = ['Fabricar', 'Cromar', 'Rec. Rosca'];
            break;
        case 'camisa':
            acoes = ['Fabricar', 'Brunir', 'Rec. Rosca'];
            break;
        case 'olhal':
            acoes = ['Fabricar', 'Rec. Furo', 'Rec. Rosca'];
            break;
        case 'flange':
            acoes = ['Fabricar', 'Recuperar'];
            break;
        case 'fundo':
            acoes = ['Fabricar', 'Rec. Olhal'];
            break;
        case 'embolo':
            acoes = ['Fabricar', 'Rec. Olhal', 'Rec. Rosca'];
            break;
        case 'espacador':
            acoes = ['Fabricar', 'Recuperar'];
            break;
        case 'jogoDeVedacao':
            acoes = ['Substituir', 'Cliente Vai Fornecer'];
            break;
    }

    // Gerando checkboxes para as ações
    acoes.forEach(acao => {
        const divAcao = document.createElement('div');
        divAcao.className = 'acao-disponivel';
        
        divAcao.innerHTML = `
            <input type="checkbox" id="${acao}" name="acao" value="${acao}">
            <label for="${acao}">${acao}</label>
        `;
        
        acoesDisponiveisDiv.appendChild(divAcao);
    });

    // Exibir a seção de ações disponíveis
    document.getElementById('opcoesPeca').classList.remove('hidden');
});

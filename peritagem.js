
const pieceSelect = document.getElementById('pieceSelect');
const pieceOptions = document.getElementById('pieceOptions');
const actionsContainer = document.getElementById('actions');
const summaryTableBody = document.getElementById('summaryTable').getElementsByTagName('tbody')[0];

pieceSelect.addEventListener('change', function() {
    const selectedPiece = this.value;
    actionsContainer.innerHTML = ''; // Limpa as ações anteriores
    document.getElementById('diameter').value = '';
    document.getElementById('length').value = '';
    document.getElementById('width').value = '';

    if (selectedPiece) {
        let actionsHtml = '';

        // Define as ações com base na peça selecionada
        switch (selectedPiece) {
            case 'haste':
                actionsHtml += createActionCheckbox('fabricar', 'Fabricar');
                actionsHtml += createActionCheckbox('cromar', 'Cromar');
                actionsHtml += createActionCheckbox('recRosca', 'Rec. Rosca');
                break;
            case 'camisa':
                actionsHtml += createActionCheckbox('fabricar', 'Fabricar');
                actionsHtml += createActionCheckbox('brunir', 'Brunir');
                actionsHtml += createActionCheckbox('recRosca', 'Rec. Rosca');
                break;
            case 'olhal':
                actionsHtml += createActionCheckbox('fabricar', 'Fabricar');
                actionsHtml += createActionCheckbox('recFuro', 'Rec. Furo');
                actionsHtml += createActionCheckbox('recRosca', 'Rec. Rosca');
                break;
            case 'flange':
                actionsHtml += createActionCheckbox('fabricar', 'Fabricar');
                actionsHtml += createActionCheckbox('recuperar', 'Recuperar');
                break;
            case 'fundo':
                actionsHtml += createActionCheckbox('fabricar', 'Fabricar');
                actionsHtml += createActionCheckbox('recOlhal', 'Rec. Olhal');
                break;
            case 'embolo':
                actionsHtml += createActionCheckbox('fabricar', 'Fabricar');
                actionsHtml += createActionCheckbox('recOlhal', 'Rec. Olhal');
                actionsHtml += createActionCheckbox('recRosca', 'Rec. Rosca');
                break;
            case 'espacador':
                actionsHtml += createActionCheckbox('fabricar', 'Fabricar');
                actionsHtml += createActionCheckbox('recuperar', 'Recuperar');
                break;
            case 'jogoDeVedacao':
                actionsHtml += createActionCheckbox('substituir', 'Substituir');
                actionsHtml += createActionCheckbox('clienteVaiFornecer', 'Cliente Vai Fornecer');
                break;
        }

        actionsContainer.innerHTML = actionsHtml;
        pieceOptions.style.display = 'block';
    } else {
        pieceOptions.style.display = 'none';
    }
});

document.getElementById('peritagemForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const pieceName = pieceSelect.value;
    const actions = Array.from(actionsContainer.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);
    const diameter = document.getElementById('diameter').value;
    const length = document.getElementById('length').value;
    const width = document.getElementById('width').value;

    const newRow = summaryTableBody.insertRow();
    newRow.insertCell(0).textContent = pieceName;
    newRow.insertCell(1).textContent = actions.join(', ') || 'Nenhuma ação';
    newRow.insertCell(2).textContent = diameter;
    newRow.insertCell(3).textContent = length;
    newRow.insertCell(4).textContent = width;

    // Reseta o formulário
    this.reset();
    pieceOptions.style.display = 'none';
});

function createActionCheckbox(value, label) {
    return `
        <div>
            <input type="checkbox" id="${value}" value="${value}">
            <label for="${value}">${label}</label>
        </div>
    `;
}

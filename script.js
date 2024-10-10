const pecaSection = document.getElementById('peca-section');
const pecaList = document.getElementById('peca-list');

const pecas = [
  { name: 'Haste', options: ['Fabricar', 'Cromar', 'Recuperar Rosca'] },
  { name: 'Camisa', options: ['Fabricar', 'Brunir', 'Recuperar Rosca'] },
  { name: 'Olhal', options: ['Fabricar', 'Recuperar Furo', 'Recuperar Rosca'] },
  { name: 'Flange', options: ['Fabricar', 'Recuperar'] },
  { name: 'Tampa', options: ['Fabricar', 'Recuperar Furo', 'Recuperar Rosca'] },
  { name: 'Fundo', options: ['Fabricar', 'Recuperar Olhal'] },
];

pecas.forEach((peca) => {
  const pecaItem = document.createElement('div');
  pecaItem.innerHTML = `
    <h4>${peca.name}</h4>
    <ul>
      ${peca.options.map((option) => `<li><input type="checkbox" id="${peca.name}-${option}" name="${peca.name}">${option}</li>`).join('')}
    </ul>
  `;
  pecaList.appendChild(pecaItem);
});

const addSSButton = document.getElementById('add-ss-button');
const ssList = document.getElementById('ss-list');

let ssCount = 1;

addSSButton.addEventListener('click', () => {
  const ssItem = document.createElement('div');
  ssItem.innerHTML = `
    <input type="text" id="ss-${ssCount}" name="ss-${ssCount}">
  `;
  ssList.appendChild(ssItem);
  ssCount++;
});

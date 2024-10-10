<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formulário de Peritagem</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <form id="peritagem-form">
      <h2 class="title">Formulário de Peritagem Atualizado Completo</h2>
      <div class="row">
        <div class="col-md-6">
          <section>
            <label for="nome-do-cliente">Nome do Cliente:</label>
            <input type="text" id="nome-do-cliente" name="nome-do-cliente" class="form-input">
          </section>
        </div>
        <div class="col-md-6">
          <section>
            <label for="ss-numero">SS (Número de Identificação):</label>
            <input type="text" id="ss-numero" name="ss-numero" class="form-input">
            <button id="add-ss-button" class="btn btn-primary">Adicionar mais IDs</button>
            <div id="ss-list"></div>
          </section>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <section>
            <label for="nome-do-equipamento">Nome do Equipamento:</label>
            <input type="text" id="nome-do-equipamento" name="nome-do-equipamento" class="form-input">
          </section>
        </div>
        <div class="col-md-6">
          <section id="peca-section">
            <h3>Adicionar Tipo de Peça:</h3>
            <div id="peca-list">
              <!-- dynamic list of peças will be generated here -->
            </div>
          </section>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <section>
            <label for="data-da-peritagem">Data da Peritagem:</label>
            <input type="datetime-local" id="data-da-peritagem" name="data-da-peritagem" readonly class="form-input">
          </section>
        </div>
        <div class="col-md-6">
          <section>
            <label for="responsavel-pela-peritagem">Responsável pela Peritagem:</label>
            <input type="text" id="responsavel-pela-peritagem" name="responsavel-pela-peritagem" class="form-input">
          </section>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <section>
            <label for="fotos-do-equipamento">Fotos do Equipamento:</label>
            <input type="file" id="fotos-do-equipamento" name="fotos-do-equipamento" multiple class="form-input">
          </section>
        </div>
        <div class="col-md-6">
          <section>
            <label for="diagnostico">Diagnóstico:</label>
            <textarea id="diagnostico" name="diagnostico" class="form-input"></textarea>
          </section>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <section>
            <label for="sugestao-de-reparos">Sugestão de Reparos:</label>
            <textarea id="sugestao-de-reparos" name="sugestao-de-reparos" class="form-input"></textarea>
          </section>
        </div>
      </div>
    </form>
  </div>

  <script src="script.js"></script>
</body>
</html>

# Configuração da Integração com Google Sheets

Para que os dados do formulário (incluindo o currículo em PDF) sejam salvos automaticamente na sua planilha do Google, siga este passo a passo.

## Passo 1: Criar a Planilha

1.  Acesse [Google Sheets](https://sheets.google.com) e crie uma nova planilha em branco.
2.  Nomeie a planilha como **"Candidatos Emprego Fácil"**.
3.  **Não precisa criar as colunas manualmente.** O script abaixo fará isso automaticamente no primeiro cadastro.

## Passo 2: Criar o Script de Automação

1.  Na planilha, clique no menu **Extensões** > **Apps Script**.
2.  Apague qualquer código que estiver no editor e cole o código abaixo:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Verifica se a planilha está vazia e cria o cabeçalho automaticamente
    if (sheet.getLastRow() === 0) {
      var headers = ["Data", "Nome", "Email", "Telefone", "CEP", "Cidade", "Estado", "Cargo", "Link do Currículo"];
      sheet.appendRow(headers);
      // Formata o cabeçalho em negrito e congela a primeira linha
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    
    // Configuração da pasta para salvar currículos (Opcional: cria se não existir)
    var folderName = "Curriculos_Emprego_Facil";
    var folders = DriveApp.getFoldersByName(folderName);
    var folder;
    
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }
    
    // Salvar PDF no Google Drive
    var fileUrl = "";
    if (data.fileData && data.fileName) {
      var contentType = data.fileType || "application/pdf";
      var blob = Utilities.newBlob(Utilities.base64Decode(data.fileData), contentType, data.fileName);
      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      fileUrl = file.getUrl();
    }
    
    // Adicionar linha na planilha
    sheet.appendRow([
      new Date(),
      data.nome,
      data.email,
      data.telefone,
      data.cep || "", // Adicionado campo CEP
      data.cidade,
      data.estado,
      data.cargo,
      fileUrl
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success", "url": fileUrl }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3.  Clique no ícone de disquete 💾 para **Salvar** o projeto (dê um nome, ex: "API Candidatos").

## Passo 3: Publicar a API

1.  No canto superior direito, clique no botão azul **Implantar** > **Nova implantação**.
2.  Na janela que abrir, clique na engrenagem ⚙️ ao lado de "Selecionar tipo" e escolha **App da Web**.
3.  Preencha as configurações:
    *   **Descrição:** API Site Vagas
    *   **Executar como:** *Eu (seu email)*
    *   **Quem pode acessar:** *Qualquer pessoa* (Isso é essencial para o site funcionar sem login).
4.  Clique em **Implantar**.
5.  O Google pedirá permissão para acessar seu Drive e Planilhas. Clique em **Autorizar acesso**, selecione sua conta e, se aparecer uma tela de "App não verificado", clique em **Avançado** > **Acessar (nome do projeto) (não seguro)**.
6.  Copie a **URL do App da Web** gerada (ela começa com `https://script.google.com/macros/s/...`).

## Passo 4: Conectar ao Site

1.  Abra o arquivo `client/src/config.ts` no código do site.
2.  Cole a URL copiada na variável `GOOGLE_SCRIPT_URL`.

```typescript
// Exemplo:
export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
```

Pronto! Agora todos os cadastros cairão automaticamente na sua planilha e os PDFs serão salvos numa pasta no seu Google Drive.

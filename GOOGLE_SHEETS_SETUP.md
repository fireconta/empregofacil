# Configuração da Integração com Google Sheets (Versão Corrigida)

Esta versão corrige problemas de envio usando um método mais compatível com navegadores modernos.

## Passo 1: Criar a Planilha

1.  Acesse [Google Sheets](https://sheets.google.com) e crie uma nova planilha em branco.
2.  Nomeie a planilha como **"Candidatos Emprego Fácil"**.

## Passo 2: Criar o Script de Automação

1.  Na planilha, clique no menu **Extensões** > **Apps Script**.
2.  Apague **TUDO** que estiver no editor e cole o código abaixo:

```javascript
// Função para testar se o script está ativo acessando a URL no navegador
function doGet(e) {
  return ContentService.createTextOutput("O script está ativo e funcionando!");
}

function doPost(e) {
  try {
    // Tenta ler os dados. Se vier como postData.contents (padrão), usa ele.
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Verifica se a planilha está vazia e cria o cabeçalho automaticamente
    if (sheet.getLastRow() === 0) {
      var headers = ["Data", "Nome", "Email", "Telefone", "CEP", "Cidade", "Estado", "Cargo", "Link do Currículo"];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    
    // Configuração da pasta para salvar currículos
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
      // Se o tipo não vier, assume PDF
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
      data.cep || "",
      data.cidade,
      data.estado,
      data.cargo,
      fileUrl
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success", "url": fileUrl }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log do erro para debug no painel do Apps Script
    console.error("Erro no script: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3.  Clique no ícone de disquete 💾 para **Salvar**.

## Passo 3: Publicar a API (MUITO IMPORTANTE)

Se você já publicou antes, precisa criar uma **NOVA VERSÃO**.

1.  Clique em **Implantar** > **Gerenciar implantações**.
2.  Clique no ícone de lápis (Editar) no topo.
3.  Em **Versão**, mude de "Versão arquivada..." para **"Nova versão"**.
4.  Certifique-se de que:
    *   **Executar como:** *Eu (seu email)*
    *   **Quem pode acessar:** *Qualquer pessoa*
5.  Clique em **Implantar**.

## Passo 4: Testar

1.  Copie a URL gerada.
2.  Cole no navegador. Se aparecer a mensagem "O script está ativo e funcionando!", está tudo certo.
3.  Cole essa URL no arquivo `client/src/config.ts` do seu projeto.

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function afterProcessCreate(processId) {
    //Captura o número do processo "Pai"
    var parentProcess = hAPI.getParentInstance(processId);

    //Se houver um processo Pai, chama a função que captura os registros da tabela pai x filho
    if (parentProcess) {
        setChildTable(parentProcess);
    }
}

function setChildTable(numProcessoPai) {

    //Pega o CardData do processo Pai
    var cardData = hAPI.getCardData(numProcessoPai);

    var keys = cardData.keySet().toArray();

    //Percorre os campos
    for (var key in keys) {

        var field = keys[key]

        if (field.indexOf("valorProduto___") > -1) {

            //Monta o Array com os campos filhos
            var childData = new java.util.HashMap();

            var index = field.replace("valorProduto___", "");

            childData.put("valorProduto", cardData.get("valorProduto___" + index));
            childData.put("dataNota", cardData.get("dataNota___" + index));
            childData.put("centroDeCusto", cardData.get("centroDeCusto___" + index));
            childData.put("nomeArquivoInfoProcesso", cardData.get("nomeArquivoInfoProcesso___" + index));
            childData.put("hidden_documentIdInfoProcesso", cardData.get("hidden_documentIdInfoProcesso___" + index));



            //Adiciona a tabela filha os itens capturados do CardData Pai
            hAPI.addCardChild("tabelaAnexoInfoProcesso", childData)
        }
    }
}
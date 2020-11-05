//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function enableFields(form) {


    //DESABILITA A EDIÇÃO DOS DADOS NOS INPUTS NA ATIVIDADE 5-------------------------------------------------------------------------------------------------------------------------------------
    if (getValue("WKNumState") == 5) {
        form.setEnabled("nomeSolicitante", false);
        form.setEnabled("cpf", false);
        form.setEnabled("rgSolicitante", false);
        form.setEnabled("departamentoSolicitante", false);



        var indexes = form.getChildrenIndexes("tabelaAnexoInfoProcesso");
        for (var i = 0; i < indexes.length; ++i) {

            form.setEnabled("valorProduto___" + indexes[i], false);
            form.setEnabled("dataNota___" + indexes[i], false);
            form.setEnabled("centroDeCusto___" + indexes[i], false);
            form.setEnabled("nomeArquivoInfoProcesso___" + indexes[i], false);




        }


    }

    //DESABILITA A EDIÇÃO DOS DADOS NOS INPUTS NA ATIVIDADE 6-------------------------------------------------------------------------------------------------------------------------------------
    if (getValue("WKNumState") == 6) {
        form.setEnabled("nomeSolicitante", false);
        form.setEnabled("cpf", false);
        form.setEnabled("rgSolicitante", false);
        form.setEnabled("departamentoSolicitante", false);



        var indexes = form.getChildrenIndexes("tabelaAnexoInfoProcesso");
        for (var i = 0; i < indexes.length; ++i) {

            form.setEnabled("valorProduto___" + indexes[i], false);
            form.setEnabled("dataNota___" + indexes[i], false);
            form.setEnabled("centroDeCusto___" + indexes[i], false);
            form.setEnabled("nomeArquivoInfoProcesso___" + indexes[i], false);




        }


    }

    //ADICIONA NOME DE USUARIO DE FORMA AUTOMATICA---------------------------------------------------------------------------------------------------------------------------------
    if (getValue("WKNumState") == 0) {
        form.setValue("nomeSolicitante", fluigAPI.getUserService().getCurrent().getFullName())
    }

    if (getValue("WKNumState") == 5) {
        form.setValue("nomeAprovador2", fluigAPI.getUserService().getCurrent().getFullName())
    }


    //MEXER COM OS BOTÕES DA TABELA PAI E FILHO-------------------------------------------------------------------------------------------------------------------------------------
    // if (getValue("WKNumState") == 5){
    //      $(".bpm-mobile-trash-column").hide(); 
    //     }

    //     if ($("#ativ").val() == "5") {
    //         $("#btnAddChildInfoProcesso").hide()
    // }

    // if (getValue("WKNumState") == 0) {
    //     form.setValue("", fluigAPI.getUserService().getCurrent().getFullName())
    // }
    // WKCurrentState




}
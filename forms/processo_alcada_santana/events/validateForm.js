function validateForm(form)
{

    var msg = ""

//Info Solicitante
    if(form.getValue("nomeSolicitante") == "") (
        msg += "Campo Nome não foi preenchido!"
    )
    if(form.getValue("cpf") == "") (
        msg += "Campo CPF não foi preenchido!"
    )
    if(form.getValue("rgSolicitante") == "") (
        msg += "Campo RG não foi preenchido!"
    )
    if(form.getValue("departamentoSolicitante") == "") (
    		msg += "Campo Departamento não foi Informado!"
    )
  
    if(msg != "") {
        throw msg
    }
    
//Valida tabela pai e filho
    var indexes = form.getChildrenIndexes("tabelaAnexoInfoProcesso")

        if (getValue("WKNumState") == 4)
        {
            if(indexes.length < 1){
                throw("Não Foram informado produtos.")
            } else {
                for (var i = 0; i < indexes.length; i++) {
                    if (form.getValue("valorProduto___" + indexes[i]) == ""){
                        throw("Valor produto não informado")
                    }
                    if (form.getValue("dataNota___" + indexes[i]) == ""){
                        throw("Data da nota não informada")
                    }
                    if (form.getValue("centroDeCusto___" + indexes[i]) == ""){
                        throw("Centro de custo não informado")
                    }
                    if (form.getValue("nomeArquivoInfoProcesso___" + indexes[i]) == ""){
                        throw("Nenhum arquivo anexado!")
                    }
                }
            }
        }
    

    
        if (form.getValue("WKNumState") == 9){
            if(form.getValue('checkbox') == null || form.getValue('checkbox') == '')

            throw "Selecione o checkbox";
        }


//VERIFICAÇÃO DO CHECKBOX DO SUB-PROCESSO PARA AVANÇAR APENAS SE ESTIVER SELECIONADA-------------------------------------------------------------------------------------------------
// if ($("#pagamentoArea").val() == "6") {
//         var checado = $('#checkbox').is(':checked');
//         if (checado) {
//             $('#pagamentoArea').val('1');
//         } else {
//             $('#pagamentoArea').val('0');

//         }

//         var ativ = $('#pagamentoArea').val();
//         if (ativ == "6" || ativ == "") {
//             throw "Selecione o checkbox."
//         }
    
// }
    
    

}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function displayFields(form, customHTML) {

    //ADICIONA NOME DE USUARIO AUTOMATICAMENTE--------------------------------------------------------------------------------------------------------------------------------------
    // let user = getValue("WKUser")

    // let c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", user, user, ConstraintType.MUST)
    // let dataset = DatasetFactory.getDataset("colleague", null, [c1], null)

    // form.setValue("nomeSolicitante", dataset.values[0][2])



    //OCULTA CAMPO APROVAÇÃO--------------------------------------------------------------------------------------------------------------------------------------------------------
    var mostraAprovacao = getValue('WKNumState')

    form.setVisibleById("aprovacao", false)

    if (mostraAprovacao == 5) {
        form.setVisibleById("aprovacao", true)
    }



    //OCULTA CAMPO PAGAMENTO--------------------------------------------------------------------------------------------------------------------------------------------------------
    var mostraPagamento = getValue('WKNumState')

    form.setVisibleById("pagamentoArea", false)

    if (mostraAprovacao == 6) {
        form.setVisibleById("pagamentoArea", true)

    }



    //RELACIONADA AO RETORNO DAS INFORMAÇÕES PARA OCULTAR OS CAMPOS-----------------------------------------------------------------------------------------------------------------
    customHTML.append("<script>")
    customHTML.append("function getNumState() { return " + getValue("WKNumState") + "} ")
    customHTML.append("</script>")


    //RELACIONADA A UM HADDIN QUE ESTA CRIADO NO HTML PRINCIPAL-----------------------------------------------------------------------------------------------------------------------
    var atividade = getValue("WKNumState")
    form.setValue("ativ", atividade)


}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ADICIONA EVENTO DE CLICK EM DETERMINADO BOTÃO DA TABELA PAI E FILHO-----------------------------------------------------------------------------------------------------------

$(document).ready(() => {
    consultaDataAtual();

    $('#btnAddChildInfoProcesso').click(event => {
        // wdkAddChild("tabelaProdutos");
        MaskEvent.init();
    });
    $('#radio3').click(event => {
        // wdkAddChild("tabelaProdutos");
        MaskEvent.init();
    });
});


//REMOVO OS BOTÕES DA TABELA PAI E FILHO NA SEGUNDA PARTE DO PROCESSO PARA NÃO TER EDIÇÃO DE DADOS-------------------------------------------------------------------------------
if ($("#ativ").val() == "5" || $("#ativ").val() == "6") {
    $("#btnAddChildInfoProcesso").hide()
    $("#anexoInfoProcesso").hide()


    $("[class^=bpm-mobile-trash-column]").hide()
    $('#tabelaAnexoInfoProcesso thead tr td')[0].style.display = 'none'
}




//FUNÇÃO RELACIONADA AO CALCULO DOS VALORES INFORMADOS NO PAI E FILHO-----------------------------------------------------------------------------------------------------------
function calculaMedia(element) {
    let valorTotal = 0

    $('input[name^="valorProduto___"]').each((val, el) => {
        if (el.value.length > 6) {
            let valorProvisorio = parceFloat(el.value.replace(".", "").replace(",", "."))
            valorTotal += parseFloat(valorProvisorio)
        } else {
            let valorProvisorio = parseFloat(el.value.replace(",", "."))
            valorTotal += parseFloat(valorProvisorio)
        }
    })
    var valorTratado = valorTotal.toLocaleString("pt-br", {
        minimumFractionDigits: 2
    })


    console.log(valorTotal);
    $("#valorTotal").val(valorTratado);
}


//DELETA AS LINHAS ADICIONADA A TABELA PAI E FILHO------------------------------------------------------------------------------------------------------------------------------
function deletaProduto(element) {
    var elemento = element.parentNode.parentNode.parentNode.children[1].children[0].value

    if (elemento == "") {
        fnWdkRemoveChild(element);
    } else {
        var valorProv = trataDecimal(elemento)
        var valTotal = trataDecimal($('#valorTotal').val())
        var valFinal = parseFloat(valTotal - valorProv);
        var valorTeste = parseFloat(trataDecimal($('#valorTotal').val())) - trataDecimal(elemento)
        $('#valorTotal').val(valorTeste.toLocaleString("pt-br", {
            minimumFractionDigits: 2
        }))
        fnWdkRemoveChild(element);
    }
}

//TRATO OS VALORES MUDANDO "," PARA " " E "," PARA "." (NADA)----------------------------------------------------------------------------------------------------------------------
function trataDecimal(valor) {
    var valorRetornavel = 0
    if (valor.length > 6) {
        valorRetornavel = valor.replace(".", "").replace(",", ".")
        return valorRetornavel
    } else {
        valorRetornavel = valor.replace(",", ".")
        return valorRetornavel;
    }
}



//ADICIONA AO INPUT DATA, A DATA ATUAL DE FORMA AUTOMATICA------------------------------------------------------------------------------------------------------------------------
function consultaDataAtual() {
    let dateNow = new Date();
    let dateBR = dateNow.toLocaleDateString();

    $("#dataSolicitacao").val(dateBR);
}

//ADICIONO A DATA DE FORMA AUTOMATICA NO PAI E FILHO DO PROCESSO NA ATIVIDADE 5---------------------------------------------------------------------------------------------------------------
var data = new Date()
var dia = data.getDate()
var mes = data.getMonth()
var ano = data.getFullYear()
dia = (dia <= 9 ? "0" + dia : dia)
mes = (mes <= 9 ? "0" + mes : mes)
var newData = dia + "/" + mes + "/" + ano


//AVANÇO OS DADOS DO PROCESSO DE ACORDO COM O CAMPO SELECIONADO PELO APROVADOR-----------------------------------------------------------------------------------------------------
function checkedRadioAprov(elem) {
    if (elem.value == "aprovar") {
        $('#divMaisInfo').fadeOut('slow')
        $('#aprovado').val('aprovado')

    } else if (elem.value == "reprovar") {
        $('#divMaisInfo').fadeOut('slow')
        $('#aprovado').val('reprovado')
    } else if (elem.value == "maisInformacoes") {
        $('#divMaisInfo').fadeIn('slow')
        $('#aprovado').val('maisIformacoes')
        wdkAddChild("tabelaAnexoInfoProcesso2").style.display = 'none';

        


    }
}

//ADICIONA NOME E DATA DO APROVADOR NO PAI E FILHO DO HISTÓRICO---------------------------------------------------------------------------------
    $("#radio3").click(event => {
        $("[id^=nomeAprovador2___1]").val(parent.WCMAPI.user)
        $("[id^=dataAprovacao2___1]").val(newData)
    })



//REMOVE BOTÃO "INSERIR ANEXO"-------------------------------------------------------------------------------------------------------------------    
    if($("#ativ").val() != "0"){
        $("[id^=anexo]").hide()      
    }

//REMOVE BOTÃO "DOWNLOAD" DO INICIO DO PROCESSO----------------------------------------------------------------------------------------------------
    if($("#ativ").val() == "0"){
        $("[id^=download]").hide()      
    }
    

//VALIDAÇÃO DO CPF E RG ATRAVES DA QUANTIDADE DE CARACTERES APRESENTADOS PELO USUARIO---------------------------------------------------------------------------------------------
function validadeCPF() {
    if ($("#cpf").val().length < 14) {
        FLUIGC.toast({
            title: 'Erro',
            message: 'Campo CPF preenchido incorretamente',
            type: 'danger'
        })
    }
}

function validadeRG() {
    if ($("#rgSolicitante").val().length < 12) {
        FLUIGC.toast({
            title: 'Erro',
            message: 'Campo RG preenchido incorretamente',
            type: 'danger'
        })
    }
}
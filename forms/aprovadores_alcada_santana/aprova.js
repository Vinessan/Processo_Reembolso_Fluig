//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//EVENTO DE CLICK PARA ADICIONAR UMA LINHA NA TABELA PAI E FILHO PARA ADICIONAR UM APROVADOR-------------------------------------------------------------------------------
$(document).ready(() => {


    $("#btnAdicionarLinha").click((event) => {
        wdkAddChild("aprovadores")
        MaskEvent.init()
    })
})

//BUSCA NO COLLEAGUEID O NOME DO APROVADOR DE ACORDO COM O REGISTRO NO SISTEMA-------------------------------------------------------------------
function setSelectedZoomItem(selectedItem) {


    let numeroLinha = selectedItem.inputId.split('___')[1]

    console.log(selectedItem);
    var selectedColleagueId = selectedItem["colleagueId"];
    $('#colleagueIDUser___' + numeroLinha).val(selectedColleagueId)
}
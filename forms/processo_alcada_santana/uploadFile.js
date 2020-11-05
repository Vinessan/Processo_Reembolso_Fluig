const parentId = "41625";

$('#btnAddChild').click(() => {
    addNewChildOnTable('tabelaAnexoSolicitacao', 'Solicitacao')
});
$('#btnAddChildMotivo').click(() => {
    addNewChildOnTable('tabelaAnexoMotivo', 'Motivo')
});
$('#btnAddChildInfoProcesso').click(() => {
    addNewChildOnTable('tabelaAnexoInfoProcesso', 'InfoProcesso')
});
$('#btnAddChildEsgotamento').click(() => {
    addNewChildOnTable('tabelaAnexoEsgotamento', 'Esgotamento')
});
$('#btnAddChildRestricao').click(() => {
    addNewChildOnTable('tabelaAnexoBaixaRestricao', 'Restricao')
});
$('#btnAddChildextincao').click(() => {
    addNewChildOnTable('tabelaAnexoExtincao', 'Extincao')
});
$('#btnAddChilProcExterno').click(() => {
    addNewChildOnTable('tabelaAnexoProcExterno', 'ProcExterno')
});
//adiciona row com tipo da tabela declarada
function addNewChildOnTable(tableName, type) {

    wdkAddChild(tableName);
    //atribui variavel com a função de carregamento FLUIGC : https://style.fluig.com/javascript.html
    var loading = FLUIGC.loading(window);
    $('[name^=anexo' + type + '___]').fileupload({
        dataType: 'json', // OBS: ATRIBUIÇÃO JSON NECESSARIA PARA CARREGAR ARQUIVOS COM PADRAO DE NOME UTF-8
        start: () => {
            loading.show();
        }, // inicializa loading de pagina
        done: (e, data) => {

            if (data.result) {
                var file = data.result.files[0];
                var index = e.target.id.split('___')[1];
                // abri a ramificação do atributo html que disparou o evento. ".target"
                console.log(e.target)
                var url = e.target.parentElement.offsetParent.parentElement.nextElementSibling.childNodes[3].childNodes[1];
                saveDocuments(file, index, type, url);
            }

        },
        fail: (e, data) => {
            console.log('FALHA');
            console.log(e);
            console.log(data);
        },
        stop: () => {
            loading.hide();
        } //finaliza loading FLUIGC com hide()
    });
}

//salva documentos
function saveDocuments(file, index, type, url) {
    $.ajax({
        //url: 'http://cecresptst.fluig.cloudtotvs.com.br/api/public/ecm/document/createDocument',
        url: 'http://devfluig.iv2.com.br/api/public/ecm/document/createDocument',
        method: 'POST',
        contentType: 'application/json;',
        data: JSON.stringify({
            "description": file.name,
            "parentId": parentId,
            "attachments": [{
                "fileName": file.name
            }]
        })
    }).done((result) => {
        //setting dos campos do formulario
        $('#nomeArquivo' + type + '___' + index).val(file.name);
        $('#hidden_documentId' + type + '___' + index).val(result.content.id);
        url.href = gerarLinkArquivo(result.content.id);
        $("#hiddenAtiv" + type + "___" + index).val(ativ);
        // mensagem de sucesso FLUIGC: https://style.fluig.com/javascript.html
        FLUIGC.toast({
            title: 'Sucesso: ',
            message: 'Arquivo ' + file.name + ' publicado com sucesso.',
            type: 'success'
        });
    }).fail((result) => {
        // mensagem de ERRO FLUIGC: https://style.fluig.com/javascript.html
        FLUIGC.toast({
            title: 'Falha: ',
            message: 'Não foi possivel publicar o arquivo.',
            type: 'danger'
        });
    });
    $('[name^="visualizar' + type + '___"]').click((e) => {
        var documentId = $(e.target).siblings()[0].value;
        var versao = 1000
        openDocument(documentId, versao)
    });
}
//função responsavel por pegar id do documento (id documento setadada dentro do campo hide no formulario)
function o(e) {
    var documentId = e.nextElementSibling.value;
    // var link = "webdownload?documentId="+documentId+"&version=1000&tenantId=1&replication=false"
    // e.offsetParent.nextSibling.nextElementSibling.children[0].childNodes[1].href = gerarLinkArquivo(documentId);
    var versao = 1000;
    openDocument(documentId, versao);
}

//função responsavel por bloquear teclas digitadas no select
function LockTab(Event) {
    return false;
}


//abre o documento
function openDocument(docId, docVersion) {
    var parentOBJ;

    if (window.opener) {
        parentOBJ = window.opener.parent;
    } else {
        parentOBJ = parent;
    }

    var cfg = {
        url: "/ecm_documentview/documentView.ftl",
        maximized: true,
        title: "Visualizador de Documentos",
        callBack: function () {
            parentOBJ.ECM.documentView.getDocument(docId, docVersion);
        },
        customButtons: []
    };
    parentOBJ.ECM.documentView.panel = parentOBJ.WCMC.panel(cfg);
}

//deleta documento da pasta pelo id
function deleteDocument(idDoc) {

    var url = "/api/public/2.0/documents/deleteDocument/" + idDoc;

    $.ajax(url, {
        async: false,
        method: "POST",
        dataType: "json",
        contentType: "application/json",

        success: function (data) {
            FLUIGC.toast({
                title: 'Sucesso: ',
                message: "Arquivo Deletado",
                type: 'success'
            });
        },
        error: function (e) {
            FLUIGC.toast({
                title: 'Erro: ',
                message: "Erro ao deletar arquivo",
                type: 'danger'
            });
            console.log(e);
        }
    });
}

//gera o link Raiz do documento para download
function gerarLinkArquivo(idDoc) {
    var link;
    var url = '/api/public/2.0/documents/getDownloadURL/' + idDoc;
    var obj = {};
    var params = JSON.stringify(obj);

    $.ajax(url, {
        async: false,
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        data: params,

        success: function (data) {
            link = data.content;
        },
        error: function (e) {
            console.log(e);
        },
    });

    return link;
}
//VISUALIZA OS DOCUMENTOS APÓS PASSAR A ATIVIDADE ATUAL
function visualizarDocument(e) {
    var documentId = $(e).siblings()[0].value;
    var versao = 1000
    openDocument(documentId, versao)
}
//Download 
function baixarArquivo(e) {
    let url = gerarLinkArquivo($(e).closest('tr').find('[name^=hidden_documentId]').val())
    e.href = url
}
// function resolve(process,colleague){

// 	var userList = new java.util.ArrayList();

// 	var valorSolicitado = hAPI.getCardValue("valorTotal")

// 	var dataset = DatasetFactory.getDataset("ds_consulta_paifilho_santana", null, null, null)

// 	for(var i = 0; i < dataset.rowsCount; i++)
// 	{
// 		var valor = dataset.getValue(i, "valorMaximo")
// 		var nomeAprovador = dataset.getValue(i, "nome")
// 		var aprovadorPorID = dataset.getValue(i, "colleagueId")





// 		if(valorSolicitado <= valor)
// 		{
// 			userList.add(aprovadorPorID)
// 			break;
// 			return;
// 		}
// 	}


// 	return userList;

// }


//CALCULA OS VALORES DA TABELA PAI E FILHO E ADICIONA O RESULTADO EM UM INPUT "VALOR TOTAL"-----------------------------------------------------
function resolve(process, colleague) {

	var userList = new java.util.ArrayList();

	var valorSolicitacao = hAPI.getCardValue("valorTotal");

	var valorProv = 0;
	if (valorSolicitacao.length > 6) {
		valorProv = valorSolicitacao.replace(".", "").replace(",", ".")
	} else {
		valorProv = valorSolicitacao.replace(",", ".")
	}

	var ds = DatasetFactory.getDataset("ds_consulta_paifilho_santana", null, null, null);

	for (var i = 0; i < ds.rowsCount; i++) {
		var valor = ds.getValue(i, "valorMaximo");
		var aprovador = ds.getValue(i, "nome");
		var aprovadorPorId = ds.getValue(i, "colleagueId");

		if (parseFloat(valorProv) <= parseFloat(valor)) {
			userList.add(aprovadorPorId)
			break;

		}
	}



	// userList.add('matricula_1');
	// userList.add('matricula_2');


	return userList;

}
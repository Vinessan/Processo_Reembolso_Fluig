function createDataset(fields, constraints, sortFields) {
    //Cria as colunas
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("NumProcesso");
    dataset.addColumn("NumFormulario");
    dataset.addColumn("nome");
    dataset.addColumn("valorMaximo");
    dataset.addColumn("colleagueId");

    //Cria a constraint para buscar os formulários ativos
    var constraints = new Array();
    constraints.push(DatasetFactory.createConstraint("metadata#active", true, true, ConstraintType.MUST));




    var datasetPrincipal = DatasetFactory.getDataset("ds_aprovadores_alcada_santana", null, constraints, null);

    for (var i = 0; i < datasetPrincipal.rowsCount; i++) {
        var WKNumProces = datasetPrincipal.getValue(i, "WKNumProces");
        var documentId = datasetPrincipal.getValue(i, "metadata#id");
        var documentVersion = datasetPrincipal.getValue(i, "metadata#version");

        //Cria as constraints para buscar os campos filhos, passando o tablename, número da formulário e versão
        var constraintsFilhos = new Array();
        constraintsFilhos.push(DatasetFactory.createConstraint("tablename", "aprovadores", "aprovadores", ConstraintType.MUST));
        constraintsFilhos.push(DatasetFactory.createConstraint("metadata#id", documentId, documentId, ConstraintType.MUST));
        constraintsFilhos.push(DatasetFactory.createConstraint("metadata#version", documentVersion, documentVersion, ConstraintType.MUST));

        //Busca o dataset
        var datasetFilhos = DatasetFactory.getDataset("ds_aprovadores_alcada_santana", null, constraintsFilhos, null);

        for (var j = 0; j < datasetFilhos.rowsCount; j++) {
            //Adiciona os valores nas colunas respectivamente.
            dataset.addRow(new Array(
                WKNumProces,
                documentId,
                datasetFilhos.getValue(j, "nomeAprovador"),
                datasetFilhos.getValue(j, "valorMaximo").replace(",", "."),
                datasetFilhos.getValue(j, "colleagueIDUser")
            ));
        }
    }

    return dataset;
}
function createDataset(fields, constraints, sortFields) {
    var ds = DatasetBuilder.newDataset()

    var constraintsFilhos = []
    constraintsFilhos.push(DatasetFactory.createConstraint("tablename", "tabelaAnexoInfoProcesso", "tabelaAnexoInfoProcesso", ConstraintType.MUST));

    var tabela1 = DatasetFactory.getDataset("ds_alcada_santana", null, constraintsFilhos, null)

    ds.addColumn("valorProduto")
    ds.addColumn("dataNota")
    ds.addColumn("centroDeCusto")
    ds.addColumn("anexoInfoProcesso")
    ds.addColumn("hidden_documentIdInfoProcesso")
    ds.addColumn("downloadInfoProcesso")

    for (i = 0; i < tabela1.rowsCount; i++) {
        ds.addRow(new Array(tabela1.getValue(i, "valorProduto"),
            tabela1.getValue(i, "dataNota"),
            tabela1.getValue(i, "centroDeCusto"),
            tabela1.getValue(i, "anexoInfoProcesso"),
            tabela1.getValue(i, "hidden_documentIdInfoProcesso"),
            tabela1.getValue(i, "downloadInfoProcesso")

        ))

    }
    return ds
}
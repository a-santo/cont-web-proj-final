async function setTipoPesquisa(tipo, locator) {
    if (tipo === 'rota-dest') {
        $(`${locator}`).val("RTDEST")
    } else if (tipo === 'rota-para') {
        $(`${locator}`).val("RTPARA")
    } else if (tipo === 'autocarro') {
        $(`${locator}`).val("AUTOCARRO")
    } else {
        $(`${locator}`).val("PARAGEM")
    }
}

function gerarTabela(opcoes, locTabela, locDivTabela) {
    const tabela = new Tabulator(locTabela, opcoes);
    $(locDivTabela).show()
    return tabela
}
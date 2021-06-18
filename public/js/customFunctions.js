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

function gerarConfirmacao(titulo, texto, icone, titConf, txtConf, icoConf, cell) {
    Swal.fire({
        title: titulo,
        html: texto,
        icon: icone,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "Cancelar",
        confirmButtonText: 'Sim, apagar!'
    }).then((result) => {
        if (result.isConfirmed) {
            if(cell) cell.getRow().delete();
            Swal.fire(
                titConf,
                txtConf,
                icoConf
            )
        }
    })
}
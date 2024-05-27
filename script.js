function convert(dados) { // declarando a função criarTabela e passando o array de objeto "dados" como parâmetro
    let table = document.createElement("table"); // declarando a variável table como sendo a tabela criada no HTML

    let thead = document.createElement("thead"); // declarando a função thead como sendo o thead no HTML
    let headerRow = document.createElement("tr"); // declarando a função headerRow como sendo o tr no HTML, que aqui vai ser a linha de cabeçalho

    let headers = ["Data", "Valor", "Tipo", "Descricao", "Categoria"]; // criando o array headers com as chaves do array de objetos para usar como os headers da tabela
    headers.forEach(headerText => { // usando o método forEach para dizer que para cada dado (headerText) do array headers vai fazer tal coisa
        let th = document.createElement("th");// criando a variavel th como sendo o elemento th da tabela HTML
        th.innerText = headerText; // usando a propriedade innerText no th, passando oque vai estar escrito em cada th, que no caso são os dados do array
        headerRow.appendChild(th);// appendendo o th no headerRow que é o tr. Na prática vai ser a primeira linha da tabela que vai ser o cabeçalho da tabela
    });

    thead.appendChild(headerRow); // appendendo a linha de cabeçalho ao thead
    table.appendChild(thead); // appendendo o thead populado na tabela

    let tbody = document.createElement("tbody"); // declarando a variavel tbody como sendo o elemento tbody da tabela

    dados.forEach(dado => { // usando o método forEach no objeto dados, para dizer que para cada dado do array de objetos vai acontecer tal coisa
        let tr = document.createElement("tr");// declarando a variavel tr como sendo o elemento tr do HTML

        let tdData = document.createElement("td"); // declarando a variável tdData como sendo um elemento td do HTML
        tdData.innerText = dado.Data;// usando a propriedade innerText, passando que o texto do elemento tdData vai ser o valor da chave data
        tr.appendChild(tdData);// appendendo o tdData à linha tr 

        let tdValor = document.createElement("td"); // declarando a variável tdValor como sendo um elemento td do HTML
        tdValor.innerText = dado.Valor;// usando a propriedade innerText, passando que o texto do elemento tdValor vai ser o valor da chave Valor
        tr.appendChild(tdValor);// appendendo o tdValor à linha tr 

        let tdTipo = document.createElement("td");// declarando a variável tdTipo como sendo um elemento td do HTML
        tdTipo.innerText = dado.Tipo;// usando a propriedade innerText, passando que o texto do elemento tdTipo vai ser o valor da chave Tipo
        tr.appendChild(tdTipo);// appendendo o tdTipo à linha tr 

        let tdDescricao = document.createElement("td");// declarando a variável tdDescricao como sendo um elemento td do HTML
        tdDescricao.innerText = dado.Descricao;// usando a propriedade innerText, passando que o texto do elemento tdTipo vai ser o valor da chave Tipo
        tr.appendChild(tdDescricao);// appendendo o tdDescricao à linha tr 

        let tdCategoria = document.createElement("td"); // Declarando a variável tdCategoria como sendo um elemento td do HTML

        let caixaDeTexto = document.createElement("input"); // Declarando a variável caixaDeTexto como sendo um input
        caixaDeTexto.setAttribute("type", "text");// declarando o tipo do input que nesse caso é de texto
        caixaDeTexto.setAttribute("id", `nova_categoria_${dado.Localizador}`);// Setando o atributo id no input e passando que o id vai ser nova-categoria_{numero do localizador}
        caixaDeTexto.setAttribute("class", "input-style");// colocando uma classe no input para estiliza-lo
        caixaDeTexto.setAttribute("value", dado.Categoria);// passando que o valor default vai ser oque estiver na coluna categoria do banco de dados, daquele item.
        caixaDeTexto.disabled = true; // passando que o input vai estar desativado.

        
        let imgEdit = document.createElement('img');// declarando uma variável como sendo um elemento img
        imgEdit.src = 'img/lapis.png'// passando que esse elemento img vai ter como source a pasta img e o arquivo lapis.png
        
        let buttonEdit = document.createElement("button");// declarando a variável buttonEdit como sendo um elemento button
        buttonEdit.setAttribute("class", "ativar-input");// colocando uma classe no botao para estiliza-lo
        buttonEdit.appendChild(imgEdit);// colocando a imgEdit dentro no botão
        buttonEdit.addEventListener("click", function () {// adicionando um evento de click
            caixaDeTexto.disabled = false;// quando o botao for clicado vai ativar o input
            buttonEdit.style.display = "none";// o buttonEdit vai sumir
            buttonCategoria.style.display = "inline";// e o buttonCategoria vai aparecer com o display inline
            caixaDeTexto.focus();// colocando o foco no input quando o botão for clicado
        });

        let imgDone = document.createElement('img');// declarando uma variável como sendo um elemento img
        imgDone.src = 'img/verificar.png';// passando que esse elemento img vai ter como source a pasta img e o  arquivo verificar.png

        
        let buttonCategoria = document.createElement("button");// declarando a variável buttonCategoria como sendo um elemento button
        buttonCategoria.setAttribute("id", `atualizar-categoria-btn_${dado.Localizador}`);// setando o atributo id e passando que ele vai ser atualizar-categoria-btn_{numero do localizador} 
        buttonCategoria.setAttribute("class", "att-category");// colocando uma classe no botão para estiliza-lo
        buttonCategoria.setAttribute("onclick", `atualizarCategorias(${dado.Localizador})`);// setando o atributo onclick e passando que ele vai chamar a funçao atualizarCategoria e como parametro vai passar o numero do localizar
        buttonCategoria.style.display = "none"; // Passando que ele vai iniciar oculto
        buttonCategoria.appendChild(imgDone);// colocando a imgDone no botão
        buttonCategoria.addEventListener("click", function () {// adicionando um evento de click
            caixaDeTexto.disabled = true;// quando o botão for clicado o input vai ser desativado
            buttonEdit.style.display = "inline";// o buttonEdit vai voltar a aparecer com o display inline
            buttonCategoria.style.display = "none";// o buttonCategoria vai sumir
        });


        tdCategoria.appendChild(caixaDeTexto);// populando a coluna tdCategoria com o input
        tdCategoria.appendChild(buttonEdit);// populando a coluna tdCategoria com o buttonEdit
        tdCategoria.appendChild(buttonCategoria);// populando a coluna categoria com o buttonCategoria

        tr.appendChild(tdCategoria); // appendendo o tdCategoria à linha tr

        tbody.appendChild(tr); // appendendo a linha tr populada com todos as celulas no tbody
    });

    table.appendChild(tbody);// appendendo o tbody populado com a linha tr, na tabela

    let tabelaContainer = document.getElementById("resultado"); // declarando a variavel tabela container que vai ser o elemento que tem o id resultado no HTML
    tabelaContainer.innerHTML = "";
    tabelaContainer.appendChild(table);
};


async function getTransactionsByYearAndMonth(tipo, mes, ano) {
    let connect1 = await fetch('http://localhost:8000/transactions'.concat('/', tipo, '/', ano, '/', mes), {
        method: "GET"
    }).then((response) => {
        if (response.ok) {
            return response.json()
        }
        else {
            throw Error(response.statusText)
        }
    })

    return connect1;

}

async function criarTabela() {
    let tipo = document.getElementById("tipo").value
    let data = document.getElementById("mes").value.split('-')

    if (data[0] === '') {
        alert("Escolha uma data!");
        return;
    }

    let jsonData;

    try {
        jsonData = await getTransactionsByYearAndMonth(tipo, data[1], data[0]);
    } catch (error) {
        alert("Esse mês não foi encontrado no banco de dados.")
        location.reload();
        return;
    }

    convert(jsonData);
}

async function atualizarCategorias(id) {

    let categoria = document.getElementById("nova_categoria_" + id).value

    let jsonData;

    try {
        jsonData = await atualizeCategories(id, categoria);
        alert("Categoria atualizada com sucesso!")// adicionando um alerta quando a categoria for atualizada com sucesso
    } catch (error) {
        alert("Não foi possivel atualizar a categoria.")
        location.reload();
        return;
    }
}

async function atualizeCategories(transacao_id, categoria) {
    let connect2 = await fetch('http://localhost:8000/transactions'.concat('/', transacao_id, '/', categoria), {
        method: "PUT"
    }).then((response) => {
        if (response.ok) {
            return response.json()
        }
        else {
            throw Error(response.statusText)
        }
    })

    return connect2;
}
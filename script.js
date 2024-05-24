let dados = [
    {
      "Localizador": 28,
      "Data": "2024-03-29",
      "Valor": -32.55,
      "Tipo": "Compra no débito",
      "Descricao": "Pag*53486958fernando",
      "Categoria": "Padaria"
    },
    {
      "Localizador": 29,
      "Data": "2024-03-29",
      "Valor": -7.81,
      "Tipo": "Compra no débito",
      "Descricao": "Pag*53486958fernando",
      "Categoria": "Padaria"
    },
    {
      "Localizador": 27,
      "Data": "2024-03-27",
      "Valor": -70,
      "Tipo": "Transferência enviada pelo Pix",
      "Descricao": "Eduardo Capdeville De São Thiago Sardenberg Da Rocha",
      "Categoria": ""
    }
  ];
  
  function convert(dados) { // declarando a função criarTabela e passando o array de objeto "dados" como parâmetro
    let table = document.createElement("table"); // declarando a variável table como sendo a tabela criada no HTML
  
    let thead = document.createElement("thead"); // declarando a função thead como sendo o thead no HTML
    let headerRow = document.createElement("tr"); // declarando a função headerRow como sendo o tr no HTML, que aqui vai ser a linha de cabeçalho
  
    let headers = ["Localizador", "Data", "Valor", "Tipo", "Descricao", "Categoria"]; // criando o array headers com as chaves do array de objetos para usar como os headers da tabela
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
        let tdLocalizador = document.createElement("td");// declarando a variável tdLocalizador como sendo um elemento td do HTML
        tdLocalizador.innerText = dado.Localizador;// usando a propriedade innerText, passando que o texto do elemento tdLocalizador vai ser o valor da chave Localizador
        tr.appendChild(tdLocalizador);// appendendo o tdLocalizador à linha tr 
  
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
  
        let tdCategoria = document.createElement("td");// declarando a variável tdCategoria como sendo um elemento td do HTML
        if (dado.Categoria === "") {
          tdCategoria.innerHTML = "<input type='text' id='nova_categoria' name='nova_categoria'><br><br><button id='atualizar-categoria-btn' onclick='atualizarCategorias()'>Atualizar Categoria</button><br><br>";
        } else {
            tdCategoria.innerText = dado.Categoria;// usando a propriedade innerText, passando que o texto do elemento tdCategoria vai ser o valor da chave Categoria
        }
        tr.appendChild(tdCategoria); // appendendo o tdCategoria à linha tr
  
        tbody.appendChild(tr); // appendendo a linha tr populada com todos as celulas no tbody
    });
  
    table.appendChild(tbody);// appendendo o tbody populado com a linha tr, na tabela
    
    let tabelaContainer = document.getElementById("resultado"); // declarando a variavel tabela container que vai ser o elemento que tem o id resultado no HTML
    tabelaContainer.innerHTML = "";
    tabelaContainer.appendChild(table);
  }

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

async function atualizarCategorias(){
    let id = document.getElementById("transacao_id").value
    let categoria = document.getElementById("nova_categoria").value

    let jsonData;

    try {
        jsonData = await atualizeCategories(id, categoria)
    } catch (error) {
        alert("Não foi possivel.")
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
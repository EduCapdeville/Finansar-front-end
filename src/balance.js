import { getSummary } from "./API.js";

function convert(dados) { // criando a função convert, passando como parâmetros dados
    let table = document.createElement("table"); // criando o elemento table no html
    table.id = "example"; // adicionando um id à table para inicializar a tabela
    table.className = "display"; // adiciona a classe necessária para o datatable
    
    let thead = document.createElement("thead"); // criando o elemento thead
    let headerRow = document.createElement("tr"); // criando o elemento tr
    let headers = ["Mes", "Total"]; // definindo os titulos do cabeçalho da tabela

    headers.forEach(headerText => { // para cada titulo do cabeçalho
        let th = document.createElement("th");// cria um elemento th
        th.innerText = headerText; // passa o titulo para o th
        headerRow.appendChild(th);// coloca o th no tr
    });

    thead.appendChild(headerRow); // coloca o tr no thead
    table.appendChild(thead); // coloca o thead na tabela

    let tbody = document.createElement("tbody"); // cria o tbody

    dados.forEach(dado => { // para cada dado dos dados recebidos
        let tr = document.createElement("tr");// cria um tr

        let tdMes = document.createElement("td"); //cria um td
        tdMes.innerText = dado.mes_ano;// coloca o valor da chave mes_ano no innerText do td
        tr.appendChild(tdMes);// coloca o td no tr

        let BRL = new Intl.NumberFormat('pt-BR', { // cria a variável para mudar os valores para brl
            style: 'currency',
            currency: 'BRL',
        });

        let tdTotal = document.createElement("td"); // cria um td
        tdTotal.innerText = BRL.format(dado.total_gastos);// formata o valor recebido da chave total_gastos e coloca no innerTexto do td criado anteriormente
        tr.appendChild(tdTotal);// coloca o td criado anteriormente no tr
        tbody.appendChild(tr);// coloca o tr no tbody
    }); 

    table.appendChild(tbody);// coloca o tbody na tabela

    let tabelaContainer = document.getElementById("resultado-saldo"); //pega o elemento com id resultado-saldo 
    tabelaContainer.innerHTML = "";// limpa o html dentro desse elemento
    tabelaContainer.appendChild(table);// coloca a tabela criada dentro desse elemento vazio


    $(document).ready(function() {// inicializa o datatables depois de adicionar a tabela
        $('#example').DataTable();
    });
};

async function criarTabela2() { 

    let jsonData2;

    try {
        jsonData2 = await getSummary();
    } catch (error) {
        alert("Não foi possível receber o sumário das suas transações");
        location.reload();
        return;
    }

    convert(jsonData2);
}

window.criarTabela2 = criarTabela2;

function convert(jsonData) {

    let resultado = document.getElementById("resultado");
    resultado.innerHTML = '';

    let table = document.createElement("table");

    let cols = Object.keys(jsonData[0]);
    cols[3] = "Descrição";

    let tr = document.createElement("tr");

    cols.forEach((item) => {
        let th = document.createElement("th");
        th.innerText = item;
        tr.appendChild(th);
    });
    table.append(tr)

    jsonData.forEach((item) => {
        let tr = document.createElement("tr");

        let vals = Object.values(item);
        
        let BRL = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

        vals[1] = BRL.format(vals[1]);

        vals.forEach((elem) => {
            let td = document.createElement("td");
            td.innerText = elem;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    resultado.appendChild(table)
}

async function get_transactions_by_year_and_month(tipo, mes, ano) {
    let itgo = await fetch('http://localhost:8000/transactions'.concat('/', tipo, '/', ano, '/', mes), {
        method: "GET"
    }).then((response) => {
        if(response.ok) {
            return response.json()
        }
        else {
            throw Error(response.statusText)
        }
    })

    return itgo;

}

async function criar_tabela() {
    let tipo = document.getElementById("tipo").value
    let data = document.getElementById("mes").value.split('-')

    if(data[0] === '') {
        alert("Escolha uma data!");
        return;
    }
    
    let jsonData;

    try {
        jsonData = await get_transactions_by_year_and_month(tipo, data[1], data[0]);
    } catch (error) {
        alert("Esse mês não foi encontrado no banco de dados.")
        location.reload();
        return;
    }

    convert(jsonData);
}

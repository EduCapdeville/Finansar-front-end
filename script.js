function convert(jsonData) {

    let resultado = document.getElementById("resultado");

    let table = document.createElement("table");

    let cols = Object.keys(jsonData[0]);

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

        vals.forEach((elem) => {
            let td = document.createElement("td");
            td.innerText = elem;
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    resultado.appendChild(table)
}

async function get_transactions_by_year_and_month(mes, ano) {
    let alberto = await fetch('http://localhost:8000/transactions'.concat('/', ano, '/', mes), {
        method: "GET"
    }).then((response) => response.json())

    return alberto;

}

async function criar_tabela() {
    let jsonData = await get_transactions_by_year_and_month(3, 2024);

    convert(jsonData);
}

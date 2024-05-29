export async function getTransactionsByYearAndMonth(tipo, mes, ano) {
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

export async function atualizeCategories(transacao_id, categoria) {
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

export async function getSummary() {
    let connect3 = await fetch('http://localhost:8000/transactions/summary', {
        method: "GET"
    }).then((response) => {
        if (response.ok) {
            return response.json()
        }
        else {
            throw Error(response.statusText)
        }
    })

    return connect3
}
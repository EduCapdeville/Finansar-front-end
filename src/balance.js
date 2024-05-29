import { getSummary } from "./API.js";

async function criarTabela2() { // criando a função criarTabela2
    let jsonData2;// declarando uma variavel para depois passar o valor dela

    try {// tentar
        jsonData2 = await getSummary();// atribuir ao jsondata2 o retorno da função getSummary
    } catch (error) {// pegar um ero
        alert("Não foi possível receber o sumário das suas transações");// se pegar um erro alerta isso
        location.reload();// recarrega a pagina
        return;// retorna nada.
    }
    $(document).ready(function() { // espera o documento ser carregado completamente para rodar função
        $('#example').DataTable({// seleciona o elemento com id example e transforma esse elemento em uma tabela do datatables
            data: jsonData2,// jsondata é a variavel que contem os dados que vao estar na tabela
            columns: [ // inicia a definição das colunas da tabela
                { data: 'mes_ano', title: 'Mês' }, // define a primeira coluna da tabela que vai ter como titulo Mês e nas celulas vai exibir os valores da chave mes_ano recebida do back
                { 
                    data: 'total_gastos', // define quais serao os valores presentes nas celulas da segunda coluna
                    title: 'Total',// define o titulo da segunda coluna
                    render: function(data) {// definindo uma função de renderização personalizada
                        return new Intl.NumberFormat('pt-BR', { // cria um novo objeto que formata os numeros de acordo com o idioma especificado
                            style: 'currency',// especifica que o numero deve ser formatado como uma moeda
                            currency: 'BRL'// define a moeda como real brasileiro
                        }).format(data);// formata o dado e retorna o valor formatado como uma string
                    }
                }
            ],
        });
    });
}

window.criarTabela2 = criarTabela2; // 
import { getTransactionsByYearAndMonth } from "./API.js";
import { atualizeCategories } from "./API.js";

async function criarTabela() {
    let tipo = document.getElementById("tipo").value;
    let data = document.getElementById("mes").value.split('-');

    if (data[0] === '') {
        alert("Escolha uma data!");
        return;
    }

    let jsonData;

    try {
        jsonData = await getTransactionsByYearAndMonth(tipo, data[1], data[0]);
    } catch (error) {
        alert("Esse mês não foi encontrado no banco de dados.");
        location.reload();
        return;
    }

    // Convertendo dados para DataTables
    $('#tabela-transactions').DataTable({
        data: jsonData,
        destroy: true, // Destroi qualquer tabela já existente antes de recriar
        columns: [
            { data: 'Data', title: 'Data' },
            { 
                data: 'Valor', 
                title: 'Valor',
                render: function(data, type, row) {
                    return new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(data);
                }
            },
            { data: 'Tipo', title: 'Tipo' },
            { data: 'Descricao', title: 'Descricao' },
            { 
                data: 'Categoria', 
                title: 'Categoria',
                render: function(data, type, row) {
                    return `
                        <input type="text" id="nova_categoria_${row.Localizador}" class="input-style" value="${data}" disabled>
                        <button class="editar-button" onclick="editCategory('${row.Localizador}')">
                            <img src="img/lapis.png" alt="Edit">
                        </button>
                        <button id="atualizar-categoria-btn_${row.Localizador}" class="att-category" onclick="atualizarCategorias('${row.Localizador}')" style="display:none;">
                            <img src="img/verificar.png" alt="Done">
                        </button>
                    `;
                }
            }
        ]
    });
}

window.criarTabela = criarTabela;

window.editCategory = function(id) {
    const input = document.getElementById(`nova_categoria_${id}`);//Pega o campo de entrada de texto da categoria pelo ID (nova_categoria_${id}).
    const editButton = input.nextElementSibling; //Pega o botão de editar que está logo após o campo de entrada (nextElementSibling).
    const updateButton = editButton.nextElementSibling;//Pega o botão de atualizar que está logo após o botão de editar (nextElementSibling do botão de editar).

    input.disabled = false;//Habilita o input
    editButton.style.display = "none";//esconde o botão de editar
    updateButton.style.display = "inline";//mostra o botão de atualizar
    input.focus();//coloca o foco no campo de entrada
};

window.atualizarCategorias = async function(id) {
    const categoria = document.getElementById(`nova_categoria_${id}`).value;

    try {
        await atualizeCategories(id, categoria);
    } catch (error) {
        alert("Não foi possível atualizar a categoria.");
        location.reload();
    }

    const input = document.getElementById(`nova_categoria_${id}`);
    const editButton = input.nextElementSibling;
    const updateButton = editButton.nextElementSibling;

    input.disabled = true;
    editButton.style.display = "inline";
    updateButton.style.display = "none";
};
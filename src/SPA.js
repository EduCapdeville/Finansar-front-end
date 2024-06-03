var pages = {
    'transactions' : '<div class="container" id="transactions"> <label for="mes">Selecione o mês:</label> <input type="month" id="mes" name="mes" value="2024-03"><br><br> <label for="tipo">Selecione o tipo:</label> <select id="tipo" name="tipo"> <option class="selecionar-tipo" value="gastos">Gastos</option> <option class="selecionar-tipo" value="recebimentos">Recebimentos</option> </select><br><br>  <button id="buscar-btn" onclick="criarTabela()">Buscar</button><br><br> </div> <div id="resultado"><table id="tabela-transactions"></table></div>',

    'saldo' : '<div><h2 class="titulo-saldo">Aqui está o seu saldo por mês</h2></div><div id="resultado-saldo"><table id="example" class="display" style="width:100%"><thead><tr><th>Mês</th><th>Total</th></tr></thead><tbody> </tbody></table></div>'
//     'projects' : '<div id="projetos"><h2>Projetos</h2><p>Possuo diversos projetos no GitHub. Clique no ícone para ver mais.</p><a href="https://github.com/EduCapdeville"><img src="./img/github.jpg"></a></div>',

//     'contact' : '<div id="contato"><h2>Fale comigo</h2><form><label for="nome">Nome:</label><input type="text" id="nome" name="nome" required /><label for="email">E-mail:</label><input type="email" id="email" name="email" required /><label for="msg">Mensagem:</label><textarea id="msg" name="usuario_msg" required></textarea><button type="submit" class="button">Enviar sua mensagem</button></form></div>',
};

function getPageContent(page) {
    var contentToReturn;

    switch(page){
        case 'transactions':
            contentToReturn = pages.transactions;
            break;
        case 'saldo':
            contentToReturn = pages.saldo;
            break;
        // case 'projects':
        //     contentToReturn = pages.projects;
        //     break;
        // case 'contact':
        //     contentToReturn = pages.contact;
        //     break;
        default:
            contentToReturn = pages.transactions;
            break;
    }
    document.getElementById('content').innerHTML = contentToReturn;
    
    if (document.getElementById('resultado-saldo')) {
        criarTabela2();
    }
}
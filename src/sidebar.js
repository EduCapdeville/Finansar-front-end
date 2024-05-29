let itemMenu = document.querySelectorAll('.item-menu') // declarando a variável itemMenu que vai selecionar todos os elementos que tem a classe item-menu

function selectLink() { // criando a função selectLink
    itemMenu.forEach((item) =>  // passando que para cada item do menu item que no caso são todas as li que estão com a classe item-menu
        item.classList.remove('ativo') // removendo a classe ativo que vai representar quando um link esta ativo, removendo a classe ativo de um link que o usuário n clicou
    )
    this.classList.add('ativo')// adicionando a classe ativo a um item que o usuário clicou, representando o link ativo
}

itemMenu.forEach((item) =>
    item.addEventListener('click', selectLink)
)

let btnExp = document.querySelector('#btn-exp')
let menuSide = document.querySelector('.menu-lateral')

btnExp.addEventListener('click', function(){
    menuSide.classList.toggle('expandir')
})
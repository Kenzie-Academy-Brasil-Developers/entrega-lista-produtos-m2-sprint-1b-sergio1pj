// seu código aqui
function criarCard(objeto) {
    const imgAlt = "Imagem "
    const tagLi = document.createElement("li");
    const tagImg = document.createElement("img");
    const tagH3 = document.createElement("h3");
    const tagSpan = document.createElement("span");
    const tagP = document.createElement("p");
    tagImg.src = objeto.img;
    tagImg.alt = imgAlt.concat(`${objeto.nome.toLowerCase()}`);
    tagH3.innerText = objeto.nome;
    tagSpan.innerText = objeto.secao;
    tagP.innerText = `R$ ${objeto.preco}`;
    tagLi.append(tagImg, tagH3, tagSpan, tagP);
    return tagLi;
}
function criarLista(thisArg) {
    const tagUl = document.querySelector(".containerListaProdutos ul");
    tagUl.innerHTML = "";
    thisArg.forEach((element) => {
        tagUl.appendChild(criarCard(element));
    })
    mostrarValorTotal(thisArg);
}
function filtrarPorNome() {
    const tagInput = document.querySelector(".campoBuscaPorNome");
    let nomeBuscado = tagInput.value.toLowerCase();
    let produtosFiltrados = produtos.filter((element) => {
        return nomeBuscado == element.nome.toLowerCase();
    });
    return produtosFiltrados;
}
function filtrarPorSecao(secao) {
    let produtosFiltrados = produtos.filter((element) => {
        return secao == element.secao;
    });
    return produtosFiltrados;
}
const botaoBuscaPorNome = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome");
botaoBuscaPorNome.addEventListener("click", () => {
    const novoProdutos = filtrarPorNome();
    criarLista(novoProdutos);
});
const botoesContainer = document.querySelectorAll("#botoesContainer button");
botoesContainer.forEach((botao) => {
    botao.addEventListener("click", (e) => {
        const alvo = e.target;
        if(alvo.innerText == "Todos Produtos") {
            criarLista(produtos);
        } else {
            const novoProdutos = filtrarPorSecao(`${e.target.innerText}`);
            criarLista(novoProdutos);
        }
    });
})
function calcularValorTotal(array) {
    let valorTotal = 0;
    array.forEach((element) => {valorTotal += parseFloat(element.preco)});
    return valorTotal;
}
function mostrarValorTotal(thisArg) {
    let tagSpan = document.querySelector(".priceContainer span");
    tagSpan.innerText = `R$ ${calcularValorTotal(thisArg)}.00`;
}
criarLista(produtos);

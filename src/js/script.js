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
    tagP.innerText = `R$ ${objeto.preco}.00`;
    tagLi.append(tagImg, tagH3, tagSpan, tagP);
    return tagLi;
}
function criarLista(callbackFn, thisArg) {
    const tagUl = document.querySelector(".containerListaProdutos ul");
    tagUl.innerHTML = "";
    thisArg.forEach((element, index, array) => {
        tagUl.appendChild(callbackFn(element));
    })
    return "Os item foram adicionados a lista!"
}
criarLista(criarCard, produtos);

function filtrarPorNome() {
    const tagInput = document.querySelector(".campoBuscaPorNome");
    let nomeBuscado = tagInput.value.toLowerCase();
    let produtosFiltrados = produtos.filter((element, index, array) => {
        return nomeBuscado == element.nome.toLowerCase();
    });
    return produtosFiltrados;
}

const botaoBuscaPorNome = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome");
botaoBuscaPorNome.addEventListener("click", () => {
    const novoProdutos = filtrarPorNome();
    criarLista(criarCard, novoProdutos);
});
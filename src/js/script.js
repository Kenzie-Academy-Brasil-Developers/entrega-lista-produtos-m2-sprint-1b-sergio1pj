// seu código aqui
const criarCard = objeto => {
    const criarOl = (objeto) => {
        const ol = document.createElement("ol");
        objeto.componentes.forEach((element) => {
            const li = document.createElement("li");
            li.innerText = element;
            ol.appendChild(li);
        })
        return ol;
    }   
    const imgAlt = "Imagem "
    const tagLi = document.createElement("li");
    const tagImg = document.createElement("img");
    const tagH3 = document.createElement("h3");
    const tagSpan = document.createElement("span");
    const tagOl = criarOl(objeto);
    const tagP = document.createElement("p");
    const tagButton = document.createElement("button");
    const tagDiv = document.createElement("div");
    tagImg.src = objeto.img;
    tagImg.alt = imgAlt.concat(`${objeto.nome.toLowerCase()}`);
    tagH3.innerText = objeto.nome;
    tagSpan.innerText = objeto.secao;
    tagP.innerText = `R$ ${objeto.preco}`;
    tagButton.innerText = "Comprar";
    tagDiv.append(tagP, tagButton);
    tagLi.append(tagImg, tagH3, tagSpan, tagOl, tagDiv);
    return tagLi;
}
const criarLista = array => {
    const tagUl = document.querySelector(".containerListaProdutos ul");
    tagUl.innerHTML = "";
    array.forEach((element) => {
        tagUl.appendChild(criarCard(element));
    })
    mostrarValorTotal(array);
}
const filtrarPorNome = () => {
    const tagInput = document.querySelector(".campoBuscaPorNome");
    let nomeBuscado = tagInput.value.trim().toLowerCase();
    let produtosFiltrados = produtos.filter((element) => {
        return nomeBuscado == element.nome.toLowerCase() || nomeBuscado == element.categoria.toLowerCase() || nomeBuscado == element.secao.toLowerCase();
    });
    return produtosFiltrados;
}
const filtrarPorSecao = secao => {
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
const calcularValorTotal = array => {
    let valorTotal = 0;
    array.forEach((element) => {valorTotal += parseFloat(element.preco)});
    return valorTotal;
}
const mostrarValorTotal = array => {
    let tagSpan = document.querySelector(".priceContainer span");
    tagSpan.innerText = `R$ ${calcularValorTotal(array)}.00`;
}
criarLista(produtos);

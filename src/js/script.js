    function criarCard(produto) {
    const criarOl = (produto) => {
        const tagOl = document.createElement("ol");
        produto.componentes.forEach((nutriente) => {
            const tagLi = document.createElement("li");
            tagLi.innerText = nutriente;
            tagOl.appendChild(tagLi);
        });
        return tagOl;
    }   
    const tagLi = document.createElement("li");
    const tagImg = document.createElement("img");
    const tagH3 = document.createElement("h3");
    const tagSpan = document.createElement("span");
    const tagOl = criarOl(produto);
    const tagP = document.createElement("p");
    const tagButton = document.createElement("button");
    const tagDiv = document.createElement("div");
    tagImg.src = produto.img;
    tagImg.alt = `Imagem ${produto.nome.toLowerCase()}`;
    tagH3.innerText = produto.nome;
    tagSpan.innerText = produto.secao;
    tagP.innerText = `R$ ${produto.preco}`;
    tagButton.innerText = "Comprar";
    tagDiv.append(tagP, tagButton);
    tagLi.append(tagImg, tagH3, tagSpan, tagOl, tagDiv);
    tagButton.addEventListener("click", (e) => {
        const cardCarrinho = criarCardCarrinho(tagLi);
        const listaCarrinho = document.querySelector(".containerCarrinho ul");
        listaCarrinho.appendChild(cardCarrinho);
        mostrarValorTotal();
    });
    return tagLi;
}
function criarLista(produtos) {
    const tagUl = document.querySelector(".containerListaProdutos ul");
    tagUl.innerHTML = "";
    produtos.forEach((produto) => {
        tagUl.appendChild(criarCard(produto));
    })
}
function filtrarPorNome() {
    const tagInput = document.querySelector(".campoBuscaPorNome");
    const nomeBuscado = tagInput.value.trim().toLowerCase();
    const produtosFiltrados = produtos.filter((produto) => {
        return nomeBuscado == produto.nome.toLowerCase() || nomeBuscado == produto.categoria.toLowerCase() || nomeBuscado == produto.secao.toLowerCase();
    });
    return produtosFiltrados;
}
function filtrarPorSecao(secao) {
    const produtosFiltrados = produtos.filter((produto) => {
        return secao == produto.secao;
    });
    return produtosFiltrados;
}
function criarCardCarrinho(card) {
    const tagLi = document.createElement("li");
    const tagImg = document.createElement("img");
    const tagDiv = document.createElement("div");
    const tagDiv1 = document.createElement("div");
    const tagDiv2 = document.createElement("div");
    const tagH3 = document.createElement("h3");
    const tagSpan = document.createElement("span");
    const tagP = document.createElement("p");
    const tagButton = document.createElement("button");
    const tagButtonImg = document.createElement("img");
    tagImg.src = card.querySelector("img").src;
    tagH3.innerText = card.querySelector("h3").innerText;
    tagSpan.innerText = card.querySelector("span").innerText;
    tagP.innerText = card.querySelector("p").innerText;
    tagButtonImg.src = "./src/img/trash.png";
    tagButton.appendChild(tagButtonImg);
    tagDiv1.append(tagH3, tagButton);
    tagDiv1.classList.add("container1");
    tagDiv2.append(tagSpan, tagP);
    tagDiv2.classList.add("container2");
    tagDiv.append(tagDiv1, tagDiv2);
    tagLi.append(tagImg, tagDiv);
    tagButton.addEventListener("click", () => {
        tagLi.remove();
        mostrarValorTotal();
    });
    return tagLi;
}
const botaoBuscaPorNome = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome");
botaoBuscaPorNome.addEventListener("click", () => {
    const novoProdutos = filtrarPorNome();
    criarLista(novoProdutos);
});
const botoesContainer = document.querySelectorAll("#botoesContainer button");
botoesContainer.forEach((botao) => {
    botao.addEventListener("click", () => {
        if(botao.innerText == "Todos Produtos") {
            criarLista(produtos);
        } else {
            const novoProdutos = filtrarPorSecao(`${botao.innerText}`);
            criarLista(novoProdutos);
        }
    });
})
function calcularValorTotal() {
    const listaCarrinho = document.querySelectorAll(".containerCarrinho ul li");
    let soma = 0;
    let quantidade = listaCarrinho.length;
    listaCarrinho.forEach((element) => {
        let preco = element.querySelector("p").innerText;
        preco = preco.replace("R$ ", "");
        preco = parseFloat(preco);
        soma += preco;
    });
  return {"soma": soma.toFixed(2), "quantidade": quantidade};
}
function atualizaCarrinho(total) {
    const carrinho = document.querySelector(".containerCarrinho");
    const carrinhoInfo = document.querySelector(".carrinhoInfo");
    const carrinhoVazio = document.querySelector(".carrinhoVazio");
    if(total.quantidade != 0) {
        if(!carrinhoInfo) {
            if(carrinhoVazio) {
                carrinhoVazio.remove();
            }
            const novoCarrinhoInfo = criarCarrinhoInfo(total);
            carrinho.appendChild(novoCarrinhoInfo);
        }else{
            carrinhoInfo.querySelectorAll("div p")[0].innerText = total.quantidade;
            carrinhoInfo.querySelectorAll("div p")[1].innerText = `R$ ${total.soma}`;
        }
    }else{
        if(carrinhoInfo) {
            carrinhoInfo.remove();
        }
        if(!carrinhoVazio) {
            const novoCarrinhoVazio = criarCarrinhoVazio();
            carrinho.appendChild(novoCarrinhoVazio);
        }
    }
}
function criarCarrinhoInfo(total) {
    const carrinhoInfo = document.createElement("div");
    const carrinhoInfoQuantidade = document.createElement("div");
    const carrinhoInfoValorTotal = document.createElement("div");
    const quantidadeH3 = document.createElement("h3");
    const quantidadeP = document.createElement("p");
    const valorTotalH3 = document.createElement("h3");
    const valorTotalP = document.createElement("p");
    quantidadeH3.innerText = "Quantidade";
    quantidadeP.innerText = total.quantidade;
    valorTotalH3.innerText = "Total";
    valorTotalP.innerText = `R$ ${total.soma}`;
    carrinhoInfoQuantidade.append(quantidadeH3, quantidadeP);
    carrinhoInfoValorTotal.append(valorTotalH3, valorTotalP);
    carrinhoInfo.append(carrinhoInfoQuantidade, carrinhoInfoValorTotal);
    carrinhoInfo.classList.add("carrinhoInfo");
    return carrinhoInfo;
}
function criarCarrinhoVazio() {
    const tagDiv = document.createElement("div");
    const tagImg = document.createElement("img");
    const tagH3 = document.createElement("h3");
    tagImg.src = "./src/img/bag.png";
    tagImg.alt = "shopping bag";
    tagH3.innerText = "Por enquanto não temos produtos no carrinho";
    tagDiv.append(tagImg, tagH3);
    tagDiv.classList.add("carrinhoVazio");
    return tagDiv;
}
function mostrarValorTotal(){
    const total = calcularValorTotal();
    atualizaCarrinho(total);
}
criarLista(produtos);

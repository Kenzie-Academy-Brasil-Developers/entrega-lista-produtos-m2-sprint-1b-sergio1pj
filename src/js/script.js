function criarCard(produto) {
    const criarOl = produto => {
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
    tagButton.addEventListener("click", () => {
        const cardCarrinho = criarCardCarrinho([produto.img, produto.nome, produto.secao, `R$ ${produto.preco}`]);
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
    });
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
function criarCardCarrinho(dados) {
    const tagLi = document.createElement("li");
    const tagImg = document.createElement("img");
    const tagDivExt = document.createElement("div");
    const tagDivSup = document.createElement("div");
    const tagDivInf = document.createElement("div");
    const tagH3 = document.createElement("h3");
    const tagSpan = document.createElement("span");
    const tagP = document.createElement("p");
    const tagButton = document.createElement("button");
    const tagButtonImg = document.createElement("img");
    tagImg.src = dados[0];
    tagH3.innerText = dados[1]
    tagSpan.innerText = dados[2];
    tagP.innerText = dados[3];
    tagButtonImg.src = "./src/img/trash.png";
    tagButton.appendChild(tagButtonImg);
    tagDivSup.append(tagH3, tagButton);
    tagDivSup.classList.add("container1");
    tagDivInf.append(tagSpan, tagP);
    tagDivInf.classList.add("container2");
    tagDivExt.append(tagDivSup, tagDivInf);
    tagLi.append(tagImg, tagDivExt);
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
        }else {
            carrinhoInfo.querySelectorAll("div p")[0].innerText = total.quantidade;
            carrinhoInfo.querySelectorAll("div p")[1].innerText = `R$ ${total.soma}`;
        }
    }else {
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
    const tagDivExt = document.createElement("div");
    const tagDivSup = document.createElement("div");
    const tagDivInf = document.createElement("div");
    const tagH3Quant = document.createElement("h3");
    const tagPQuant = document.createElement("p");
    const tagH3Total = document.createElement("h3");
    const tagPTotal = document.createElement("p");
    tagH3Quant.innerText = "Quantidade";
    tagPQuant.innerText = total.quantidade;
    tagH3Total.innerText = "Total";
    tagPTotal.innerText = `R$ ${total.soma}`;
    tagDivSup.append(tagH3Quant, tagPQuant);
    tagDivInf.append(tagH3Total, tagPTotal);
    tagDivExt.append(tagDivSup, tagDivInf);
    tagDivExt.classList.add("carrinhoInfo");
    return tagDivExt;
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
function mostrarValorTotal() {
    const total = calcularValorTotal();
    atualizaCarrinho(total);
}
criarLista(produtos);

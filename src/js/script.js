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
    const tagLi = document.createElement("li");
    const tagImg = document.createElement("img");
    const tagH3 = document.createElement("h3");
    const tagSpan = document.createElement("span");
    const tagOl = criarOl(objeto);
    const tagP = document.createElement("p");
    const tagButton = document.createElement("button");
    const tagDiv = document.createElement("div");
    tagImg.src = objeto.img;
    tagImg.alt = `Imagem ${objeto.nome.toLowerCase()}`;
    tagH3.innerText = objeto.nome;
    tagSpan.innerText = objeto.secao;
    tagP.innerText = `R$ ${objeto.preco}`;
    tagButton.innerText = "Comprar";
    tagDiv.append(tagP, tagButton);
    tagLi.append(tagImg, tagH3, tagSpan, tagOl, tagDiv);
    tagButton.addEventListener("click", (e) => {
        const card = e.currentTarget.parentNode.parentNode;
        const cardCarrinho = criarCardCarrinho(card);
        const listaCarrinho = document.querySelector(".containerCarrinho ul");
        listaCarrinho.appendChild(cardCarrinho);
        mostrarValorTotal();
    });
    return tagLi;
}
const criarLista = array => {
    const tagUl = document.querySelector(".containerListaProdutos ul");
    tagUl.innerHTML = "";
    array.forEach((element) => {
        tagUl.appendChild(criarCard(element));
    })
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
const criarCardCarrinho = card => {
    const tagLi = document.createElement("li");
    const tagImg = document.createElement("img");
    const tagDiv = document.createElement("div");
    const tagH3 = document.createElement("h3");
    const tagSpan = document.createElement("span");
    const tagP = document.createElement("p");
    const tagButton = document.createElement("button");
    tagImg.src = card.querySelector("img").src;
    tagH3.innerText = card.querySelector("h3").innerText;
    tagSpan.innerText = card.querySelector("span").innerText;
    tagP.innerText = card.querySelector("p").innerText;
    tagButton.innerText = "Remover";
    tagDiv.append(tagH3, tagSpan, tagP, tagButton);
    tagLi.append(tagImg, tagDiv);
    tagButton.addEventListener("click", (e) => {
        e.currentTarget.parentNode.parentNode.remove();
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
const calcularValorTotal = () => {
    const listaCarrinho = document.querySelectorAll(".containerCarrinho ul li");
    let soma = 0;
    let quantidade = listaCarrinho.length;
    listaCarrinho.forEach((element) => {
        let preco = element.querySelector("p").innerText;
        preco = preco.replace("R$ ", "");
        preco = parseFloat(preco);
        soma += preco;
    });
  return {"soma": soma, "quantidade": quantidade};
}
const AtualizaCarrinho = total => {
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
            carrinhoInfo.querySelectorAll("div p")[1].innerText = `R$ ${total.soma.toFixed(2)}`;
        }
    }else{
        if(carrinhoInfo) {
            carrinhoInfo.remove();
        }
        if(!carrinhoVazio) {
            const novaCarrinhoVazio = criarCarrinhoVazio();
            carrinho.appendChild(novaCarrinhoVazio);
        }
    }
}
const criarCarrinhoInfo = total => {
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
    valorTotalP.innerText = `R$ ${total.soma.toFixed(2)}`;
    carrinhoInfoQuantidade.append(quantidadeH3, quantidadeP);
    carrinhoInfoValorTotal.append(valorTotalH3, valorTotalP);
    carrinhoInfo.append(carrinhoInfoQuantidade, carrinhoInfoValorTotal);
    carrinhoInfo.classList.add("carrinhoInfo");
    return carrinhoInfo;
}
const criarCarrinhoVazio = () => {
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
const mostrarValorTotal = () => {
    const total = calcularValorTotal();
    AtualizaCarrinho(total);
}
criarLista(produtos);

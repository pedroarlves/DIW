// Faz uma solicitação GET para a API para obter a lista de produtos
fetch("https://fakestoreapi.com/products/category/jewelery")
  .then((response) => response.json())
  .then((data) => {
    // Cria o HTML para exibir os produtos usando classes do Bootstrap
    const produtosHTML = data
      .map(
        (product) => `
   <div class="col-md-4 mb-4">
  <div class="card">
    <div class="d-flex justify-content-center align-items-center img-flex">
      <img id="produto_imagem" src="${product.image}" class="card-img-top" alt="${product.title}">
    </div>
    <div id="produto_card_body" class="card-body">
      <div class="mb-3">
        <h5 id="produto_title" class="card-title">${product.title}</h5>
      </div>
      <div class="mb-3">
        <div>
          <p id="produto_preco" class="card-text"><strong>Preço:</strong></p>
        </div>
        <div>
          <p class="card-text">R$ ${product.price}</p>
          <p class="card-text fw-bolder">Nota: ${product.rating.rate} <i class="fa-solid fa-star" style="color: #ffee00;"></i></p>
        </div>
      </div>
      <div>
        <a href="detalhes.html?id=${product.id}" class="btn fw-bolder text-light   btn-dark">Ver detalhes</a>
      </div>
    </div>
  </div>
</div>

    `
      )
      .join("");

    // Obtém o elemento de exibição dos produtos
    const produtosElement = document.getElementById("produtos");

    // Insere o HTML dos produtos no elemento de exibição
    produtosElement.innerHTML = produtosHTML;
    console.log(produtosElement);
  })
  .catch((error) => {
    console.error("Erro:", error);
  });

// Javascript da pesquisa

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const detalhesElement = document.getElementById("produtos");

const handleSearch = (event) => {
  event.preventDefault(); // Impede o comportamento padrão do formulário

  const productName = searchInput.value.trim();

  if (productName === "") {
    alert("Digite um nome de produto");
    return;
  }

  fetch(
    "https://fakestoreapi.com/products/category/jewelery?title=${productName}"
  )
    .then((response) => response.json())
    .then((data) => {
      const filteredProducts = data.filter((product) =>
        product.title.toLowerCase().includes(productName.toLowerCase())
      );

      if (filteredProducts.length === 0) {
        alert("Nenhum produto encontrado");
        return;
      }

      const produtosHTML = filteredProducts
        .map(
          (product) => `
      <div class="col-md-4 mb-4">
      <div class="card">
        <div class="d-flex justify-content-center align-items-center img-flex">
          <img id="produto_imagem" src="${product.image}" class="card-img-top" alt="${product.title}">
        </div>
        <div id="produto_card_body" class="card-body">
          <div class="mb-3">
            <h5 id="produto_title" class="card-title">${product.title}</h5>
          </div>
          <div class="mb-3">
            <div>
              <p id="produto_preco" class="card-text"><strong>Preço:</strong></p>
            </div>
            <div>
              <p class="card-text">R$ ${product.price}</p>
            </div>
          </div>
          <div>
            <a href="detalhes.html?id=${product.id}" class="btn fw-bolder btn-warning">Ver detalhes</a>
          </div>
        </div>
      </div>
    </div>

      `
        )
        .join("");

      detalhesElement.innerHTML = produtosHTML;
      console.log(detalhesElement);
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
};

searchButton.addEventListener("click", handleSearch);

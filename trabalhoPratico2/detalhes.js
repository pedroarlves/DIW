// Obtém o ID do produto a partir da URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(response => response.json())
  .then(product => {
    // Cria o HTML para exibir o produto usando classes do Bootstrap
    const produtoHTML = `
    <main class="mt-5 pt-4">
      <div id="detail_main" class="container mt-5">
        <div class="row">
          <div class="col-md-6 mb-4">
            <img src="${product.image}" class="img-fluid" alt="${product.title}" />
          </div>
          <div class="col-md-6 mb-4">
            <div class="p-4">
              <h3>${product.title}</h3>
              <p class="lead">
                <span><strong>R$</strong> ${product.price}</span>
              </p>
              <strong><p style="font-size: 20px;">Informações do produto</p></strong>
              <p>${product.description}.</p>
            </div>
          </div>
        </div>
      </div>
    </main>`;

    // Obtém o elemento de exibição do produto
    const produtoElement = document.getElementById('detalhes');

    // Insere o HTML do produto no elemento de exibição
    produtoElement.innerHTML = produtoHTML;
    console.log(produtoElement);
  })
  .catch(error => {
    console.error('Erro:', error);
  });



const dados = {
  "produtos": [
    {
      "id": 1,
      "nome": "Batom Matte Velvet Red",
      "marca": "Maquiadoro",
      "descricao": "Um batom vermelho intenso com acabamento matte aveludado de longa duração.",
      "conteudo": "Nosso Batom Matte Velvet Red oferece cor pigmentada em uma única passada. Fórmula enriquecida com manteiga de karité para não ressecar os lábios. Perfeito para qualquer ocasião, do dia à noite.",
      "preco": "R$ 89,90",
      "destaque": true,
      "imagem_principal": "assets/img/batom-vermelho-1.jpg",
      "galeria": [
        {
          "id": 1,
          "titulo": "Swatch em pele clara",
          "imagem": "assets/img/galeria/batom-swatch-clara.jpg"
        },
        {
          "id": 2,
          "titulo": "Detalhe da Embalagem",
          "imagem": "assets/img/galeria/batom-embalagem.jpg"
        },
        {
          "id": 3,
          "titulo": "Modelo usando",
          "imagem": "assets/img/galeria/batom-modelo.jpg"
        }
      ]
    },
    {
      "id": 2,
      "nome": "Base Fluida HidraGlow",
      "marca": "Maquiadoro",
      "descricao": "Base de cobertura média com acabamento luminoso e natural. FPS 30.",
      "conteudo": "A Base HidraGlow uniformiza o tom da pele enquanto hidrata. Sua fórmula leve permite a construção de camadas sem pesar. Contém ácido hialurônico e FPS 30 para proteger sua pele.",
      "preco": "R$ 149,90",
      "destaque": false,
      "imagem_principal": "assets/img/base-fluida-1.jpg",
      "galeria": [
        {
          "id": 1,
          "titulo": "Tonalidades disponíveis",
          "imagem": "assets/img/galeria/base-tonalidades.jpg"
        },
        {
          "id": 2,
          "titulo": "Textura do produto",
          "imagem": "assets/img/galeria/base-textura.jpg"
        }
      ]
    },
    {
      "id": 3,
      "nome": "Paleta de Sombras Sunset",
      "marca": "Maquiadoro",
      "descricao": "12 cores ultra pigmentadas em tons quentes e terrosos (mattes e cintilantes).",
      "conteudo": "Crie looks incríveis com a Paleta Sunset. São 12 sombras que variam de mattes amanteigados a cintilantes de alto impacto. Fórmula fácil de esfumar e de longa duração.",
      "preco": "R$ 199,90",
      "destaque": true,
      "imagem_principal": "assets/img/paleta-sunset-1.jpg",
      "galeria": [
        {
          "id": 1,
          "titulo": "Swatches dos 12 tons",
          "imagem": "assets/img/galeria/paleta-swatches.jpg"
        },
        {
          "id": 2,
          "titulo": "Paleta aberta (detalhe)",
          "imagem": "assets/img/galeria/paleta-aberta.jpg"
        },
        {
          "id": 3,
          "titulo": "Look completo",
          "imagem": "assets/img/galeria/paleta-look.jpg"
        }
      ]
    }
  ]
}

// --- INÍCIO DO CÓDIGO DA APLICAÇÃO ---

document.addEventListener('DOMContentLoaded', () => {

  // Verifica em qual página estamos
  if (document.getElementById('secao-destaques')) {
    // Estamos na index.html
    carregarDestaques();
    carregarTodosProdutos();
  } else if (document.getElementById('detalhe-produto-container')) {
    // Estamos na detalhe.html
    carregarDetalhesProduto();
  }

});

// --- FUNÇÕES DA INDEX.HTML ---

function carregarDestaques() {
  const container = document.getElementById('carrossel-inner-container');
  if (!container) return; // Segurança

  container.innerHTML = ''; // <-- CORREÇÃO 1: Limpa o "Carregando destaques..."

  // 1. Filtrar apenas os produtos com "destaque: true"
  const produtosDestaque = dados.produtos.filter(p => p.destaque === true);

  if (produtosDestaque.length === 0) return; // Não faz nada se não houver destaques

  // 2. Gerar o HTML para cada item do carrossel
  produtosDestaque.forEach((produto, index) => {
    const activeClass = (index === 0) ? 'active' : ''; // Só o primeiro item é 'active'

    const itemHtml = `
      <div class="carousel-item ${activeClass}">
        <img src="${produto.imagem_principal}" class="d-block w-100" alt="${produto.nome}">
        <div class="carousel-caption d-none d-md-block">
          <h5>${produto.nome}</h5>
          <p>${produto.descricao}</p>
          <a href="detalhe.html?id=${produto.id}" class="btn btn-primary">Ver Detalhes</a>
        </div>
      </div>
    `;
    container.innerHTML += itemHtml;
  });
}

function carregarTodosProdutos() {
  const container = document.getElementById('cards-container');
  if (!container) return;

  container.innerHTML = ''; // <-- CORREÇÃO 2: Limpa o "Carregando produtos..."

  // 1. Usar TODOS os produtos
  dados.produtos.forEach(produto => {

    // CORREÇÃO 3: O 'const cardHtml' duplicado e quebrado foi REMOVIDO daqui.

    // 2. Gerar o HTML do Card para cada produto
    const cardHtml = `
      <div class="col">
        <div class="card h-100 shadow-sm">
          <img src="${produto.imagem_principal}" class="card-img-top" alt="${produto.nome}">
          <div class="card-body">
            <h5 class="card-title">${produto.nome}</h5>
            <p class="card-text">${produto.descricao}</p>
          </div>
          <div class="card-footer">
            <a href="detalhe.html?id=${produto.id}" class="btn btn-outline-primary w-100">
              Ver Produto
            </a>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += cardHtml;
  });
}


// --- FUNÇÕES DA DETALHE.HTML ---

function carregarDetalhesProduto() {
  // 1. Pegar o 'id' da URL (Query String)
  const params = new URLSearchParams(window.location.search);
  const idProduto = params.get('id');

  if (!idProduto) {
    window.location.href = 'index.html'; // Se não tem ID, volta pra home
    return;
  }

  // 2. Encontrar o produto no JSON usando o ID
  // Usamos '==' pois o id da URL é string e o do JSON é número
  const produto = dados.produtos.find(p => p.id == idProduto);

  if (!produto) {
    alert('Produto não encontrado!');
    window.location.href = 'index.html'; // Se ID não existe, volta pra home
    return;
  }

  // Mudar o <title> da página para o nome do produto
  document.title = produto.nome + " - Detalhes";

  // 3. Preencher as informações gerais (Layout Personalizado)
  const infoContainer = document.getElementById('info-gerais');
  // Aqui está o "LAYOUT PERSONALIZADO" com 5+ itens
  infoContainer.innerHTML = `
    <div class="col-md-6">
      <img src="${produto.imagem_principal}" class="img-fluid rounded shadow-lg" alt="${produto.nome}">
    </div>
    <div class="col-md-6">
      <h2>${produto.nome}</h2>
      <h4 class="text-muted">${produto.marca}</h4>
      <h3 class="text-primary my-3">${produto.preco}</h3>
      <p class="lead">${produto.descricao}</p>
      <hr>
      <h5>Sobre o produto:</h5>
      <p>${produto.conteudo}</p>
      <button class="btn btn-success btn-lg mt-3">Comprar Agora</button>
    </div>
  `;

  // 4. Preencher a galeria de "Fotos Vinculadas"
  const galeriaContainer = document.getElementById('galeria-container');

  if (produto.galeria && produto.galeria.length > 0) {
    galeriaContainer.innerHTML = ''; // Limpa antes de adicionar
    produto.galeria.forEach(foto => {
      const fotoHtml = `
        <div class="col">
          <div class="card">
            <img src="${foto.imagem}" class="card-img-top" alt="${foto.titulo}">
            <div class="card-body">
              <p class="card-text text-center">${foto.titulo}</p>
            </div>
          </div>
        </div>
      `;
      galeriaContainer.innerHTML += fotoHtml;
    });
  } else {
    // Limpa o container e o título se não houver galeria
    const secaoGaleria = document.getElementById('fotos-vinculadas');
    if (secaoGaleria) {
      secaoGaleria.innerHTML = "<p class='text-center'>Não há fotos extras para este produto.</p>";
    }
  }
}
var apikey = {
  key: "705bd1ee-72ff-4bb4-ad80-19a31552ca04",
};

fetch(
  "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=" +
    apikey.key
)
  .then((response) => {
    if (!response.ok)
      throw new Error(
        "Erro ao executar a requisição, status" + response.status
      );
    return response.json();
  })
  .then((api) => {
    
    var paginaFinal = 10;

    function exibirDados(paginaFinal) {
      var texto = "";

      for (let i = 0; i < paginaFinal; i++) {
        let date = new Date(api.data[i].first_historical_data);

        texto =
          texto +
          `
          <div 
          class="m-1 p-3 rounded shadow-lg d-flex flex-wrap justify-content-center bg-dark bg-gradient text-white" 
          style="min-width: 250px; max-width: 250px;">
            <img class="rounded" src="img/coin.jpg" alt="coin" width="100" height="60">
            <div class="media-body w-100 text-center">
              <h5 class="mt-2">${api.data[i].name}</h5>
              <p>${api.data[i].symbol}</p>
              <small>Primeira data histórica</small></br>
              <small class="badge bg-warning text-dark">${date.toLocaleDateString()} às ${date.toLocaleTimeString('pt-BR')}</small>
            </div>
          </div>
        `;
      }

      document.getElementById("coins").innerHTML = texto;
    }

    exibirDados(paginaFinal);

    const exibirMais = document.getElementById("exibir-mais");
    const exibirMenos = document.getElementById("exibir-menos");
    
    exibirMais.addEventListener("click", () => {
      if (paginaFinal <= api.data.length) {
        paginaFinal += 10;
        exibirDados(paginaFinal)
      }
    });

    exibirMenos.addEventListener("click", () => {
      if (paginaFinal > 10) {
        paginaFinal -= 10;
        exibirDados(paginaFinal)
      }
    });

    let alert = document.getElementById("alert");
    alert.innerText = "Dados carregados com sucesso!";
    alert.classList.remove("d-none")
    alert.classList.add("d-block");
    alert.style = "  position: absolute; right: 10px; top: 10px;z-index: 1000;"
    alert.classList.add("alert")
    alert.classList.add("alert-success");

    setTimeout(() => {
      alert.classList.remove("d-block");
      alert.classList.add("d-none");
    }, 3000);

  })
  .catch((error) => {
    console.error(error.message);

    let alert = document.getElementById("alert");
    alert.innerText = "Ocorreu um erro ao carregar os dados.";
    alert.classList.remove("d-none")
    alert.classList.add("d-block");
    alert.style = "  position: absolute; right: 10px; top: 10px;z-index: 1000;"
    alert.classList.add("alert")
    alert.classList.add("alert-danger");

    setTimeout(() => {
      alert.classList.remove("d-block");
      alert.classList.add("d-none");
    }, 3000);
  });

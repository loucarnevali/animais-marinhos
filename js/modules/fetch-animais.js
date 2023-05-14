import AnimaNumeros from "./anima-numeros.js";

export default function fetchAnimais(url, target) {
  //CRIA A DIV CONTENDO INFORMAÇOES COM O TOTAL DE ANIMAIS
  function createAnimal(animal) {
    const div = document.createElement("div");
    div.classList.add("numero-animal");
    div.innerHTML = `<h3>${animal.specie}</h3> <span data-numero>${animal.total}</span>`;
    return div;
  }

  //PREENCHE CADA ANIMAL NO DOM
  const numerosGrid = document.querySelector(target);
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }

  //ANIMA OS NÚMEROS DE CADA ANIMAL
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros("[data-numero]", ".numeros", "ativo");
    animaNumeros.init();
  }

  //PUXA OS ANIMAIS ATRAVÉS DE UM ARQUIVO JASON E CRIA CADA ANIMAL UTILIZANDO createAnimal
  async function criarAnimais() {
    try {
      //FETCH, ESPERA A RESPOSTA E TRANSFORMA A RESPOSTA EM JSON
      const animaisResponse = await fetch(url);
      const animaisJSON = await animaisResponse.json();

      //APÓS A TRANSFORMACAO DE JSON, ATIVA AS FUNÇÕES PARA PREENCHER E ANIMAR OS NÚMEROS
      animaisJSON.forEach((animal) => preencherAnimais(animal));
      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }

  return criarAnimais();
}

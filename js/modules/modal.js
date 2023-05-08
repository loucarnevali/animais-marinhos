export default class Modal {
  constructor(botaoAbrir, botaoFechar, containerModal) {
    this.botaoAbrir = document.querySelector(botaoAbrir);
    this.botaoFechar = document.querySelector(botaoFechar);
    this.containerModal = document.querySelector(containerModal);

    //BIND THIS AO CALLBACK PARA FAZER REFERENCIA AO OBJETO DA CLASS
    this.eventToggleModal = this.eventToggleModal.bind(this);
    this.cliqueForaModal = this.cliqueForaModal.bind(this);
  }

  //ABRE OU FECHA O MODAL
  toggleModal() {
    this.containerModal.classList.toggle("ativo");
  }

  //ADICIONA O EVENTO DE TOGGLE AO MODAL
  eventToggleModal(event) {
    event.preventDefault();
    this.toggleModal();
  }

  //FECHA O MODAL AO CLICAR DO LADO DE FORA
  cliqueForaModal(event) {
    if (event.target === this.containerModal) {
      this.toggleModal(event);
    }
  }

  //ADICIONA OS EVENTOS AOS ELEMENTOS DO MODAL
  addModalEvent() {
    this.botaoAbrir.addEventListener("click", this.eventToggleModal);
    this.botaoFechar.addEventListener("click", this.eventToggleModal);
    this.containerModal.addEventListener("click", this.cliqueForaModal);
  }

  init() {
    if (this.botaoAbrir && this.botaoFechar && this.containerModal) {
      this.addModalEvent();
    }
    return this;
  }
}

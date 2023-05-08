export default class AnimaNumeros {
  constructor(numeros, observerTarget, observerClass) {
    this.numeros = document.querySelectorAll(numeros);
    this.observerTarget = document.querySelector(observerTarget);
    this.observerClass = observerClass;

    //BIND O THIS DO OBJETO AO CALLBACK DA MUTAÇÃO
    this.handleMutation = this.handleMutation.bind(this);
  }

  //RECEBE UM ELEMENTO DO DOM, COM NUMERO EM SEU TEXTO
  //INCREMENTA A PARTIR DE 0 ATÉ O NUMERO FINAL
  static incrementarNumero(numero) {
    const total = +numero.innerText;
    const incremento = Math.floor(total / 100);

    let start = 0;
    const timer = setInterval(() => {
      start = start + incremento;
      numero.innerText = start;
      if (start > total) {
        numero.innerText = total;
        clearInterval(timer);
      }
    }, 30 * Math.random());
  }

  //ATIVA INCREMENTAR NUMERO PARA CADA NUMERO DO DOM
  animaNumeros() {
    this.numeros.forEach((numero) =>
      this.constructor.incrementarNumero(numero)
    );
  }

  //FUNÇÃO QUE OCORRE QUANDO A MUTAÇÃO OCORRER
  handleMutation(mutation) {
    if (mutation[0].target.classList.contains(this.observerClass)) {
      this.observer.disconnect();
      this.animaNumeros();
    }
  }

  //ADICIONA O MUTATIONOBSERVER PARA VERIFICAR QUANDO A CLASSE ATIVO É ADD AO ELEMENTO TARGET
  addMutationObserver() {
    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.observerTarget, { attributes: true });
  }

  init() {
    if (this.numeros.length && this.observerTarget) {
      this.addMutationObserver();
    }
    return this;
  }
}

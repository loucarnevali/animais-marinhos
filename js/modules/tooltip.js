export default class Tooltip {
  constructor(tooltips) {
    this.tooltips = document.querySelectorAll(tooltips);

    //BIND DO OBJETO DA CLASS AOS CALLBACKS
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  //MOVE A TOOLTIP COM BASE EM SEUS ESTILOS DE ACORDO COM A POSIÇÃO DO MOUSE
  onMouseMove(event) {
    this.tooltipBox.style.top = event.pageY + 20 + "px";
    if (event.pageX + 240 > window.innerWidth) {
      this.tooltipBox.style.left = event.pageX - 190 + "px";
    } else {
      this.tooltipBox.style.left = event.pageX + 20 + "px";
    }
  }

  //REMOVE A TOOTIP E OS EVENTOS DE MOUSEMOVE E MOUSELEAVE
  onMouseLeave(event) {
    this.tooltipBox.remove();
    event.currentTarget.removeEventListener("mouseleave", this.onMouseLeave);
    event.currentTarget.removeEventListener("mousemove", this.onMouseMove);
  }

  //CRIA A TOOLTIP BOX E COLOCA NO BODY
  criarTooltipBox(element) {
    const tooltipBox = document.createElement("div");
    const text = element.getAttribute("aria-label");
    tooltipBox.classList.add("tooltip");
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    this.tooltipBox = tooltipBox;
  }

  //CRIA A TOOLTIP E ADD OS EVENTOS DE MOUSEMOVE E MOUSE LEAVE AO TARGET
  onMouseOver() {
    //CRIA A TOOLTIPBOX E COLOCA EM UMA PROPRIEDADE
    this.criarTooltipBox(event.currentTarget);

    event.currentTarget.addEventListener("mousemove", this.onMouseMove);
    event.currentTarget.addEventListener("mouseleave", this.onMouseLeave);
  }

  //ADD OS EVENTOS DE MOUSEOVER A CADA TOOLTIP
  addTootipsEvent() {
    this.tooltips.forEach((item) => {
      item.addEventListener("mouseover", this.onMouseOver);
    });
  }

  init() {
    if (this.tooltips.length) {
      this.addTootipsEvent();
    }
    return this;
  }
}

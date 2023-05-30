import debounce from "./debounce.js";
export default class ScrollAnima {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
    this.windowMetade = window.innerHeight * 0.7;

    this.checkDistance = debounce(this.checkDistance.bind(this), 50);
  }

  //PEGA A DISTANCIA DE CADA ITEM EM RELAÇÃO AO TOPO DO SITE
  getDistance() {
    this.distance = [...this.sections].map((section) => {
      const offset = section.offsetTop;
      return {
        element: section,
        offset: Math.floor(offset - this.windowMetade),
      };
    });
  }

  //VERIFICA A DISTANCIA EM CADA OBJETO EM RELAÇÃO AO SCROLL DO SITE
  checkDistance() {
    this.distance.forEach((item) => {
      if (window.pageYOffset > item.offset) {
        item.element.classList.add("ativo");
      } else if (item.element.classList.contains("ativo")) {
        item.element.classList.remove("ativo");
      }
    });
  }

  init() {
    if (this.sections.length) {
      this.getDistance();
      this.checkDistance();
      window.addEventListener("scroll", this.checkDistance);
    }
    return this;
  }

  //REMOVE O EVENT DE SCROLL
  stop() {
    window.removeEventListener("scroll", this.checkDistance);
  }
}

  import Element from "./Element.js"

export default class Bullet extends Element {
  constructor(width, height, x, y, color, spdX, spdY) {
    super(width, height, x, y, color)
    this.setSpdx = spdX
    this.setSpdy = spdY
  }

  get getSpdx() {
    return this.spdX
  }

  set setSpdx(spdX) { 
    if(typeof spdX != "number") {
      throw new NumberFormatException("Espera um number como parametro")
    }
    this.spdX = spdX
  }

  get getSpdy() {
    return this.spdY
  }

  set setSpdy(spdY) {
    if(typeof spdY != "number") {
      throw new ObjectFormatException("Espera um number como parametro")
    }
    this.spdY = spdY
  }
}

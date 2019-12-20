import Element from "./Element.js"

export default class Player extends Element {
  constructor(width, height, x, y, color, ang) {
    super(width, height, x, y, color)
    this.setAng = ang
  }

  get getAng() {
    return this.ang
  }

  set setAng(ang) {
    this.ang = ang
  }

}
export default class Element {
	constructor(width, height, x, y, color) {
		this.setWidth = width
		this.setHeight = height
		this.setX = x
		this.setY = y
		this.color = color
	}

	get getWidth() {
		return this.width
	}

	set setWidth(width) {
		if(typeof width != "number") {
      throw new NumberFormatException("Espera um number como parametro")
		}

		this.width = width
	}

	get getHeight() {
		return this.height
	}

	set setHeight(height) {
		if(typeof height != "number") {
      throw new NumberFormatException("Espera um number como parametro")
		}
		
		this.height = height
	}

	get getX() {
		return this.x
	}

	set setX(x) {
		if(typeof x != "number") {
      throw new NumberFormatException("Espera um number como parametro")
		}
		
		this.x = x
	}

	get getY() {
		return this.y
	}

	set setY(y) {
		if(typeof y != "number") {
      throw new NumberFormatException("Espera um number como parametro")
		}
		
		this.y = y
	}


	get getColor() {
		return this.color
	}

	set setColor(color) {
		if(typeof color != "number") {
      throw new NumberFormatException("Espera um number como parametro")
    }
		this.color = color
	}
}
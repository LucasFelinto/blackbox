export default class World {
  players = []

  constructor(width, height) {
    this.setWidth = width
    this.setHeight = height
  }

  get geyPlayers() {
    return this.players
  }

  set setPlayers(players) {
    this.players = players
  }

  addPlayer(player) {}
  
  get getWidth() {
    return this.width
  }

  set setWidth(width) {
    this.width = width
  }

  get getHeight() {
    return this.height
  }

  set setHeight(height) {
    this.height = height
  }

}

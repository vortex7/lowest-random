class PlayerFriends extends AnimatedAssembly {
  constructor(options) {
    super(options)
  }

  render() {
    // Player Friends Cell
    new Cell({
      name: `${this.options.name}Cell`,
      parentComponent: this.options.parentComponent,
      cssClasses: ["l4", "m12", "s12", "app-tall"]
    })
  }
}

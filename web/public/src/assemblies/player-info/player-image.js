class PlayerImage extends AnimatedAssembly {
  constructor(options) {
    super(options)
  }

  render() {
    // Player Image Cell
    new Cell({
      name: `${this.options.name}Cell`,
      parentComponent: this.options.parentComponent,
      cssClasses: ["l2", "m12", "s12", "center-align"]
    })

    // Player Image
    new Image({
      name: this.options.name,
      image: this.options.image,
      parentComponent: app.view.components[`${this.options.name}Cell`],
      cssClasses: ["circle", "responsive-image"]
    })
  }
}

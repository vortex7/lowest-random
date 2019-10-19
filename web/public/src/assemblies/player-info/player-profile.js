class PlayerProfile extends AnimatedAssembly {
  constructor(options) {
    super(options)
  }

  render() {
    // Player Profile Cell
    let cssClasses = ["l2", "m12", "s12"]
    if(this.options.cssClasses) {
      cssClasses.push(...this.options.cssClasses)
    }

    new Cell({
      name: `${this.options.name}Cell`,
      parentComponent: this.options.parentComponent,
      cssClasses: cssClasses
    })

    // Player Profile
    new Section({
      name: this.options.name,
      parentComponent: app.view.components[`${this.options.name}Cell`],
    })

    this.options.items.forEach((item) => {
      let cssClasses = [app.config.colors.text.color]
      if(item.cssClasses) {
        cssClasses.push(...item.cssClasses)
      }

      // Text Item
      new Text({
        name: item.name,
        text: item.text,
        parentComponent: app.view.components[this.options.name],
        cssClasses: cssClasses
      })
    })
  }
}

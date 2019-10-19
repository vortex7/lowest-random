class ButtonGroup extends AnimatedAssembly {
  constructor(options) {
    super(options)
  }

  render() {
    // ButtonGroup Cell
    let cssClasses = ["s12", "center-align"]
    if(this.options.cssClasses) {
      cssClasses.push(...this.options.cssClasses)
    }

    new Cell({
      name: `${this.options.name}Cell`,
      parentComponent: this.options.parentComponent,
      cssClasses: cssClasses
    })

    // ButtonGroup
    this.options.items.forEach((item) => {
      let cssClasses = [
        "waves-effect",
        "waves-light",
        app.config.colors.text.color,
        app.config.colors.button.background.color,
        app.config.colors.button.background.brightness,
      ]
      if(item.cssClasses) {
        cssClasses.push(...item.cssClasses)
      }

      // Button
      new Button({
        name: item.name,
        title: item.title,
        onclick: item.onclick,
        parentComponent: app.view.components[`${this.options.name}Cell`],
        cssClasses: cssClasses
      })
    })
  }
}

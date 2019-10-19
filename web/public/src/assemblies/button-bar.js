class ButtonBar extends AnimatedAssembly {
  constructor(options) {
    super(options)
  }

  render() {
    // Divider
    new Divider({
      name: `${this.options.name}Divider`,
      parentComponent: this.options.parentComponent,
      cssClasses: ["app-margin-top"],
    })

    // Button Bar
    let buttonBar = new Row({
      name: this.options.name, 
      parentComponent: this.options.parentComponent,
    })

    // ButtonGroup Section
    new ButtonGroup({
      name: `${this.options.name}ButtonGroup`, 
      parentComponent: app.view.components[this.options.name],
      items: [
        {
          name: "unit",
          title: "unit",
          onclick: () => {
            app.switchView("LeaderBoardView")
          }
        }
      ],
    })
  }
}

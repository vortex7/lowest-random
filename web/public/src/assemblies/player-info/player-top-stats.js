class PlayerTopStats extends AnimatedAssembly {
  constructor(options) {
    super(options)
  }

  render() {
    this.options.items.forEach((item) => {
      // Stat Cell
      new Cell({
        name: `${item.name}Cell`,
        parentComponent: this.options.parentComponent,
        cssClasses: ["l2", "m6", "s12"]
      })

      // Player Stat Card
      new StatCard({
        name: item.name,
        parentComponent: app.view.components[`${item.name}Cell`],
        stat: item
      })
    })
  }

}

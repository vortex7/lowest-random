class PlayerDetail extends AnimatedAssembly {
  constructor(options) {
    super(options)
  }

  render() {
    // Divider
    new Divider({
      name: `${this.options.name}Divider`,
      parentComponent: this.options.parentComponent,
    })

    // Player Detail
    let playerDetail = new Row({
      name: this.options.name, 
      parentComponent: this.options.parentComponent,
    })

    // Player Tabs Section
    new PlayerTabs({
      name: `${this.options.name}Tabs`, 
      parentComponent: app.view.components[this.options.name],
      player: this.options.player,
    })

    // Player Tables Section
    new PlayerFriends({
      name: `${this.options.name}Friends`, 
      parentComponent: app.view.components[this.options.name],
      player: this.options.player,
    })
  }
}

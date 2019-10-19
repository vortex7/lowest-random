class PlayerInfo extends AnimatedAssembly {
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

    // Player Info
    let playerInfo = new Row({
      name: this.options.name, 
      parentComponent: this.options.parentComponent,
    })

    // Player Image Section
    new PlayerImage({
      name: `${this.options.name}Image`, 
      parentComponent: app.view.components[this.options.name],
      image: this.options.player.image,
    })

    // Player Profile Section
    new PlayerProfile({
      name: `${this.options.name}Profile`, 
      parentComponent: app.view.components[this.options.name],
      items: [
        {
          name: "playerName",
          text: this.options.player.name,
          cssClasses: ["app-title"],
        },
        {
          name: "playerLevel",
          text: `LVL: ${this.options.player.stats.highestCharacterLevel.displayValue}`,
        },
      ],
    })

    // Player Top Stats Section
    new PlayerTopStats({
      name: `${this.options.name}TopStats`,
      parentComponent: app.view.components[this.options.name],
      items: [
        {
          name: "killDeathsRatio",
          title: "K/D",
          value: _.round(this.options.player.stats.killsDeathsRatio.value, 2)
        },
        {
          name: "winLossRatio",
          title: "W/L",
          value: _.round(this.options.player.stats.winLossRatio.value, 2)
        },
        {
          name: "assists",
          title: "ASST",
          value: this.options.player.stats.assists.displayValue
        },
        {
          name: "precisionKills",
          title: "PK",
          value: this.options.player.stats.precisionKills.displayValue
        },
      ]
    })
  }
}

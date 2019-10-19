class PlayerTabs extends AnimatedAssembly {
  constructor(options) {
    super(options)
  }

  render() {
    // Player Tabs Cell
    new Cell({
      name: `${this.options.name}Cell`,
      parentComponent: this.options.parentComponent,
      cssClasses: ["l8", "m12", "s12", "app-tall"]
    })

    // Player Tabs
    new Tabs({
      name: this.options.name,
      parentComponent: app.view.components[`${this.options.name}Cell`],
      items: [
        {
          name: "stats",
          title: "STATS"
        },
        {
          name: "notes",
          title: "NOTES"
        },
        {
          name: "video",
          title: "VIDEO"
        },
        {
          name: "workload",
          title: "WORKLOAD"
        },
      ],
    })

  }
}

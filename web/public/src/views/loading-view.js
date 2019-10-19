class LoadingView extends AnimatedView {
  constructor(options) {
    super(options)
  }

  render() {
    // NavBar
    new NavBar({
      name: "navBar",
      parentComponent: this.options.parentComponent,
    })

    // Progress
    new Progress({
      name: "progress",
      parentComponent: this.options.parentComponent,
    })
  }
}

class HomeView extends AnimatedView {
  constructor(options) {
    super(options)
  }

  render() {
    // NavBar
    new NavBar({
      name: "navBar",
      parentComponent: this.options.parentComponent,
    })
  }
}

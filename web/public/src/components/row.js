class Row extends AnimatedComponent {
  constructor(options) {
    super(options)
  }

  render() {
    let element = document.createElement("div")
    element.classList.add("row")
    element.classList.add(app.config.colors.background.color)
    element.classList.add(app.config.colors.background.brightness)

    super.render(element)
  }
}

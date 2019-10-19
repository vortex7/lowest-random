class Divider extends AnimatedComponent {
  constructor(options) {
    super(options)
  }

  render() {
    let element = document.createElement("div")
    element.classList.add("divider")

    super.render(element)
  }
}

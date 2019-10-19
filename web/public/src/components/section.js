class Section extends AnimatedComponent {
  constructor(options) {
    super(options)
  }

  render() {
    let element = document.createElement("div")
    element.classList.add("section")

    super.render(element)
  }
}

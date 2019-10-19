class Button extends AnimatedComponent {
  constructor(options) {
    super(options)
  }

  render() {
    let element = document.createElement("a")
    element.classList.add("btn-small")
    element.append(this.options.title)

    element.onclick = this.options.onclick

    super.render(element)
  }
}

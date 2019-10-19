class Text extends AnimatedComponent {
  constructor(options) {
    super(options)
  }

  render() {
    let element = document.createElement("div")
    element.append(this.options.text)

    super.render(element)
  }
}

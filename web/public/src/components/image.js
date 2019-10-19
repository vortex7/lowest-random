class Image extends AnimatedComponent {
  constructor(options) {
    super(options)
  }

  render() {
    let element = document.createElement("img")
    element.src = this.options.image

    super.render(element)
  }
}

class AnimatedComponent {
  constructor(options) {
    this.options = options
    this.components = {}
    this.content = null

    if(!this.options.cssClasses) {
      this.options.cssClasses = []
    }

    this.render()
  }

  render(element) {
    this.content = element

    this.options.cssClasses.forEach((cssClass) => {
      this.content.classList.add(cssClass)
    })

    this.options.parentComponent.content.append(this.content)

    app.view.registerComponent(this.options.name, this)
  }

  animate() {
    Object.keys(this.components).forEach((key) => {
      let component = this.components[key]
      component.animate()
    })
  }
}

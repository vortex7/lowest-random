class AnimatedView {
  constructor(options) {
    this.options = options
    this.content = null
    this.components = []
  }

  registerComponent(name, component) {
    this.components[name] = component
  }

  animate() {
    Object.keys(this.components).forEach((key) => {
      let component = this.components[key]
      component.animate()
    })
  }
}

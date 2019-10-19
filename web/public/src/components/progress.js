class Progress extends AnimatedComponent {
  constructor(options) {
    super(options)
  }

  render() {
    let element = document.createElement("div")
    element.classList.add("progress")

    let progressType = document.createElement("div")
    progressType.classList.add("indeterminate")
    progressType.classList.add("app-display-none")

    element.append(progressType)

    super.render(element)
  }
}

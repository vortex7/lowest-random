class StatCard extends AnimatedComponent {
  constructor(options) {
    super(options)
  }

  render() {
    let element = document.createElement("div")
    element.classList.add("card")
    element.classList.add("center-align")
    element.classList.add(app.config.colors.background.color)
    element.classList.add(app.config.colors.background.brightness)

    let cardTitle = document.createElement("span")
    cardTitle.classList.add("card-title")
    element.classList.add(app.config.colors.text.color)
    cardTitle.append(this.options.stat.title)

    element.append(cardTitle)

    let cardContent = document.createElement("div")
    cardContent.classList.add("card-content")
    cardContent.classList.add(app.config.colors.text.color)

    let cardText = document.createElement("div")
    cardText.append(this.options.stat.value)

    cardContent.append(cardText)

    element.append(cardContent)

    super.render(element)
  }
}

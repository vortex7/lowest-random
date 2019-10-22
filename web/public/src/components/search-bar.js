class SearchBar extends AnimatedComponent {
  constructor(options) {
    super(options)
  }

  render() {
    let element = document.createElement("div")
    element.classList.add("input-field")
    element.classList.add(app.config.colors.background.color)
    element.classList.add(app.config.colors.background.brightness)

    let elementInput = document.createElement("input")
    elementInput.classList.add(app.config.colors.text.color)
    elementInput.placeholder = this.options.placeholder
    elementInput.type = "text"
    elementInput.id = this.options.name
    elementInput.onkeyup = this.options.onkeyup

    element.append(elementInput)

    let elementLabel = document.createElement("label")
    elementLabel.for = this.options.name
    elementLabel.append("Search")

    element.append(elementLabel)

    super.render(element)
  }
}

/*
<div class="input-field col s6">
  <input placeholder="Placeholder" id="first_name" type="text" class="validate">
  <label for="first_name">First Name</label>
</div>
*/

class Modal extends AnimatedComponent {
  constructor(options) {
    super(options)
  }

  render() {
    let element = document.createElement("div")
    element.classList.add("modal")
    element.classList.add(app.config.colors.background.color)
    element.classList.add(app.config.colors.background.brightness)
    element.classList.add(app.config.colors.text.color)
    element.id = this.options.name

    let modalContent = document.createElement("div")
    modalContent.classList.add("modal-content")

    let modalHeader = document.createElement("h3")
    modalHeader.classList.add("header")
    modalHeader.append(this.options.title)

    modalContent.append(modalHeader)

    let collection = document.createElement("ul")
    collection.classList.add("collection")

    this.options.items.forEach((item) => {
      let collectionItem = document.createElement("li")
      collectionItem.classList.add(app.config.colors.background.color)
      collectionItem.classList.add(app.config.colors.background.brightness)
      collectionItem.classList.add(app.config.colors.text.color)
      collectionItem.classList.add("collection-item")
      collectionItem.classList.add("avatar")

      // Image
      let image = document.createElement("img")
      image.classList.add("circle")
      image.src = item.image

      collectionItem.append(image)

      // Title
      let title = document.createElement("span")
      title.classList.add("title")
      title.append(item.name)

      collectionItem.append(title)

      // Description
      let description = document.createElement("p")
      description.append(item.description)

      collectionItem.append(description)

      collectionItem.onclick = item.onclick

      collection.append(collectionItem)
    })

    modalContent.append(collection)

    element.append(modalContent)
    super.render(element)
  }

  animate() {
    var elems = document.querySelectorAll(".modal")
    var instances = M.Modal.init(elems)
    this.modalInstance = instances[0]

    super.animate()
  }
}

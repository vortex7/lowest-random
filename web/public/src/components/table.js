class Table extends AnimatedComponent {
  constructor(options) {
    super(options)
  }

  render() {
    let element = document.createElement("table")
    element.classList.add(app.config.colors.background.color)
    element.classList.add(app.config.colors.background.brightness)
    element.classList.add(app.config.colors.text.color)

    // Table Head
    let tableHead = document.createElement("thead")

    let tableHeadRow = document.createElement("tr")
    this.options.columns.forEach((column) => {
      let tableHeadItem = document.createElement("th")
      tableHeadItem.append(column.title)

      tableHeadRow.append(tableHeadItem)
    })

    tableHead.append(tableHeadRow)

    element.append(tableHead)

    // Table Body
    let tableBody = document.createElement("tbody")

    this.options.items.forEach((item) => {
      let tableBodyRow = document.createElement("tr")
      tableBodyRow.style.cursor = "pointer"

      this.options.columns.forEach((column) => {
        let tableItem = document.createElement("td")
        tableItem.onclick = item.onclick

        if(column.type === "image") {
          let image = document.createElement("img")
          image.classList.add("circle")
          image.style.height = "40px"

          image.src = item.image
          tableItem.append(image)
        }
        else {
          tableItem.append(item[column.name])
        }

        tableBodyRow.append(tableItem)
      })

      tableBody.append(tableBodyRow)
    })

    element.append(tableBody)

    super.render(element)
  }
}

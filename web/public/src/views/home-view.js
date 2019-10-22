class HomeView extends AnimatedView {
  constructor(options) {
    super(options)
  }

  render() {
    // NavBar
    new NavBar({
      name: "navBar",
      parentComponent: this.options.parentComponent,
    })

    new Divider({
      name: `${this.options.name}Divider`,
      parentComponent: this.options.parentComponent,
      cssClasses: ["app-margin-top"],
    })

    new Cell({
      name: "SearchBoxCell",
      parentComponent: this.options.parentComponent
    })

    new Cell({
      name: "SearchResults",
      parentComponent: this.options.parentComponent
    })

    new SearchBar({
      name: "search",
      placeholder: "Enter search terms",
      onkeyup: () => {
        let searchInput = document.getElementById("searchValue")

        var request = new XMLHttpRequest();
        request.open("POST", '/lowest-random/api/search/member', true);

        request.setRequestHeader("content-type", "application/json");
        request.setRequestHeader("accept", "application/json");

        request.onreadystatechange = (result) => {
          if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            // Request finished. Do processing here.
            let searchResultsCell = app.view.components["SearchResults"]
            searchResultsCell.content.innerHTML = ""

            let data = JSON.parse(request.responseText)

            let items = []
            data.forEach((item) => {
              items.push({
                name: item._source.name
              })
            })

            if(items && items.length) {
              // Table
              new Table({
                name: `${this.options.name}Table`, 
                title: "UNIT",
                parentComponent: app.view.components["SearchResults"],
                columns: [
                  {
                    name: "name",
                    title: "Name",
                    type: "text",
                  }
                ],
                items: items
              })
            }
          }
        }

        let searchOptions = {
          query: {
            match: { name: searchInput.value }
          }
        }

        request.send(JSON.stringify(searchOptions))
      },
      parentComponent: app.view.components["SearchBoxCell"]
    })


  }
}

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

    new Cell({
      name: "SearchBoxCell",
      parentComponent: this.options.parentComponent
    })

    new SearchBar({
      name: "search",
      placeholder: "Enter search terms",
      onkeyup: () => {
        let searchInput = document.getElementById("search")
        console.log(searchInput.value)

        var request = new XMLHttpRequest();
        request.open("POST", '/lowest-random/api/search/member', true);

        request.setRequestHeader("Content-Type", "application/application/json");

        request.onreadystatechange = (result) => {
          if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            // Request finished. Do processing here.
            let data = JSON.parse(request.responseText)
            console.log(data)
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

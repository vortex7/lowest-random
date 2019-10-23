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

    new Row({
      name: "SearchBoxRow",
      parentComponent: this.options.parentComponent
    })

    new Cell({
      name: "SearchBoxCell",
      parentComponent: app.view.components["SearchBoxRow"],
      cssClasses: ["s12"]
    })

    new SearchBar({
      name: "search",
      placeholder: "Enter search terms",
      parentComponent: app.view.components["SearchBoxCell"],
      onkeyup: () => {
        this.search()
      }
    })

    new Row({
      name: "SearchResultsRow",
      parentComponent: this.options.parentComponent
    })

    new Cell({
      name: "SearchResultsElastic",
      parentComponent: app.view.components["SearchResultsRow"],
      cssClasses: ["app-margin-top", "s6"],
    })

    new Cell({
      name: "SearchResultsSolr",
      parentComponent: app.view.components["SearchResultsRow"],
      cssClasses: ["app-margin-top", "s6"],
    })

  }

  search() {
    this.elasticSearch()
    this.solrSearch()
  }

  elasticSearch() {
    let searchInput = document.getElementById("searchValue")

    let request = new XMLHttpRequest()
    request.open("POST", '/lowest-random/api/elasticsearch/members', true)

    request.setRequestHeader("content-type", "application/json")
    request.setRequestHeader("accept", "application/json")

    request.onreadystatechange = (result) => {
      if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        // Request finished. Do processing here.
        let searchResultsCell = app.view.components["SearchResultsElastic"]
        searchResultsCell.content.innerHTML = ""

        let data = JSON.parse(request.responseText)

        let items = []
        data.forEach((item) => {
          items.push({
            name: item._source.name
          })
        })

        if(items && items.length > 0) {
          // Table
          new Table({
            name: `${this.options.name}Table`, 
            title: "MEMBERS",
            parentComponent: app.view.components["SearchResultsElastic"],
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
      "query": {
        "simple_query_string" : {
          "fields" : ["name"],
          "query" : `${searchInput.value}*`,
          "default_operator": "and"
        }
      }
    }

    /*
    let searchOptions = {
      query: {
        match: { name: searchInput.value }
      }
    }
    */

    request.send(JSON.stringify(searchOptions))
  }

  solrSearch() {
    let searchInput = document.getElementById("searchValue")

    let request = new XMLHttpRequest()
    request.open("POST", '/lowest-random/api/solrsearch/members', true)

    request.setRequestHeader("content-type", "application/json")
    request.setRequestHeader("accept", "application/json")

    request.onreadystatechange = (result) => {
      if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        // Request finished. Do processing here.
        let searchResultsCell = app.view.components["SearchResultsSolr"]
        searchResultsCell.content.innerHTML = ""

        let data = JSON.parse(request.responseText)

        let items = []
        data.forEach((item) => {
          items.push({
            name: item.name[0]
          })
        })

        if(items && items.length > 0) {
          // Table
          new Table({
            name: `${this.options.name}Table`, 
            title: "MEMBERS",
            parentComponent: app.view.components["SearchResultsSolr"],
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
      query: `name:${searchInput.value}*`
    }

    /*
    let searchOptions = {
      query: {
        match: { name: searchInput.value }
      }
    }
    */

    request.send(JSON.stringify(searchOptions))
  }
}

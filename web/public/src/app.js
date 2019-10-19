class App {
  constructor() {
    console.log("App is here!")
    this.config = new AppConfig()
    this.state = {}
  }

  async switchView(name) {
    this.showLoadingView()
    let content = document.getElementById("content")

    app.previousView = app.currentView
    app.currentView = name
    window.location.hash = `#${name}`

    let parentComponent = { content: content }
    let view = eval(`new ${name}({ parentComponent: parentComponent })`)

    app.view = view

    if(view.getData) {
      view.data = await view.getData()
    }

    content.innerHTML = ""

    view.render()
    window.scrollTo(0,0)
    view.animate()
  }

  showLoadingView() {
    let content = document.getElementById("content")

    let parentComponent = { content: content }
    let view = new LoadingView({ parentComponent: parentComponent })

    app.view = view

    content.innerHTML = ""

    view.render()
    window.scrollTo(0,0)
  }
}

let app = new App()

app.switchView("HomeView")

// Detect hash change
window.onhashchange = () => {
  let locationName = location.hash.replace("#", "")
  if(locationName && app.currentView != locationName) {
    app.switchView(locationName)
  }
}


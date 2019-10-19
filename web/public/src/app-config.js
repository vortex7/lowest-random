class AppConfig {
  constructor() {
    this.defaultView = "HomeView"

    this.baseUrl = "https://lockalpha.io/lowest-random"

    this.logo = {
      icon: "location_searching",
      title: "lowest-random"
    }

    this.sideNav = {
      close: {
        icon: "close",
        title: "Close"
      }
    }

    this.colors = {
      background: {
        color: "grey",
        brightness: "darken-4",
      },
      text: {
        color: "white-text"
      },
      button: {
        background: {
          color: "blue-grey",
          brightness: "darken-1",
        }
      }
    }

    this.pages = [
      {
        title: "Home",
        view: "HomeView"
      }
    ]
  }
}

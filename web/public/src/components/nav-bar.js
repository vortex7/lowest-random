class NavBar extends AnimatedComponent {
  constructor(options) {
    super(options)
  }

  render() {
    // Nav
    let element = document.createElement("nav")

    // NavBar
    let navBar = document.createElement("div")
    navBar.classList.add("nav-wrapper")
    navBar.classList.add(app.config.colors.background.color)
    navBar.classList.add(app.config.colors.background.brightness)

    // Logo
    let logo = document.createElement("a")
    logo.classList.add("brand-logo")

    logo.href = `#${app.config.defaultView}`

    let logoIcon = document.createElement("i")
    logoIcon.classList.add("material-icons")
    logoIcon.append(app.config.logo.icon)
    logoIcon.style.marginLeft = "12px"

    logo.append(logoIcon)
    logo.append(app.config.logo.title)

    navBar.append(logo)

    // SideNav Trigger
    let sideNavTrigger = document.createElement("a")
    sideNavTrigger.classList.add("sidenav-trigger")
    sideNavTrigger.setAttribute("data-target", "side-nav-menu")
    sideNavTrigger.href = `#${app.config.defaultView}`

    let menuIcon = document.createElement("i")
    menuIcon.classList.add("material-icons")
    menuIcon.append("menu")

    sideNavTrigger.append(menuIcon)

    navBar.append(sideNavTrigger)

    // Menu
    let menu = document.createElement("ul")
    menu.classList.add("right")
    menu.classList.add("hide-on-med-and-down")

    app.config.pages.forEach((page) => {
      let menuItem = document.createElement("li")
      let menuLink = document.createElement("a")
      menuLink.href = `#${page.view}`
      menuLink.append(page.title)

      menuItem.append(menuLink)

      menu.append(menuItem)
    })

    navBar.append(menu)

    // SideNav
    let sideNav = document.createElement("ul")
    sideNav.classList.add("sidenav")
    sideNav.classList.add(app.config.colors.background.color)
    sideNav.classList.add(app.config.colors.background.brightness)
    sideNav.id = "side-nav-menu"

    let sideNavHeader = document.createElement("li")
    let sideNavHeaderLink = document.createElement("a")
    sideNavHeaderLink.classList.add(app.config.colors.text.color)
    sideNavHeaderLink.href = "#"
    sideNavHeaderLink.onclick = (e) => {
      this.sideNavInstance.close()
    }

    let sideNavHeaderIcon = document.createElement("i")
    sideNavHeaderIcon.classList.add("material-icons")
    sideNavHeaderIcon.classList.add(app.config.colors.text.color)
    sideNavHeaderIcon.append(app.config.sideNav.close.icon)

    sideNavHeaderLink.append(sideNavHeaderIcon)
    sideNavHeaderLink.append(app.config.sideNav.close.title)

    sideNavHeader.append(sideNavHeaderLink)

    sideNav.append(sideNavHeader)

    app.config.pages.forEach((page) => {
      let sideNavItem = document.createElement("li")
      let sideNavLink = document.createElement("a")
      sideNavLink.classList.add(app.config.colors.text.color)
      sideNavLink.href = `#${page.view}`
      sideNavLink.append(page.title)

      sideNavLink.onclick = (e) => {
        this.sideNavInstance.close()
      }

      sideNavItem.append(sideNavLink)

      sideNav.append(sideNavItem)
    })

    navBar.append(sideNav)

    element.append(navBar)

    super.render(element)
  }

  animate() {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems);
    this.sideNavInstance = instances[0]

    super.animate()
  }
}

class Tabs extends AnimatedComponent {
  constructor(options) {
    super(options)
  }

  render() {
    let element = document.createElement("div")
    element.classList.add("row")

    let tabContainer = document.createElement("div")
    tabContainer.classList.add("col")
    tabContainer.classList.add("s12")

    let tabList = document.createElement("ul")
    tabList.classList.add("tabs")

    this.options.item.forEach((item) => {
      let tabItem = document.createElement("li")
      tabItem.classList.add("tab")
      tabItem.classList.add("col")
      tabItem.classList.add("s3")

      let tabLink = document.createElement("a")
      tabLink.href = `#${item.name}`

      tabLink.append(item.title)

      tabList.append(tabItem)
    })
	
    tabContainer.append(tabList)
    element.append(tabContainer)

    super.render(element)
  }
/*
  <div class="row">
    <div class="col s12">
      <ul class="tabs">
        <li class="tab col s3"><a href="#test1">Test 1</a></li>
        <li class="tab col s3"><a class="active" href="#test2">Test 2</a></li>
        <li class="tab col s3 disabled"><a href="#test3">Disabled Tab</a></li>
        <li class="tab col s3"><a href="#test4">Test 4</a></li>
      </ul>
    </div>
    <div id="test1" class="col s12">Test 1</div>
    <div id="test2" class="col s12">Test 2</div>
    <div id="test3" class="col s12">Test 3</div>
    <div id="test4" class="col s12">Test 4</div>
  </div>
*/
}

const bodyParser = require("body-parser")
const cors = require("cors")
const express = require("express")
const fs = require('fs')
const { Client } = require("@elastic/elasticsearch")

// Read config into env
const config = require("../config.json")
const nodeEnvironment = process.env.NODE_ENV || "dev"
const env = config[nodeEnvironment]
process.env = Object.assign(process.env, env)

const ModelRoutes = require("prepared-connector").ModelRoutes
const AppRoutes = require("./routes/app-routes")

const app = express()
const port = process.env.port

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

app.use(cors())

app.use("/:action/:modelName", (request, response, next) => {
  let action = request.params.action
  let modelName = request.params.modelName
  let data = request.body

  console.log({
    "url:": request.originalUrl,
    "action": action,
    "modelName": modelName,
    "data": JSON.stringify(data)
  })

  if(action.match(/^(create)$/)) {
    const client = new Client({
      node: process.env.ELASTIC_URL,
      auth: {
        username: process.env.ELASTIC_USER,
        password: process.env.ELASTIC_PASSWORD
      }
    })

    data.forEach((item) => {
      client.index({
        index: modelName,
        body: item
      }).then((indexResult) => {
        console.log(indexResult)
      })
    })
  }

  next()
})

// routes
const router = express.Router()

ModelRoutes.getRoutes(router)
AppRoutes.getRoutes(router)

app.use("/", router)

// start the Express server
app.listen(port, () => {
  console.log(`server started on port ${port}`)
})


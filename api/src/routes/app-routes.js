const { Client } = require("@elastic/elasticsearch")

class AppRoutes {
  static getRoutes(router) {
    /**
     * @api {get} /status/ Get Status
     * @apiName status
     * @apiGroup app
     * @apiVersion 0.1.0
     *
     * @apiSuccessExample Success-Response:
     *   HTTP/1.1 200 OK
     *   {
     *     "status": "OK"
     *   }
     *
     */
    router.get("/status", (request, response) => {
      response.json({
        status: "OK"
      })
    })

    router.post("/search/:modelName", (request, response) => {
      let modelName = request.params.modelName
      let searchOptions = request.body

      const client = new Client({
        node: "https://dcb7892072054dfebaaeb404a456e064.us-east-1.aws.found.io:9243",
        auth: {
          username: "elastic",
          password: "ouCZ00uxuATylhD1w2nohliR"
        }
      })

      // callback API
      client.search({
        index: modelName,
        body: searchOptions
      }, (err, result) => {
        if (err) {
          console.log(JSON.stringify(err, null, 2))
          response.json(err)
        }
        else {
          console.log(JSON.stringify(result.body.hits.hits, null, 2))
          response.json(result.body.hits.hits)
        }
      })

    })
  }
}

module.exports = AppRoutes

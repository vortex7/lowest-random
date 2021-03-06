const axios = require("axios")
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

    router.post("/elasticsearch/:modelName", (request, response) => {
      let modelName = request.params.modelName
      let searchOptions = request.body

      const client = new Client({
        node: process.env.ELASTIC_URL,
        auth: {
          username: process.env.ELASTIC_USER,
          password: process.env.ELASTIC_PASSWORD
        }
      })

      console.log(JSON.stringify(searchOptions)) 
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

    router.post("/solrsearch/:modelName", (request, response) => {
      let modelName = request.params.modelName
      let searchOptions = request.body
      console.log(searchOptions)

      let solrUrl = `${process.env.SOLR_URL}/solr/${modelName}/query`
      axios.post(solrUrl, searchOptions).then((results) => {
        console.log(results.data.response.docs)
        response.json(results.data.response.docs)
      }).catch((error) => {
        console.log(error)
        response.json(error)
      }).finally(() => {
        // always executed
      })  

    })
  }
}

module.exports = AppRoutes

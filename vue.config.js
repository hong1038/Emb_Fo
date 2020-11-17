module.exports = {
  transpileDependencies: ["vuetify"],

  "outputDir": "/Users/mjkang/dev/bo/ems/src/main/resources/static",
  "devServer": {
    "proxy": {
      "^/api/daedan/cj/ems": {
        "target": "http://localhost:9200",
        "ws": true,
        "changeOrigin": true,
        "overlay": false
      }
    }
  }
}
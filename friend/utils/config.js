const config = {
  baseRequestUrl: "http://www.test.com/index.php/api/",
  http:{
    defaultHead: {
      'Content-Type': 'application/json',
      method: 'GET'
    }
  }
}

module.exports = config;
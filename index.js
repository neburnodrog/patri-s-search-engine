const fs = require("fs");
require("dotenv").config();
const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(process.env.API_KEY);

const params = {
  q: "Abstract Landscapes",
  hl: "en",
  gl: "us",
  google_domain: "google.com",
};

const callback = function (data) {
  fs.writeFile(path.join(dirname, "results.json"), data);
};

// Show result as JSON
search.json(params, callback);

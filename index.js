require("dotenv").config();

const fs = require("fs");
const http = require("http");

const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(process.env.API_KEY);

const params = {
  q: "Abstract Landscapes",
  gl: "us", // country to use for the search
  tbm: "isch",
};

const searchCallback = (data) => {
  for (let image of data.images_results) {
    const splitURL = image.original.split(".");
    const imgFormat = "." + splitURL[splitURL.length - 1];
    const filename = image.title.replace(/\s/g, "") + imgFormat;
    download(image.original, filename, function () {
      console.log(`downloaded and saved ${filename}`);
    });
  }
};

const download = (url, filename, callback) => {
  http
    .request(url, function (response) {
      var data = new Stream();

      response.on("data", function (chunk) {
        data.push(chunk);
      });

      response.on("end", function () {
        fs.writeFileSync(filename + ".", data.read());
      });
    })
    .end();
};

search.json(params, searchCallback);

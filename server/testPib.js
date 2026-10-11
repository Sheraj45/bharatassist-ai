const axios = require("axios");
const Parser = require("rss-parser");

const parser = new Parser();

const url = "https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3";

async function test() {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      maxRedirects: 5,
    });

    console.log("STATUS:", response.status);
    console.log("LENGTH:", response.data.length);
    console.log("\nRESPONSE:\n");
    console.log(response.data.substring(0, 1000));

    const feed = await parser.parseString(response.data);

    console.log("\nITEMS:", feed.items.length);

    console.log("\nFIRST 2 ITEMS:");
    console.log(feed.items.slice(0, 2));
  } catch (error) {
    console.error("ERROR:", error.message);
  }
}

test();

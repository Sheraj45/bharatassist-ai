const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2315948";

async function inspectPage() {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      maxRedirects: 5,
      timeout: 15000,
    });

    const $ = cheerio.load(response.data);

    console.log("STATUS:", response.status);
    console.log("TITLE:", $("title").text().trim());

    console.log("\n========== HEADINGS ==========\n");

    $("h1, h2, h3, h4, h5, h6").each((index, element) => {
      const text = $(element).text().replace(/\s+/g, " ").trim();

      if (text) {
        console.log(`${index + 1}. ${$(element).get(0).tagName} -> ${text}`);
      }
    });

    console.log("\n========== IMPORTANT TEXT ==========\n");

    const bodyText = $("body").text().replace(/\s+/g, " ").trim();

    console.log(bodyText.substring(0, 10000));
  } catch (error) {
    console.error("ERROR:", error.message);
  }
}

inspectPage();

const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2316361";

async function inspectDate() {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(response.data);

    console.log("STATUS:", response.status);

    console.log("\n========== POSSIBLE DATE TEXT ==========\n");

    $("body *").each((i, element) => {
      const text = $(element)
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .replace(/\s+/g, " ")
        .trim();

      if (text && /Posted On|प्रविष्टि तिथि|Posted/i.test(text)) {
        console.log(
          "TAG:",
          element.tagName,
          "| CLASS:",
          $(element).attr("class"),
          "| ID:",
          $(element).attr("id"),
        );

        console.log("TEXT:", text);
        console.log("-----------------------------------");
      }
    });
  } catch (error) {
    console.error("ERROR:", error.message);
  }
}

inspectDate();

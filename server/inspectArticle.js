const axios = require("axios");
const cheerio = require("cheerio");

async function inspectArticle() {
  const url =
    "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2321807&reg=48&lang=1";

  try {
    const response = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 45000,
    });

    const $ = cheerio.load(response.data);

    console.log("PAGE LANGUAGE:", $("html").attr("lang"));

    console.log("\nHEADINGS:");
    $("h1, h2, h3").each((i, element) => {
      console.log(
        $(element).prop("tagName"),
        JSON.stringify($(element).text().trim())
      );
    });

    console.log("\nPARAGRAPHS CONTAINING 'military':");
    $("p").each((i, element) => {
      const text = $(element).text().replace(/\s+/g, " ").trim();

      if (text.toLowerCase().includes("military")) {
        console.log("TEXT:", text);
        console.log("HTML:", $.html(element).slice(0, 1500));
      }
    });
  } catch (error) {
    console.error("Inspection failed:", error.message);
  }
}

inspectArticle();

const axios = require("axios");
const Parser = require("rss-parser");
const cheerio = require("cheerio");

const parser = new Parser();

const PIB_RSS_URL = "https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3";

const PIB_BASE_URL = "https://www.pib.gov.in/";

const MONTHS = {
  JAN: 0,
  FEB: 1,
  MAR: 2,
  APR: 3,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AUG: 7,
  SEP: 8,
  OCT: 9,
  NOV: 10,
  DEC: 11,
};

// Convert PIB's displayed IST date into a JavaScript Date.
const parsePIBDate = (dateText) => {
  const match = dateText.match(
    /(\d{1,2})\s+([A-Z]{3})\s+(\d{4})\s+(\d{1,2}):(\d{2})\s*(AM|PM)/i,
  );

  if (!match) return null;

  const [, day, month, year, hourText, minute, period] = match;
  const monthIndex = MONTHS[month.toUpperCase()];

  if (monthIndex === undefined) return null;

  let hour = Number(hourText);

  if (hour < 1 || hour > 12) return null;

  if (period.toUpperCase() === "PM" && hour !== 12) {
    hour += 12;
  } else if (period.toUpperCase() === "AM" && hour === 12) {
    hour = 0;
  }

  const yearNumber = Number(year);
  const dayNumber = Number(day);
  const minuteNumber = Number(minute);

  const timestamp =
    Date.UTC(yearNumber, monthIndex, dayNumber, hour, minuteNumber) -
    330 * 60 * 1000;

  const istDate = new Date(timestamp + 330 * 60 * 1000);

  if (
    istDate.getUTCFullYear() !== yearNumber ||
    istDate.getUTCMonth() !== monthIndex ||
    istDate.getUTCDate() !== dayNumber ||
    istDate.getUTCHours() !== hour ||
    istDate.getUTCMinutes() !== minuteNumber
  ) {
    return null;
  }

  return new Date(timestamp);
};

// Classify PIB releases using stronger topic relevance.
const classifyCategory = (text) => {
  const content = text.toLowerCase().replace(/\s+/g, " ").trim();

  const keywords = {
    student: [
      "scholarship",
      "student scholarship",
      "students scholarship",
      "student financial assistance",
      "education grant",
      "educational grant",
      "student fellowship",
      "fellowship for students",
      "school students",
      "college students",
      "university students",
      "student beneficiaries",
      "विद्यार्थी",
      "छात्रवृत्ति",
      "शिक्षा छात्रवृत्ति",
      "विद्यार्थियों के लिए",
    ],

    farmer: [
      "farmer scheme",
      "farmers scheme",
      "kisan samman",
      "pm-kisan",
      "crop insurance",
      "minimum support price",
      "agricultural subsidy",
      "farmer subsidy",
      "irrigation subsidy",
      "pm dhan-dhaanya krishi yojana",
      "prime minister dhan-dhaanya krishi yojana",
      "pmddky",
      "farmer beneficiaries",
      "farmers beneficiaries",
      "farmer income",
      "agricultural scheme",
      "agriculture scheme",
      "किसान सम्मान",
      "फसल बीमा",
      "न्यूनतम समर्थन मूल्य",
      "किसान कल्याण",
    ],

    job_seeker: [
      "job seeker",
      "job seekers",
      "employment scheme",
      "employment opportunities",
      "employment generation",
      "employment assistance",
      "employment exchange",
      "government recruitment",
      "recruitment notification",
      "recruitment vacancies",
      "recruitment drive",
      "vacancies announced",
      "job vacancies",
      "new vacancies",
      "apprenticeship scheme",
      "skill development scheme",
      "employment guarantee",
      "self employment scheme",
      "रोजगार योजना",
      "सरकारी भर्ती",
      "नौकरी के अवसर",
      "कौशल विकास योजना",
    ],

    senior_citizen: [
      "senior citizen welfare",
      "senior citizens welfare",
      "senior citizen scheme",
      "senior citizens scheme",
      "old age pension",
      "elderly care",
      "elderly welfare",
      "geriatric care",
      "pension for senior citizens",
      "वृद्धावस्था पेंशन",
      "वरिष्ठ नागरिक योजना",
      "बुजुर्गों के लिए",
    ],
  };

  const scores = {
    student: 0,
    farmer: 0,
    job_seeker: 0,
    senior_citizen: 0,
  };

  for (const [category, terms] of Object.entries(keywords)) {
    for (const term of terms) {
      if (content.includes(term)) {
        scores[category] += term.includes(" ") ? 2 : 1;
      }
    }
  }

  const rankedCategories = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const [bestCategory, bestScore] = rankedCategories[0];
  const secondBestScore = rankedCategories[1][1];

  // Avoid assigning a category based on one weak keyword.
  if (bestScore < 2 || bestScore === secondBestScore) {
    return "general";
  }

  return bestCategory;
};

// Extract article data, preferring the official English PIB release.
const fetchPIBArticle = async (url, rssTitle) => {
  const requestConfig = {
    timeout: 45000,
    maxRedirects: 5,
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  };

  // Fetch the RSS-linked release first.
  let response = await axios.get(url, requestConfig);
  let $ = cheerio.load(response.data);
  let articleUrl = response.request?.res?.responseUrl || url;

  // Look for the official English version when the current page isn't English.
  const pageLanguage = ($("html").attr("lang") || "").toLowerCase();

  if (!pageLanguage.startsWith("en")) {
    let englishUrl = null;

    $("a").each((index, element) => {
      const text = $(element).text().replace(/\s+/g, " ").trim();
      const href = $(element).attr("href");

      if (
        !englishUrl &&
        /^english$/i.test(text) &&
        href &&
        /pib\.gov\.in/i.test(href)
      ) {
        englishUrl = new URL(href, articleUrl).href;
      }
    });

    if (englishUrl) {
      try {
        const englishResponse = await axios.get(englishUrl, requestConfig);

        const englishPage = cheerio.load(englishResponse.data);
        const englishLanguage = (
          englishPage("html").attr("lang") || ""
        ).toLowerCase();

        if (englishLanguage.startsWith("en")) {
          response = englishResponse;
          $ = englishPage;
          articleUrl = englishResponse.request?.res?.responseUrl || englishUrl;
        }
      } catch (error) {
        console.warn(
          `⚠️ English PIB release unavailable; using original: ${englishUrl}`,
        );
      }
    }
  }

  const cleanText = (selector) =>
    $(selector).first().text().replace(/\s+/g, " ").trim();

  // PIB English pages may use different title elements.
  const title =
    cleanText("h1") ||
    cleanText("h2") ||
    $('meta[property="og:title"]').attr("content")?.trim() ||
    rssTitle ||
    "";

  const subtitleCandidates = $("h2, h3")
    .map((index, element) => ({
      tag: element.tagName.toLowerCase(),
      text: $(element).text().replace(/\s+/g, " ").trim(),
    }))
    .get();

  const subtitle =
    subtitleCandidates.find(
      (item) =>
        item.tag === "h2" &&
        item.text &&
        !/[\u0900-\u097F]/.test(item.text) &&
        item.text !== title,
    )?.text ||
    subtitleCandidates.find(
      (item) =>
        item.tag === "h3" &&
        item.text &&
        !/[\u0900-\u097F]/.test(item.text) &&
        item.text !== title,
    )?.text ||
    "";

  const dateText =
    cleanText("#PrDateTime") ||
    cleanText(".publish-date") ||
    cleanText(".published-date") ||
    $('meta[property="article:published_time"]').attr("content") ||
    "";

  let publishedDate = parsePIBDate(dateText);

  // Support ISO-formatted publication dates as well.
  if (!publishedDate && dateText) {
    const timestamp = Date.parse(dateText);

    if (!Number.isNaN(timestamp)) {
      publishedDate = new Date(timestamp);
    }
  }

  if (!publishedDate) {
    console.warn(`⚠️ Missing publication date: ${articleUrl}`);
  }

  const paragraphs = [];

  $("p").each((index, element) => {
    const text = $(element)
      .text()
      .replace(/\u00a0/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([.!?])([A-Z])/g, "$1 $2")
      .replace(/,([A-Za-z])/g, ", $1")
      .replace(/\s+/g, " ")
      .trim();
    if (
      text.length > 80 &&
      !paragraphs.includes(text) &&
      !/^(home|skip to main content|share|related news)$/i.test(text)
    ) {
      paragraphs.push(text);
    }
  });

  const description = paragraphs.slice(0, 3).join(" ") || subtitle;

  const category = classifyCategory(`${title} ${subtitle} ${description}`);

  return {
    title,
    description,
    subtitle,
    category,
    language: "en",
    publishedDate,
    source: "Press Information Bureau",
    officialWebsite: PIB_BASE_URL,
    originalUrl: articleUrl,
    sourceType: "official",
    isLive: true,
    externalId: articleUrl.match(/[?&]PRID=(\d+)/i)?.[1] || articleUrl,
  };
};

// Fetch, extract, and classify PIB releases.
const fetchPIBNews = async () => {
  try {
    const response = await axios.get(PIB_RSS_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
      maxRedirects: 5,
      timeout: 45000,
    });

    const feed = await parser.parseString(response.data);

    console.log(`✅ PIB RSS fetched: ${feed.items.length} items`);

    const articles = [];

    for (const item of feed.items) {
      if (!item.link || !item.title) continue;

      try {
        const article = await fetchPIBArticle(item.link, item.title);

        if (!article) continue;

        articles.push(article);
      } catch (error) {
        console.error(`❌ Failed to process ${item.link}:`, error.message);
      }
    }

    console.log(`✅ PIB articles processed: ${articles.length}`);

    const categoryCounts = {
      student: 0,
      farmer: 0,
      job_seeker: 0,
      senior_citizen: 0,
      general: 0,
    };

    for (const article of articles) {
      if (Object.hasOwn(categoryCounts, article.category)) {
        categoryCounts[article.category]++;
      }
    }

    console.log("📊 Category distribution:", categoryCounts);

    console.log(
      `📅 Articles missing dates: ${
        articles.filter((article) => !article.publishedDate).length
      }`,
    );

    console.log(
      `🔗 Articles missing IDs: ${
        articles.filter((article) => !article.externalId).length
      }`,
    );

    return articles;
  } catch (error) {
    console.error("❌ Failed to fetch PIB RSS:", error.message);
    throw error;
  }
};

module.exports = {
  fetchPIBNews,
  classifyCategory,
};

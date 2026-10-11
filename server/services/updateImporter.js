const Update = require("../models/Update");
const { fetchPIBNews } = require("./newsFetcher");

const getCategory = (article) => {
  const text =
    `${article.title} ${article.description} ${article.ministry || ""}`.toLowerCase();

  if (
    /farmer|farming|agriculture|crop|कृषि|किसान|फसल|मत्स्य|पशुपालन|डेयरी/.test(
      text,
    )
  ) {
    return "farmer";
  }

  if (
    /student|education|school|college|scholarship|university|शिक्षा|छात्र|विद्यालय|महाविद्यालय|छात्रवृत्ति/.test(
      text,
    )
  ) {
    return "student";
  }

  if (
    /job|employment|recruitment|vacancy|career|skill|रोजगार|नौकरी|भर्ती|कौशल/.test(
      text,
    )
  ) {
    return "job_seeker";
  }

  if (/senior citizen|pension|elderly|वृद्ध|पेंशन|वरिष्ठ नागरिक/.test(text)) {
    return "senior_citizen";
  }

  return "general";
};

const getExternalId = (url) => {
  const match = url.match(/PRID=(\d+)/i);

  if (match) {
    return `pib-${match[1]}`;
  }

  return `pib-${Buffer.from(url).toString("base64")}`;
};

const importPIBNews = async () => {
  try {
    const articles = await fetchPIBNews();

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const article of articles) {
      if (!article.originalUrl || !article.title) {
        skipped++;
        continue;
      }

      const externalId = getExternalId(article.originalUrl);
      const category = article.category || getCategory(article);

      const updateData = {
        title: article.title,
        description: article.description || article.title,
        category,
        language: article.language || "en",
        source: article.source,
        officialWebsite: article.officialWebsite,
        publishedDate: article.publishedDate,
        originalUrl: article.originalUrl,
        sourceType: "official",
        externalId,
        isLive: true,
      };

      const existingUpdate = await Update.findOne({ externalId });

      if (existingUpdate) {
        await Update.findOneAndUpdate({ externalId }, updateData, {
          new: true,
          runValidators: true,
        });

        updated++;
      } else {
        await Update.create(updateData);
        created++;
      }
    }

    console.log(
      `✅ PIB import completed | Created: ${created} | Updated: ${updated} | Skipped: ${skipped}`,
    );

    return {
      total: articles.length,
      created,
      updated,
      skipped,
    };
  } catch (error) {
    console.error("❌ PIB import failed:", error.message);
    throw error;
  }
};

module.exports = {
  importPIBNews,
};

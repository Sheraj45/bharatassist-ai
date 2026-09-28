require("dotenv").config({ path: "./server/.env" });

const connectDB = require("./config/db");
const Scheme = require("./models/Scheme");

const schemes = [
  // =========================================================
  // STUDENTS
  // =========================================================

  {
    name: "PM-USP Central Sector Scheme of Scholarship for College and University Students",
    description:
      "A merit-based Central Sector scholarship for eligible college and university students from economically weaker families.",
    category: "student",
    eligibility:
      "Students who meet the scheme's merit, income and academic requirements and are pursuing eligible regular courses in recognized institutions. Eligibility should be checked on the National Scholarship Portal for the current academic year.",
    benefits:
      "Provides financial scholarship support for eligible college and university students. The amount and duration depend on the applicable scheme guidelines.",
    applicationProcess:
      "Register or log in through the National Scholarship Portal, complete One Time Registration if required, select the PM-USP scholarship, fill in the application and complete the required verification.",
    officialWebsite: "https://scholarships.gov.in/",
    state: "All India",
  },

  {
    name: "National Means-cum-Merit Scholarship Scheme",
    description:
      "A merit-based scholarship scheme designed to encourage eligible students to continue their studies after secondary education.",
    category: "student",
    eligibility:
      "Students must satisfy the academic, income and other conditions specified under the National Means-cum-Merit Scholarship Scheme.",
    benefits:
      "Provides scholarship assistance to eligible students to support continuation of education.",
    applicationProcess:
      "Apply through the National Scholarship Portal during the applicable application period and complete institute and government verification.",
    officialWebsite: "https://scholarships.gov.in/",
    state: "All India",
  },

  {
    name: "National Fellowship and Scholarship for Higher Education of ST Students",
    description:
      "A Central Government scholarship and fellowship support scheme for eligible Scheduled Tribe students pursuing higher education.",
    category: "student",
    eligibility:
      "Eligible Scheduled Tribe students pursuing higher education who satisfy the academic and other conditions specified by the scheme.",
    benefits:
      "Provides financial support for eligible ST students pursuing higher education under the applicable scholarship and fellowship provisions.",
    applicationProcess:
      "Applications are submitted through the National Scholarship Portal when the scheme is open, followed by institutional and government verification.",
    officialWebsite: "https://scholarships.gov.in/",
    state: "All India",
  },

  {
    name: "Top Class Education Scheme for SC Students",
    description:
      "A Central Sector educational support scheme for eligible Scheduled Caste students studying in notified institutions.",
    category: "student",
    eligibility:
      "Eligible SC students admitted to notified institutions and meeting the income, academic and other conditions prescribed under the scheme.",
    benefits:
      "Provides financial assistance toward eligible educational expenses according to the scheme guidelines.",
    applicationProcess:
      "Apply through the National Scholarship Portal when applications are open and complete the required verification process.",
    officialWebsite: "https://scholarships.gov.in/",
    state: "All India",
  },

  {
    name: "PM YASASVI Central Sector Scheme of Top Class Education for OBC, EBC and DNT Students",
    description:
      "A Central Government educational support initiative providing scholarships for eligible OBC, EBC and DNT students through applicable PM YASASVI components.",
    category: "student",
    eligibility:
      "Eligibility depends on the applicable PM YASASVI component, student category, class or course, family income and other conditions prescribed by the Government.",
    benefits:
      "Provides educational financial assistance to eligible OBC, EBC and DNT students under the applicable PM YASASVI component.",
    applicationProcess:
      "Check the currently available PM YASASVI component on the National Scholarship Portal and submit the application during the notified application period.",
    officialWebsite: "https://scholarships.gov.in/",
    state: "All India",
  },

  // =========================================================
  // FARMERS
  // =========================================================

  {
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    description:
      "A Central Sector income-support scheme for eligible landholding farmer families.",
    category: "farmer",
    eligibility:
      "Eligible landholding farmer families identified according to PM-KISAN guidelines are covered, subject to the scheme's exclusion categories.",
    benefits:
      "Provides income support of ₹6,000 per year in three equal installments, transferred directly to eligible beneficiaries' bank accounts.",
    applicationProcess:
      "Farmers can register and access PM-KISAN services through the official PM-KISAN portal. State and UT authorities verify beneficiary eligibility.",
    officialWebsite: "https://pmkisan.gov.in/",
    state: "All India",
  },

  {
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description:
      "A crop insurance scheme designed to provide financial protection to farmers against specified crop losses and risks covered under the scheme.",
    category: "farmer",
    eligibility:
      "Farmers with an insurable interest in notified crops and areas can be covered according to the applicable PMFBY guidelines. Coverage and conditions depend on notified crops, areas and seasons.",
    benefits:
      "Provides crop insurance protection against covered crop losses. The official portal also provides application, policy-status and crop-loss reporting facilities.",
    applicationProcess:
      "Check the notified crop and season, apply through the official PMFBY system or authorized channels, pay the applicable farmer premium and retain the application or policy details.",
    officialWebsite: "https://pmfby.gov.in/",
    state: "All India",
  },

  {
    name: "Kisan Credit Card (KCC)",
    description:
      "A banking credit facility designed to provide timely and flexible credit support to farmers for cultivation and specified agricultural and allied activities.",
    category: "farmer",
    eligibility:
      "Eligible owner cultivators, tenant farmers, oral lessees, sharecroppers and eligible farmer groups such as SHGs or JLGs can apply subject to applicable bank and scheme conditions.",
    benefits:
      "Provides access to agricultural credit for crop cultivation, post-harvest expenses, marketing, certain household needs, farm-asset maintenance and eligible agricultural and allied investments.",
    applicationProcess:
      "Apply through a participating bank by submitting the required application, identity and address documents and applicable landholding or cropping information.",
    officialWebsite: "https://www.myscheme.gov.in/schemes/kcc",
    state: "All India",
  },

  {
    name: "Soil Health Card Scheme",
    description:
      "A Government of India initiative that helps farmers understand the nutrient status of their soil and receive recommendations for appropriate soil management.",
    category: "farmer",
    eligibility:
      "Farmers can use the Soil Health Card system for soil testing and nutrient-management recommendations according to the applicable government arrangements in their area.",
    benefits:
      "Provides information about soil nutrient status and recommendations intended to support balanced fertilizer use and improved soil management.",
    applicationProcess:
      "Farmers can approach the designated agriculture department or soil testing facility in their area for soil sampling and Soil Health Card services.",
    officialWebsite: "https://soilhealth.dac.gov.in/",
    state: "All India",
  },

  {
    name: "Agriculture Infrastructure Fund (AIF)",
    description:
      "A financing facility supporting investment in post-harvest management infrastructure and community farming assets.",
    category: "farmer",
    eligibility:
      "Eligible farmers, farmer producer organizations, agricultural entrepreneurs and other entities covered by the Agriculture Infrastructure Fund guidelines may apply.",
    benefits:
      "Provides access to financing support for eligible agriculture infrastructure projects under the applicable AIF guidelines.",
    applicationProcess:
      "Eligible applicants can submit projects through the official Agriculture Infrastructure Fund system and complete the required financing and verification process.",
    officialWebsite: "https://agriinfra.dac.gov.in/",
    state: "All India",
  },

  // =========================================================
  // JOB SEEKERS
  // =========================================================

  {
    name: "National Career Service (NCS)",
    description:
      "A Government of India employment and career platform connecting job seekers with employment, internships, career services and skill-related opportunities.",
    category: "job_seeker",
    eligibility:
      "Job seekers can register on the National Career Service platform and use its employment and career services.",
    benefits:
      "Provides access to job searches, career centres, counsellors, internship opportunities, skill courses and other employment-related services.",
    applicationProcess:
      "Visit the NCS website, register or log in as a job seeker, complete your profile and use the job and career services available on the platform.",
    officialWebsite: "https://www.ncs.gov.in/",
    state: "All India",
  },

  {
    name: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)",
    description:
      "A national skill-development initiative focused on providing industry-relevant skill training and improving employability.",
    category: "job_seeker",
    eligibility:
      "Eligible youth and candidates can participate in skill-development opportunities offered under the applicable PMKVY 4.0 guidelines and training programmes.",
    benefits:
      "Provides access to skill training, assessment and certification opportunities intended to improve employability and support career development.",
    applicationProcess:
      "Check available training opportunities through official Skill India and PMKVY channels, select an eligible course or training centre and complete registration as instructed.",
    officialWebsite: "https://www.msde.gov.in/",
    state: "All India",
  },

  {
    name: "National Apprenticeship Promotion Scheme (NAPS)",
    description:
      "A Government of India apprenticeship initiative supporting apprenticeship training and industry-based learning.",
    category: "job_seeker",
    eligibility:
      "Eligible candidates who satisfy the educational, age and other requirements of the selected apprenticeship opportunity can apply.",
    benefits:
      "Provides opportunities for practical workplace training and apprenticeship experience with participating establishments.",
    applicationProcess:
      "Register on the official apprenticeship portal, create or update your candidate profile, search available apprenticeship opportunities and apply to suitable establishments.",
    officialWebsite: "https://www.apprenticeshipindia.gov.in/",
    state: "All India",
  },

  {
    name: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
    description:
      "A rural skill-development programme focused on improving the employment opportunities and career prospects of rural youth from poor families.",
    category: "job_seeker",
    eligibility:
      "The programme primarily targets rural youth between 15 and 35 years of age from poor families, subject to the applicable programme guidelines and state implementation requirements.",
    benefits:
      "Provides skill training and supports pathways toward employment and improved income opportunities for eligible rural youth.",
    applicationProcess:
      "Check DDU-GKY training opportunities through the official Kaushal Bharat or state rural livelihood mission channels and register through the prescribed process.",
    officialWebsite: "https://www.kaushalbharat.gov.in/",
    state: "All India",
  },

  {
    name: "PM-DAKSH",
    description:
      "A skill-development initiative of the Ministry of Social Justice and Empowerment supporting skill training for eligible disadvantaged groups.",
    category: "job_seeker",
    eligibility:
      "Eligibility depends on the beneficiary category, age, income and other conditions specified under PM-DAKSH.",
    benefits:
      "Provides eligible beneficiaries with skill-development and training opportunities intended to improve employability and income-generation prospects.",
    applicationProcess:
      "Check the current PM-DAKSH training opportunities and beneficiary requirements through the official government portal and apply through the prescribed process.",
    officialWebsite: "https://pmdaksh.dosje.gov.in/",
    state: "All India",
  },

  // =========================================================
  // SENIOR CITIZENS
  // =========================================================

  {
    name: "Atal Vayo Abhyuday Yojana (AVYAY)",
    description:
      "A Government of India umbrella scheme aimed at improving the quality of life of senior citizens and supporting dignified, active and productive ageing.",
    category: "senior_citizen",
    eligibility:
      "Support is provided through eligible AVYAY components and implementing agencies according to the applicable government guidelines.",
    benefits:
      "Supports senior-citizen welfare through areas such as shelter, food, healthcare, protection, active ageing, accessibility and other senior-care initiatives.",
    applicationProcess:
      "Depending on the component, services are accessed through implementing organizations, State or UT authorities and designated government channels under the AVYAY framework.",
    officialWebsite: "https://socialjustice.gov.in/schemes/43",
    state: "All India",
  },

  {
    name: "Rashtriya Vayoshri Yojana (RVY)",
    description:
      "A Government of India initiative providing assisted-living devices to eligible senior citizens with age-related disabilities or infirmities.",
    category: "senior_citizen",
    eligibility:
      "Eligible senior citizens must satisfy the age, disability or infirmity, socioeconomic and other conditions specified under the applicable RVY guidelines.",
    benefits:
      "Eligible beneficiaries can receive appropriate assisted-living devices intended to improve mobility, independence and quality of life.",
    applicationProcess:
      "Check current implementation arrangements, beneficiary requirements and camps or designated agencies through official government channels.",
    officialWebsite: "https://socialjustice.gov.in/",
    state: "All India",
  },

  {
    name: "Integrated Programme for Senior Citizens (IPSrC)",
    description:
      "An AVYAY component supporting services and facilities for senior citizens, particularly indigent elderly persons, through eligible implementing organizations.",
    category: "senior_citizen",
    eligibility:
      "Senior citizens may benefit from services provided through eligible implementing organizations under the applicable IPSrC guidelines.",
    benefits:
      "May support senior citizen homes, shelter, food, medical care, care services and other approved welfare services.",
    applicationProcess:
      "Contact an eligible implementing organization or the relevant State or UT social-welfare authority to find available services in your area.",
    officialWebsite: "https://socialjustice.gov.in/schemes/43",
    state: "All India",
  },

  {
    name: "Elderline - National Helpline for Senior Citizens",
    description:
      "A Government-supported national helpline providing information, guidance, emotional support and assistance to senior citizens.",
    category: "senior_citizen",
    eligibility:
      "Senior citizens can use the Elderline service for information, guidance, support and assistance related to senior-citizen welfare and concerns.",
    benefits:
      "Provides access to information, guidance, emotional support and field intervention or linkage with relevant services in appropriate cases.",
    applicationProcess:
      "Call the toll-free Elderline number 14567 or use the available official senior-citizen support channels.",
    officialWebsite: "https://socialjustice.gov.in/",
    state: "All India",
  },

  {
    name: "Seniorcare Ageing Growth Engine (SAGE)",
    description:
      "A Government initiative under the senior-citizen welfare framework that promotes products and services designed to improve the quality of life of older persons.",
    category: "senior_citizen",
    eligibility:
      "SAGE primarily supports and facilitates organizations and enterprises developing products or services for senior citizens. Individual availability depends on the services offered.",
    benefits:
      "Promotes access to innovative products, solutions and services intended to improve the quality of life of senior citizens.",
    applicationProcess:
      "Senior citizens can explore relevant products and services through participating organizations and official senior-care resources.",
    officialWebsite: "https://socialjustice.gov.in/",
    state: "All India",
  },

  // =========================================================
  // GENERAL
  // =========================================================

  {
    name: "Pradhan Mantri Awas Yojana - Urban 2.0",
    description:
      "A Government of India housing programme supporting eligible urban families through different housing assistance components.",
    category: "general",
    eligibility:
      "Eligibility depends on the PMAY-U 2.0 component, household income, housing status and other conditions prescribed by the scheme.",
    benefits:
      "Eligible beneficiaries may receive housing assistance under the applicable PMAY-U 2.0 component.",
    applicationProcess:
      "Check eligibility and apply through the official PMAY-Urban portal or designated government channel.",
    officialWebsite: "https://pmay-urban.gov.in/",
    state: "All India",
  },

  {
    name: "myScheme - Government Scheme Discovery Platform",
    description:
      "A National Platform that helps citizens discover Government of India schemes based on their profile and eligibility.",
    category: "general",
    eligibility:
      "Available to citizens who want to search and discover government schemes applicable to their circumstances.",
    benefits:
      "Helps citizens discover relevant schemes and provides information about eligibility, benefits and application procedures.",
    applicationProcess:
      "Visit myScheme, enter the requested profile information, review matching schemes and follow the application instructions for the selected scheme.",
    officialWebsite: "https://www.myscheme.gov.in/",
    state: "All India",
  },

  {
    name: "DigiLocker",
    description:
      "A Government of India digital document platform that allows citizens to securely access and share verified digital documents.",
    category: "general",
    eligibility:
      "Indian citizens can create and use a DigiLocker account subject to the platform's registration requirements.",
    benefits:
      "Provides access to digital versions of eligible government-issued documents and certificates.",
    applicationProcess:
      "Visit DigiLocker, register or log in using the available identity verification method and access eligible documents.",
    officialWebsite: "https://www.digilocker.gov.in/",
    state: "All India",
  },
];

const seedSchemes = async () => {
  try {
    await connectDB();

    await Scheme.deleteMany({});

    await Scheme.insertMany(schemes);

    console.log(`✅ ${schemes.length} schemes added successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding schemes:", error);
    process.exit(1);
  }
};

seedSchemes();

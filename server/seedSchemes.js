require("dotenv").config();

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
      "Register/login through the National Scholarship Portal, complete One Time Registration if required, select the PM-USP scholarship, fill in the application and complete the required verification.",
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
      "Provides financial support for eligible ST students pursuing higher education under the applicable scholarship/fellowship provisions.",
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
    name: "PM YASASVI",
    description:
      "A Government of India initiative providing educational support for eligible students belonging to specified disadvantaged groups under the applicable PM YASASVI components.",
    category: "student",
    eligibility:
      "Eligibility depends on the specific PM YASASVI component, student category, class, family income and other conditions prescribed by the Government.",
    benefits:
      "Provides educational assistance to eligible students under the applicable PM YASASVI scheme component.",
    applicationProcess:
      "Check the currently available PM YASASVI scheme on the National Scholarship Portal or relevant government portal and submit the application during the notified period.",
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
      "Farmers can register and access PM-KISAN services through the official PM-KISAN portal. State/UT authorities verify beneficiary eligibility.",
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
      "Check the notified crop and season, apply through the official PMFBY system or authorized channels, pay the applicable farmer premium and retain the application/policy details.",
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
      "Provides access to agricultural credit for crop cultivation, post-harvest expenses, marketing, certain household needs, farm-asset maintenance and eligible agricultural/allied investments.",
    applicationProcess:
      "Apply through a participating bank by submitting the required application, identity/address documents and applicable landholding/cropping information.",
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
      "Farmers can approach the designated agriculture department/soil testing facility in their area for soil sampling and Soil Health Card services.",
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
      "Visit the NCS website, register/login as a job seeker, complete your profile and use the job and career services available on the platform.",
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
      "Provides access to skill training, assessment/certification and opportunities intended to improve employability and support career development.",
    applicationProcess:
      "Check available training opportunities through official Skill India/PMKVY channels, select an eligible course or training centre and complete registration as instructed.",
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
      "Register on the official apprenticeship portal, create/update your candidate profile, search available apprenticeship opportunities and apply to suitable establishments.",
    officialWebsite: "https://www.apprenticeshipindia.gov.in/",
    state: "All India",
  },

  {
    name: "Pradhan Mantri National Apprenticeship Mela",
    description:
      "Government-supported apprenticeship recruitment events that connect candidates with establishments offering apprenticeship opportunities.",
    category: "job_seeker",
    eligibility:
      "Eligibility varies according to the apprenticeship opportunities and establishments participating in each apprenticeship mela.",
    benefits:
      "Provides candidates with opportunities to interact with employers and seek apprenticeship opportunities.",
    applicationProcess:
      "Check apprenticeship mela announcements and participating opportunities through official apprenticeship and Skill India channels.",
    officialWebsite: "https://www.apprenticeshipindia.gov.in/",
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
      "A Government of India scheme aimed at improving the quality of life of senior citizens and supporting dignified and active ageing.",
    category: "senior_citizen",
    eligibility:
      "Senior-citizen support is provided through eligible components and implementing organizations under the applicable AVYAY guidelines.",
    benefits:
      "Supports services and facilities intended to provide senior citizens with basic amenities, care, shelter, food, medical support and opportunities for active ageing.",
    applicationProcess:
      "Depending on the component, services are accessed through implementing organizations, government departments and designated channels under the AVYAY framework.",
    officialWebsite: "https://socialjustice.gov.in/schemes/43",
    state: "All India",
  },

  {
    name: "Rashtriya Vayoshri Yojana (RVY)",
    description:
      "A Government of India initiative associated with providing assisted-living devices to eligible senior citizens with disabilities or age-related impairments.",
    category: "senior_citizen",
    eligibility:
      "Eligibility depends on age, disability/impairment, socioeconomic and other conditions specified under the applicable RVY guidelines.",
    benefits:
      "Eligible beneficiaries can receive appropriate assisted-living devices intended to improve mobility and quality of life.",
    applicationProcess:
      "Eligible beneficiaries should check current implementation arrangements and camps or designated agencies through official government channels.",
    officialWebsite: "https://socialjustice.gov.in/",
    state: "All India",
  },

  {
    name: "Senior Citizen Welfare Scheme under AVYAY",
    description:
      "Government-supported welfare services for senior citizens delivered through eligible organizations and implementing agencies.",
    category: "senior_citizen",
    eligibility:
      "Senior citizens who meet the requirements of the relevant welfare service or implementing programme may receive support.",
    benefits:
      "May include access to shelter, food, healthcare, care services and other welfare support depending on the implementing programme.",
    applicationProcess:
      "Contact the relevant implementing organization, state/UT social welfare authority or designated government channel for available senior-citizen services.",
    officialWebsite: "https://socialjustice.gov.in/schemes",
    state: "All India",
  },

  {
    name: "SAGE - Seniorcare Ageing Growth Engine",
    description:
      "A Government-supported initiative intended to encourage products and services that improve the lives of senior citizens.",
    category: "senior_citizen",
    eligibility:
      "The initiative primarily supports eligible organizations and enterprises developing products or services for senior citizens; availability for individual users depends on the service offered.",
    benefits:
      "Promotes access to innovative products and services aimed at improving the quality of life of senior citizens.",
    applicationProcess:
      "Senior citizens can explore relevant services through participating organizations and official senior-care resources.",
    officialWebsite: "https://socialjustice.gov.in/",
    state: "All India",
  },

  {
    name: "Integrated Programme for Senior Citizens",
    description:
      "A government-supported programme focused on improving the quality of life of older persons through eligible organizations and services.",
    category: "senior_citizen",
    eligibility:
      "Senior citizens may benefit from services provided through eligible implementing organizations under the applicable programme guidelines.",
    benefits:
      "May provide support such as shelter, food, healthcare and care services through approved organizations.",
    applicationProcess:
      "Contact an eligible implementing organization or relevant government/social-welfare authority to find available services in your area.",
    officialWebsite: "https://socialjustice.gov.in/schemes/43",
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
      "Visit DigiLocker, register/login using the available identity verification method and access eligible documents.",
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

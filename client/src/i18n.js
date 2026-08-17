import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  // ==================== ENGLISH ====================
  en: {
    translation: {
      // Navbar
      login: "Login",
      signup: "Sign Up",
      dashboard: "Dashboard",
      schemes: "Schemes",
      updates: "Government Updates",
      profile: "Profile",
      logout: "Logout",

      // Dashboard
      welcome: "Welcome to BharatAssist AI",
      dashboardSubtitle: "Your one-stop assistant for government information.",
      dashboardDescription:
        "Find government schemes, opportunities and important information in one place.",

      recommended: "Recommended for You",
      loadingRecommendations: "Loading recommendations...",
      noRecommendations: "No recommended schemes available.",
      failedToLoadRecommendations: "Failed to load recommendations",

      category: "Category",
      eligibility: "Eligibility",
      benefits: "Benefits",
      viewDetails: "View Details",

      howCanWeHelp: "How can we help you?",
      explore: "Explore",

      // Categories
      students: "Students",
      farmers: "Farmers",
      jobSeekers: "Job Seekers",
      seniorCitizens: "Senior Citizens",

      studentsDescription:
        "Find scholarships, education schemes and student opportunities.",
      farmersDescription:
        "Discover farming schemes, subsidies and government support.",
      jobSeekersDescription:
        "Find government jobs, exams, internships and career opportunities.",
      seniorCitizensDescription:
        "Find pension schemes, benefits and services for senior citizens.",

      // Quick Access
      quickAccess: "Quick Access",
      myProfile: "My Profile",

      // Schemes
      governmentSchemes: "Government Schemes",
      searchSchemes: "Search government schemes...",
      allCategories: "All Categories",
      general: "General",
      noSchemes: "No schemes available.",
      loadingSchemes: "Loading schemes...",
      failedToLoadSchemes: "Failed to load schemes",
      state: "State",

      // Scheme Details
      loadingScheme: "Loading scheme...",
      failedToLoadScheme: "Failed to load scheme",
      backToSchemes: "Back to Schemes",
      applicationProcess: "Application Process",
      applyOfficial: "Apply on Official Website",

      // Government Updates
      governmentUpdates: "Government Updates",
      updatesDescription:
        "Stay updated with important government announcements and opportunities.",
      loadingUpdates: "Loading updates...",
      noUpdates: "No updates available.",
      failedToLoadUpdates: "Failed to load updates",
      readMore: "Read More",

      // Update Details
      loadingUpdate: "Loading update...",
      updateNotFound: "Update not found.",
      failedToLoadUpdate: "Failed to load update",
      source: "Source",
      published: "Published",
      visitOfficialWebsite: "Visit Official Website",
      backToUpdates: "Back to Updates",

      // Profile
      loadingProfile: "Loading profile...",
      failedToLoadProfile: "Failed to load profile",
      name: "Name",
      email: "Email",
      role: "Role",

      // Home
      homeTitle: "BharatAssist AI",
      homeDescription:
        "Your intelligent assistant for discovering government schemes, opportunities and information.",
      createAccount: "Create Account",
    },
  },

  // ==================== HINDI ====================
  hi: {
    translation: {
      // Navbar
      login: "लॉग इन",
      signup: "साइन अप",
      dashboard: "डैशबोर्ड",
      schemes: "योजनाएं",
      updates: "सरकारी अपडेट",
      profile: "प्रोफ़ाइल",
      logout: "लॉग आउट",

      // Dashboard
      welcome: "BharatAssist AI में आपका स्वागत है",
      dashboardSubtitle: "सरकारी जानकारी के लिए आपका एकमात्र सहायक।",
      dashboardDescription:
        "सरकारी योजनाएं, अवसर और महत्वपूर्ण जानकारी एक ही जगह खोजें।",

      recommended: "आपके लिए अनुशंसित",
      loadingRecommendations: "सिफारिशें लोड हो रही हैं...",
      noRecommendations: "कोई अनुशंसित योजना उपलब्ध नहीं है।",
      failedToLoadRecommendations: "सिफारिशें लोड करने में विफल",

      category: "श्रेणी",
      eligibility: "पात्रता",
      benefits: "लाभ",
      viewDetails: "विवरण देखें",

      howCanWeHelp: "हम आपकी कैसे मदद कर सकते हैं?",
      explore: "देखें",

      // Categories
      students: "छात्र",
      farmers: "किसान",
      jobSeekers: "नौकरी खोजने वाले",
      seniorCitizens: "वरिष्ठ नागरिक",

      studentsDescription:
        "छात्रवृत्ति, शिक्षा योजनाएं और छात्रों के अवसर खोजें।",
      farmersDescription: "कृषि योजनाएं, सब्सिडी और सरकारी सहायता खोजें।",
      jobSeekersDescription:
        "सरकारी नौकरियां, परीक्षाएं, इंटर्नशिप और करियर के अवसर खोजें।",
      seniorCitizensDescription:
        "पेंशन योजनाएं, लाभ और वरिष्ठ नागरिकों के लिए सेवाएं खोजें।",

      // Quick Access
      quickAccess: "त्वरित पहुंच",
      myProfile: "मेरी प्रोफ़ाइल",

      // Schemes
      governmentSchemes: "सरकारी योजनाएं",
      searchSchemes: "सरकारी योजनाएं खोजें...",
      allCategories: "सभी श्रेणियां",
      general: "सामान्य",
      noSchemes: "कोई योजना उपलब्ध नहीं है।",
      loadingSchemes: "योजनाएं लोड हो रही हैं...",
      failedToLoadSchemes: "योजनाएं लोड करने में विफल",
      state: "राज्य",

      // Scheme Details
      loadingScheme: "योजना लोड हो रही है...",
      failedToLoadScheme: "योजना लोड करने में विफल",
      backToSchemes: "योजनाओं पर वापस जाएं",
      applicationProcess: "आवेदन प्रक्रिया",
      applyOfficial: "आधिकारिक वेबसाइट पर आवेदन करें",

      // Government Updates
      governmentUpdates: "सरकारी अपडेट",
      updatesDescription: "महत्वपूर्ण सरकारी घोषणाओं और अवसरों से अपडेट रहें।",
      loadingUpdates: "अपडेट लोड हो रहे हैं...",
      noUpdates: "कोई अपडेट उपलब्ध नहीं है।",
      failedToLoadUpdates: "अपडेट लोड करने में विफल",
      readMore: "और पढ़ें",

      // Update Details
      loadingUpdate: "अपडेट लोड हो रहा है...",
      updateNotFound: "अपडेट नहीं मिला।",
      failedToLoadUpdate: "अपडेट लोड करने में विफल",
      source: "स्रोत",
      published: "प्रकाशित",
      visitOfficialWebsite: "आधिकारिक वेबसाइट पर जाएं",
      backToUpdates: "अपडेट पर वापस जाएं",

      // Profile
      loadingProfile: "प्रोफ़ाइल लोड हो रही है...",
      failedToLoadProfile: "प्रोफ़ाइल लोड करने में विफल",
      name: "नाम",
      email: "ईमेल",
      role: "भूमिका",

      // Home
      homeTitle: "BharatAssist AI",
      homeDescription:
        "सरकारी योजनाओं, अवसरों और जानकारी को खोजने के लिए आपका बुद्धिमान सहायक।",
      createAccount: "खाता बनाएं",
    },
  },

  // ==================== TELUGU ====================
  te: {
    translation: {
      // Navbar
      login: "లాగిన్",
      signup: "సైన్ అప్",
      dashboard: "డాష్‌బోర్డ్",
      schemes: "పథకాలు",
      updates: "ప్రభుత్వ నవీకరణలు",
      profile: "ప్రొఫైల్",
      logout: "లాగ్ అవుట్",

      // Dashboard
      welcome: "BharatAssist AI కి స్వాగతం",
      dashboardSubtitle: "ప్రభుత్వ సమాచారానికి మీ ఒకే ఒక్క సహాయకుడు.",
      dashboardDescription:
        "ప్రభుత్వ పథకాలు, అవకాశాలు మరియు ముఖ్యమైన సమాచారాన్ని ఒకే చోట కనుగొనండి.",

      recommended: "మీ కోసం సిఫార్సు చేయబడినవి",
      loadingRecommendations: "సిఫార్సులు లోడ్ అవుతున్నాయి...",
      noRecommendations: "సిఫార్సు చేసిన పథకాలు ఏవీ అందుబాటులో లేవు.",
      failedToLoadRecommendations: "సిఫార్సులను లోడ్ చేయడం విఫలమైంది",

      category: "వర్గం",
      eligibility: "అర్హత",
      benefits: "ప్రయోజనాలు",
      viewDetails: "వివరాలు చూడండి",

      howCanWeHelp: "మేము మీకు ఎలా సహాయం చేయగలం?",
      explore: "చూడండి",

      // Categories
      students: "విద్యార్థులు",
      farmers: "రైతులు",
      jobSeekers: "ఉద్యోగార్థులు",
      seniorCitizens: "వృద్ధులు",

      studentsDescription:
        "స్కాలర్‌షిప్‌లు, విద్యా పథకాలు మరియు విద్యార్థుల అవకాశాలను కనుగొనండి.",
      farmersDescription:
        "వ్యవసాయ పథకాలు, సబ్సిడీలు మరియు ప్రభుత్వ సహాయాన్ని కనుగొనండి.",
      jobSeekersDescription:
        "ప్రభుత్వ ఉద్యోగాలు, పరీక్షలు, ఇంటర్న్‌షిప్‌లు మరియు కెరీర్ అవకాశాలను కనుగొనండి.",
      seniorCitizensDescription:
        "పెన్షన్ పథకాలు, ప్రయోజనాలు మరియు వృద్ధుల కోసం సేవలను కనుగొనండి.",

      // Quick Access
      quickAccess: "త్వరిత ప్రాప్యత",
      myProfile: "నా ప్రొఫైల్",

      // Schemes
      governmentSchemes: "ప్రభుత్వ పథకాలు",
      searchSchemes: "ప్రభుత్వ పథకాలను శోధించండి...",
      allCategories: "అన్ని వర్గాలు",
      general: "సాధారణ",
      noSchemes: "పథకాలు ఏవీ అందుబాటులో లేవు.",
      loadingSchemes: "పథకాలు లోడ్ అవుతున్నాయి...",
      failedToLoadSchemes: "పథకాలను లోడ్ చేయడం విఫలమైంది",
      state: "రాష్ట్రం",

      // Scheme Details
      loadingScheme: "పథకం లోడ్ అవుతోంది...",
      failedToLoadScheme: "పథకాన్ని లోడ్ చేయడం విఫలమైంది",
      backToSchemes: "పథకాలకు తిరిగి వెళ్ళండి",
      applicationProcess: "దరఖాస్తు ప్రక్రియ",
      applyOfficial: "అధికారిక వెబ్‌సైట్‌లో దరఖాస్తు చేయండి",

      // Government Updates
      governmentUpdates: "ప్రభుత్వ నవీకరణలు",
      updatesDescription:
        "ముఖ్యమైన ప్రభుత్వ ప్రకటనలు మరియు అవకాశాల గురించి తాజా సమాచారాన్ని పొందండి.",
      loadingUpdates: "నవీకరణలు లోడ్ అవుతున్నాయి...",
      noUpdates: "నవీకరణలు ఏవీ అందుబాటులో లేవు.",
      failedToLoadUpdates: "నవీకరణలను లోడ్ చేయడం విఫలమైంది",
      readMore: "మరింత చదవండి",

      // Update Details
      loadingUpdate: "నవీకరణ లోడ్ అవుతోంది...",
      updateNotFound: "నవీకరణ కనుగొనబడలేదు.",
      failedToLoadUpdate: "నవీకరణను లోడ్ చేయడం విఫలమైంది",
      source: "మూలం",
      published: "ప్రచురించబడింది",
      visitOfficialWebsite: "అధికారిక వెబ్‌సైట్‌ను సందర్శించండి",
      backToUpdates: "నవీకరణలకు తిరిగి వెళ్ళండి",

      // Profile
      loadingProfile: "ప్రొఫైల్ లోడ్ అవుతోంది...",
      failedToLoadProfile: "ప్రొఫైల్‌ను లోడ్ చేయడం విఫలమైంది",
      name: "పేరు",
      email: "ఇమెయిల్",
      role: "పాత్ర",

      // Home
      homeTitle: "BharatAssist AI",
      homeDescription:
        "ప్రభుత్వ పథకాలు, అవకాశాలు మరియు సమాచారాన్ని కనుగొనడానికి మీ తెలివైన సహాయకుడు.",
      createAccount: "ఖాతాను సృష్టించండి",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

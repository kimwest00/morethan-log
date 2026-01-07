const CONFIG = {
  // profile setting (required)
  profile: {
    name: "kimwest00",
    image: "/favicon.svg", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
    role: "App Developer",
    bio: "1.5인분 하고 싶은 Flutter 개발자",
    email: "kim-west00@naver.com",
    linkedin: "minseo-kim-811a5b229",
    github: "kimwest00",
    instagram: "devkimwest00",
  },
  projects: [
//    {
//      name: `morethan-log`,
//      href: "https://github.com/morethanmin/morethan-log",
//    },
  ],
  // blog setting (required)
  blog: {
    title: "kimwest의 개발개발",
    description: "welcome to morethan-log!",
    scheme: 'light' | 'dark' | 'system'
  },

  // CONFIG configration (required)
  link: "https://kimwest-vlog.vercel.app",
  since: 2026, // If leave this empty, current year will be used.
  lang:  ['en-US', 'ko-KR'], //'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES',
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  cusdis: {
    enable: false,
    config: {
      host: "https://cusdis.com",
      appid: "", // Embed Code -> data-app-id value
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 21600 * 7, // revalidate time for [slug], index
}

module.exports = { CONFIG }

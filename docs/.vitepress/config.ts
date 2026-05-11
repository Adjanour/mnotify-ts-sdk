import { defineConfig } from "vitepress";

export default defineConfig({
  title: "mNotify TS SDK",
  description: "Zero-dependency TypeScript SDK for mNotify BMS API",
  ignoreDeadLinks: true,
  themeConfig: {
    search: { provider: "local" },
    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "API Reference", link: "/api/globals" },
      { text: "GitHub", link: "https://github.com/adjanour/mnotify-ts-sdk" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          items: [
            { text: "Getting Started", link: "/guide/getting-started" },
            { text: "Sending SMS", link: "/guide/sending-sms" },
            { text: "Managing Contacts", link: "/guide/managing-contacts" },
            { text: "Contact Groups", link: "/guide/contact-groups" },
            { text: "Templates", link: "/guide/templates" },
            { text: "Account", link: "/guide/account" },
            { text: "Error Handling", link: "/guide/error-handling" },
            {
              text: "Railway-Oriented Programming",
              link: "/guide/railway-programming",
            },
          ],
        },
      ],
      "/api/": [
        {
          text: "API Reference",
          items: [
            { text: "Globals", link: "/api/globals" },
            { text: "MNotify", link: "/api/classes/MNotify" },
            { text: "SMS", link: "/api/classes/SMS" },
            { text: "Contacts", link: "/api/classes/Contacts" },
            { text: "Groups", link: "/api/classes/Groups" },
            { text: "Templates", link: "/api/classes/Templates" },
            { text: "Account", link: "/api/classes/Account" },
            { text: "MNotifyError", link: "/api/classes/MNotifyError" },
            { text: "Result", link: "/api/type-aliases/Result" },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/adjanour/mnotify-ts-sdk" },
    ],
  },
});

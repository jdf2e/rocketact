/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: "JD",
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: "https://img11.360buyimg.com/uba/jfs/t1/19505/13/12239/63117/5c96050bE8cf2a48b/8332354ad8e007cd.png",
    infoLink: "https://www.jd.com",
    pinned: true
  }
];

const repoUrl = "https://github.com/jdf2e/rocketact";
const baseUrl = "/";

const siteConfig = {
  title: "Rocketact", // Title for your website.
  tagline: "🚀 Developing React projects with ease",
  url: "https://rocketact.js.org", // Your website URL
  baseUrl, // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: "rocketact",
  organizationName: "jdf2e",
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'
  editUrl:`${repoUrl}/edit/master/docusaurus/docs/`,

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: "getting-started", label: "Docs" },
    { href: repoUrl, label: "GitHub" }
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: "img/rocketact.png",
  footerIcon: "img/rocketact.png",
  favicon: "img/favicon.png",

  /* Colors for website */
  colors: {
    primaryColor: "#212121",
    secondaryColor: "#424242"
  },
  algolia: {
    apiKey: '54dc1e803306b3c7b9c9da789d0b7cf6',
    indexName: 'rocketact',
    algoliaOptions: {} // Optional, if provided by Algolia
  },
  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © 2018-present Rocketact documentation authors.`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "monokai"
  },
  usePrism: ['jsx'],

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    "https://buttons.github.io/buttons.js",
    "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
    `/js/scrollspy.js`,
    `/js/code-block-buttons.js`,
    '/js/hotjar.js',
    "https://s23.cnzz.com/z_stat.php?id=1276787744&web_id=1276787744"
  ],
  stylesheets: [
    // `/css/scrollspy.css`,
    // `/css/code-block-buttons.css`
  ],
  // On page navigation for the current documentation page.
  onPageNav: "separate",
  // No .html extensions for paths.
  cleanUrl: true,
  cname: "rocketact.js.org",
  // Open Graph and Twitter card images.
  ogImage: "img/rocketact.png",
  twitterImage: "img/rocketact.png",

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl
};

module.exports = siteConfig;

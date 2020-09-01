require("dotenv").config();
const {
  api: { projectId, dataset },
} = requireConfig("../studio/sanity.json");

module.exports = {
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-theme-ui",
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId,
        dataset,
        // To enable preview of drafts, copy .env-example into .env,
        // and add a token with read permissions
        token: process.env.SANITY_TOKEN,
        watchMode: true,
        overlayDrafts: true,
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        allowList: ["GOOGLE_ANALYTICS_TRACKING_ID", "DISQUS_NAME"],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
    "gatsby-plugin-client-side-redirect", // keep it in last in list
    "gatsby-plugin-meta-redirect",
  ],
};

/**
 * We're requiring a file in the studio folder to make the monorepo
 * work "out-of-the-box". Sometimes you would to run this web frontend
 * in isolation (e.g. on codesandbox). This will give you an error message
 * with directions to enter the info manually or in the environment.
 */

function requireConfig(path) {
  try {
    return require(path);
  } catch (e) {
    console.error(
      "Failed to require sanity.json. Fill in projectId and dataset name manually in gatsby-config.js"
    );
    return {
      api: {
        projectId: process.env.SANITY_PROJECT_ID || "",
        dataset: process.env.SANITY_DATASET || "",
      },
    };
  }
}

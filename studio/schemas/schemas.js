// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import blockContent from "./blockContent";
import blockText from "./blockText";
import category from "./category";
import personalInfo from "./personalInfo";
import embeddedComponent from "./embeddedComponent";
import experience from "./experience";
import figure from "./figure";
import internalLink from "./internalLink";
import link from "./link";
import mainImage from "./mainImage";
import page from "./page";
import post from "./post";
import preview from "./preview";
import project from "./project";
import redirect from "./redirect";
import siteSettings from "./siteSettings";
import slideshow from "./slideshow";
import stringProp from "./stringProp";
import technology from "./technology";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    blockContent,
    blockText,
    category,
    personalInfo,
    embeddedComponent,
    experience,
    figure,
    internalLink,
    link,
    mainImage,
    page,
    preview,
    post,
    project,
    redirect,
    siteSettings,
    slideshow,
    stringProp,
    technology,

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ]),
});

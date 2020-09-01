import { MdInfo } from "react-icons/md";

export default {
  name: "personalInfo",
  title: "Organization Info",
  type: "document",
  // You probably want to uncomment the next line once you've made a personalInfo document in the Studio. This will remove the personalInfo document type from the create-menus.
  __experimental_actions: ["update", "publish" /* 'create', 'delete' */],
  icon: MdInfo,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
    },
    {
      name: "profile",
      title: "Profile picture",
      type: "image",
    },
    {
      name: "bio",
      title: "Bio",
      type: "blockContent",
    },
    {
      type: "array",
      name: "socialMedia",
      title: "Social Media Links",
      of: [{ title: "URL", type: "url" }],
    },
    {
      name: "email",
      title: "Email",
      type: "email",
    },
    {
      name: "github",
      title: "GitHub",
      type: "url",
    },
    {
      name: "linkedIn",
      title: "LinkedIn",
      type: "url",
    },
    {
      name: "facebook",
      title: "Facebook",
      type: "url",
    },
    {
      name: "twitter",
      title: "Twitter",
      type: "url",
    },
    {
      name: "instagram",
      title: "Instagram",
      type: "url",
    },
    {
      name: "city",
      title: "City",
      type: "string",
    },
    {
      name: "country",
      title: "Country",
      type: "string",
    },
  ],
};

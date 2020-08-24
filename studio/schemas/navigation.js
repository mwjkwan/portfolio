import { MdAttachMoney } from "react-icons/md";

export default {
  name: "navigation",
  title: "Navigation",
  type: "document",
  liveEdit: false,
  fields: [
    {
      name: "metadata",
      title: "JSON object representing navigation, outer key 'menuLinks'",
      type: "json",
    },
  ],
  preview: {
    select: {
    },
    prepare({ title = "Navigation" }) {
      return {
        title,
      };
    },
  },
};

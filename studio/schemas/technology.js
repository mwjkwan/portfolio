import { MdApps } from "react-icons/md";

export default {
  name: "technology",
  title: "Technology",
  type: "document",
  icon: MdApps,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};

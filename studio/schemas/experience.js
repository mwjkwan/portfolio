import { MdDescription } from "react-icons/md";

export default {
  name: "experience",
  title: "Experience",
  type: "document",
  icon: MdDescription,
  liveEdit: false,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "position",
      title: "Position",
      type: "string",
    },
    {
      name: "url",
      title: "Company URL",
      type: "url",
    },
    {
      name: "companyTagline",
      title: "Company elevator pitch",
      type: "string",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "startDate",
      title: "Start date",
      type: "datetime",
    },
    {
      name: "endDate",
      title: "End date",
      type: "datetime",
    },
    {
      name: "description",
      title: "Description",
      description: "Action + impact, with metrics.",
      type: "blockContent",
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
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};

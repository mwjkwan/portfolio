export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Some frontend will require a slug to be set to be able to show the project",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "mainImage",
    },
    {
      name: "startDate",
      title: "Start date",
      type: "datetime",
    },
    {
      name: "publishedAt",
      title: "Published at",
      description:
        "You can use this field to schedule projects where you show them",
      type: "datetime",
    },
    {
      name: "layout",
      title: "Layout",
      type: "string",
      description:
        "Choose Default for stories with the typical header styles and Custom for fully interactive pieces.",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Side Header", value: "sideHeader" },
          { title: "Full Image", value: "fullImage" },
          { title: "Custom", value: "custom" },
        ],
      },
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "blockText",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "reference", to: { type: "technology" } }],
    },
    {
      name: "relatedProjects",
      title: "Related projects",
      type: "array",
      of: [{ type: "reference", to: { type: "project" } }],
    },
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      image: "mainImage",
    },
    prepare({ title = "No title", publishedAt, image }) {
      return {
        title,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString()
          : "Missing publishing date",
        media: image,
      };
    },
  },
  initialValue: {
    layout: "default",
  },
};

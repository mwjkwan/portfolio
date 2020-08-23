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
          { title: "Stacked Header", value: "stackHeader" },
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
      name: "facebookUrl",
      title: "Facebook post link",
      type: "url",
    },
    {
      name: "members",
      title: "Members",
      type: "array",
      of: [{ type: "projectMember" }],
    },
    {
      name: "dataset",
      title: "Dataset",
      type: "array",
      of: [{ type: "reference", to: { type: "dataset" } }],
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
      name: "subjects",
      title: "Subjects",
      type: "array",
      of: [{ type: "reference", to: { type: "subject" } }],
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

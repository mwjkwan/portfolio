import S from "@sanity/desk-tool/structure-builder";
import { MdInfo, MdSettings } from "react-icons/md";
import { FaFile } from "react-icons/fa";

const hiddenTypes = [
  "category",
  "personalInfo",
  "page",
  "position",
  "post",
  "project",
  "redirect",
  "siteSettings",
  "technology",
];

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Projects")
        .schemaType("project")
        .child(S.documentTypeList("project")),
      S.listItem()
        .title("Blog posts")
        .schemaType("post")
        .child(S.documentTypeList("post").title("Blog posts")),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Home")
                .child(
                  S.editor()
                    .id("homePage")
                    .schemaType("page")
                    .documentId("home")
                )
                .icon(FaFile),
              S.listItem()
                .title("Projects")
                .child(
                  S.editor()
                    .id("projectsPage")
                    .schemaType("page")
                    .documentId("projects")
                )
                .icon(FaFile),
              S.listItem()
                .title("Philosophy")
                .child(
                  S.editor()
                    .id("philosophyPage")
                    .schemaType("page")
                    .documentId("philosophy")
                )
                .icon(FaFile),
              S.listItem()
                .title("Portfolio")
                .child(
                  S.editor()
                    .id("portfolioPage")
                    .schemaType("page")
                    .documentId("portfolio")
                )
                .icon(FaFile),
              S.listItem()
                .title("Blog")
                .child(
                  S.editor()
                    .id("blogPage")
                    .schemaType("page")
                    .documentId("blog")
                )
                .icon(FaFile),
              S.listItem()
                .title("Contact")
                .child(
                  S.editor()
                    .id("contactPage")
                    .schemaType("page")
                    .documentId("contact")
                )
                .icon(FaFile),
            ])
        ),
      S.listItem()
        .title("Work Experiences")
        .schemaType("experience")
        .child(S.documentTypeList("experience").title("Work Experiences")),
      S.listItem()
        .title("Categories")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categories")),
      S.listItem()
        .title("Technologies")
        .schemaType("technology")
        .child(S.documentTypeList("technology").title("Technologies")),
      S.listItem()
        .title("Redirects")
        .schemaType("redirect")
        .child(S.documentTypeList("redirect").title("Redirects")),
      S.listItem()
        .title("Personal Info")
        .child(
          S.editor()
            .id("personalInfo")
            .schemaType("personalInfo")
            .documentId("personalInfo")
        )
        .icon(MdInfo),
      S.listItem()
        .title("Site Settings")
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        )
        .icon(MdSettings),
      ...S.documentTypeListItems().filter(
        (listItem) => !hiddenTypes.includes(listItem.getId())
      ),
    ]);

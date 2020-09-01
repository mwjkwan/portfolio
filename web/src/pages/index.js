import React from "react";
import { graphql } from "gatsby";
import { Grid, Image, Styled, Text } from "theme-ui";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockContent from "../components/block-content";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
import Experience from "../components/experience";
import SEO from "../components/core/seo";
import Section from "../components/core/section";
import Layout from "../containers/layout";
import PreviewGrid from "../components/article-layouts/preview-grid";
import Spacer from "../components/core/spacer";

export const query = graphql`
  query IndexPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)home/" }) {
      id
      title
      _rawBody(resolveReferences: { maxDepth: 5 })
      _rawBodySecondary(resolveReferences: { maxDepth: 5 })
    }
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    personalInfo: sanityPersonalInfo(_id: { regex: "/(drafts.|)personalInfo/" }) {
      name
      _rawLogo
      _rawProfile
      _rawBio
    }
    experience: allSanityExperience(sort: {fields: endDate, order: DESC}) {
      edges {
        node {
          name
          url
          companyTagline
          position
          _rawDescription
          startDate
          endDate
        }
      }
    }
    projects: allSanityProject(
      limit: 3
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          technologies {
            title
          }
          slug {
            current
          }
        }
      }
    }
  }
`;

const IndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;

  const personalInfo = (data || {}).personalInfo;

  const experienceNodes = (data || {}).experience
    ? mapEdgesToNodes(data.experience)
    : [];

  const profileStyle = {
    marginLeft: "50px",
    maxWidth: "80%",
    boxShadow: "-30px 30px 0px #CCCEC4",
  }

  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs)
    : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const page = data && data.page;

  if (!page) {
    throw new Error(
      'Missing "Home" page data. Open the studio at http://localhost:3333 and add "Home" page data and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <br />
        <Grid gap={4} columns={[1, 1, "3fr 5fr"]}>
          {personalInfo._rawProfile && (
            <Image
              src={imageUrlFor(buildImageObj(personalInfo._rawProfile)).width(600).url()}
              alt={"Melissa Kwan profile picture"}
              style={profileStyle}
            />
          )}
          <div style={{ display: "flex", alignItems: "center", maxWidth: "600px" }}>
            <div>
              Hi, my name is
              <Styled.h1 style={{ marginTop: "10px" }}>{personalInfo.name}.</Styled.h1>
              <BlockContent blocks={personalInfo._rawBio || []} />
            </div>
          </div>
        </Grid>
        <Spacer height={6} />
        <Container>
          <Styled.h2 style={{ marginTop: "10px" }}>Where I've worked</Styled.h2>
          <Experience nodes={experienceNodes} />
        </Container>
        <Spacer height={6} />
        <Container maxWidth={"800px"}>
          <Styled.h2 style={{ marginTop: "10px" }}>Featured projects</Styled.h2>
          {projectNodes && (
            <PreviewGrid
              nodes={projectNodes}
              horizontal
              columns={1}
              browseMoreHref="/projects"
            />
          )}
        </Container>
      </Container>
    </Layout>
  );
};

export default IndexPage;

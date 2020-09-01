import React from "react";
import { graphql } from "gatsby";
import { Grid, Image, Styled, Text } from "theme-ui";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockContent from "../components/block-content";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
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
    projects: allSanityProject(
      limit: 10
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
        <Grid gap={6} columns={[1, 1, "2fr 5fr"]}>
          {personalInfo._rawProfile && (
            <Image
              src={imageUrlFor(buildImageObj(personalInfo._rawProfile)).width(600).url()}
              alt={"Melissa Kwan profile picture"}
              style={{
                marginLeft: "50px",
                boxShadow: "-50px 50px 0px #DECCCC",
              }}
            />
          )}
          <div style={{ verticalAlign: "middle" }}>
            Hi, my name is
            <Styled.h1 style={{ marginTop: "10px" }}>{personalInfo.name}.</Styled.h1>
            <BlockContent blocks={personalInfo._rawBio || []} />
          </div>
        </Grid>
        <br />
        <Grid gap={6} columns={[1, 1, "3fr 1fr"]}>
          {projectNodes && (
            <PreviewGrid
              nodes={projectNodes}
              featured
              featuredHorizontal
              container
              browseMoreHref="/projects/2"
            />
          )}
          <div
            className="small preview"
            style={{
              position: "-webkit-sticky",
              position: "sticky",
              top: 0,
            }}
          >
            <BlockContent blocks={page._rawBody || []} />
            <Spacer height={5} />
            <Section header="Quick Links">
              <BlockContent blocks={page._rawBodySecondary || []} />
            </Section>
          </div>
        </Grid>
      </Container>
    </Layout>
  );
};

export default IndexPage;

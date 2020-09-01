/** @jsx jsx */
import { jsx, Grid } from "theme-ui";
import { graphql } from "gatsby";
import BlockContent from "../components/block-content";
import Container from "../components/core/container";
import GraphQLErrorList from "../components/core/graphql-error-list";
import SEO from "../components/core/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query PortfolioPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)portfolio/" }) {
      id
      title
      _rawBody(resolveReferences: { maxDepth: 5 })
      _rawBodySecondary(resolveReferences: { maxDepth: 5 })
    }
  }
`;

const PortfolioPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const page = data && data.page;

  if (!page) {
    throw new Error(
      'Missing "Portfolio" page data. Open the studio at http://localhost:3333 and add "Portfolio" page data and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO title={page.title} />
      <Container>
        <BlockContent blocks={page._rawBody || []} />
      </Container>
    </Layout>
  );
};

export default PortfolioPage;

/** @jsx jsx */
import { jsx, Styled, Grid } from "theme-ui";
import { graphql } from "gatsby";
import BlockContent from "../components/block-content";
import Container from "../components/core/container";
import BannerHeader from "../components/core/banner-header";
import GraphQLErrorList from "../components/core/graphql-error-list";
import SEO from "../components/core/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query ContactPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)contact/" }) {
      title
      _rawBody(resolveReferences: { maxDepth: 5 })
      _rawBodySecondary(resolveReferences: { maxDepth: 5 })
    }
  }
`;

const ContactPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const page = data.page;

  if (!page) {
    throw new Error(
      'Missing "Contact" page data. Open the studio at http://localhost:3333 and add "Contact" page data and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO title={page.title} />
      <Container>
        <Styled.h1>Get in touch</Styled.h1>
        <Grid gap={5} columns={[1, "1fr 2fr", "1fr 2fr"]}>
          <BlockContent blocks={(page._rawBody && page._rawBody[0]) || []} />
          <BlockContent
            blocks={(page._rawBody && page._rawBody.slice(1)) || []}
          />
        </Grid>
      </Container>
    </Layout>
  );
};
ContactPage.defaultProps = {
  data: {
    page: {
      title: "No title",
    },
  },
};
export default ContactPage;

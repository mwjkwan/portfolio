import { graphql, StaticQuery } from "gatsby";
import React, { useState } from "react";
import { ThemeProvider, Styled } from "theme-ui";
import Helmet from "react-helmet";
import theme from "../styles/theme.js";
import Layout from "../components/core/layout";
import favicon from "../assets/favicon.ico";

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
    }
    navigation: sanityNavigation {
      _rawMetadata
    }
    personalInfo: sanityPersonalInfo(
      _id: { regex: "/(drafts.|)personalInfo/" }
    ) {
      name
      _rawLogo
      _rawProfile
      _rawBio
      socialMedia
      email
      github
      linkedIn
      facebook
      twitter
      instagram
      city
    }
  }
`;

function LayoutContainer(props) {
  const [showNav, setShowNav] = useState(false);
  function handleShowNav() {
    setShowNav(true);
  }
  function handleHideNav() {
    setShowNav(false);
  }
  return (
    <ThemeProvider theme={theme}>
      <Styled.root>
        <Helmet>
          <link rel="icon" href={favicon} />
        </Helmet>
        <StaticQuery
          query={query}
          render={(data) => {
            return (
              <Layout
                {...props}
                logo={data.personalInfo._rawLogo}
                showNav={showNav}
                personalInfo={data.personalInfo}
                menuLinks={data.navigation._rawMetadata.menuLinks}
                siteTitle={data.site.title}
                onHideNav={handleHideNav}
                onShowNav={handleShowNav}
              />
            );
          }}
        />
      </Styled.root>
    </ThemeProvider>
  );
}

export default LayoutContainer;

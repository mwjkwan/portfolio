/** @jsx jsx */
import React, { useState } from "react";
import { jsx, Button, Input, Grid } from "theme-ui";
import { SocialIcon } from "react-social-icons";
import Header from "./header";
import Container from "./container";
import Link from "./link";

const socialIconStyles = {
  height: 35,
  width: 35,
  marginRight: "0.7em",
};

const Layout = ({
  children,
  personalInfo,
  logo,
  menuLinks,
  onHideNav,
  onShowNav,
  showNav,
  siteTitle,
}) => (
  <>
    <Header
      siteTitle={siteTitle}
      logo={logo}
      menuLinks={menuLinks}
      onHideNav={onHideNav}
      onShowNav={onShowNav}
      showNav={showNav}
    />
    <div className="pageContent" sx={{ minHeight: "70vh", mb: 5 }}>
      {children}
    </div>
    <footer>
      <div sx={{ bg: "charcoal", pt: 3, pb: 3 }}>
        <Container>
          <SocialIcon
            url={personalInfo.github}
            fgColor="#FFFFFF"
            style={socialIconStyles}
          />
          <SocialIcon
            url={personalInfo.linkedIn}
            fgColor="#FFFFFF"
            style={socialIconStyles}
          />
          <SocialIcon
            url={`mailto:${personalInfo.email}`}
            fgColor="#FFFFFF"
            style={socialIconStyles}
          />
        </Container>
      </div>
      <div sx={{ bg: "container", fontSize: 1, pt: 4, pb: 4 }}>
        <Container>
          <Grid columns={[1, "1fr 1fr", "2fr 1fr"]}>
            <div>
              {personalInfo && (
                <div>
                  <b>{personalInfo.name}</b>
                </div>
              )}
              <div>
                © 2016-{new Date().getFullYear()}, Built with{" "}
                <Link href="https://www.sanity.io" variant="highlighted">
                  <b>Sanity</b>
                </Link>{" "}
                &amp;
                {` `}
                <Link href="https://www.gatsbyjs.org" variant="highlighted">
                  <b>Gatsby</b>
                </Link>
              </div>
              <br />
              <div>
                <b>Resources</b>
                <br />
                <Link href="https://docs.hodp.org">Docs</Link>
                <br />
                <Link href="http://wiki.hodp.org/wiki/Main_Page">Harvard Wiki</Link>
                <br />
                <br />
                {`The code for this website is `}
                <Link
                  href="https://github.com/HarvardOpenData"
                  variant="highlighted"
                >
                  <b>open source.</b>
                </Link>
              </div>
            </div>
            <div>
              HI
            </div>
          </Grid>
        </Container>
      </div>
    </footer>
  </>
);

export default Layout;

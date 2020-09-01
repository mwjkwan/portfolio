/** @jsx jsx */
import React, { useState } from "react";
import { jsx, Button, Input, Grid } from "theme-ui";
import { SocialIcon } from "react-social-icons";
import MobileHeader from "./mobile-header";
import Spacer from "./spacer";
import Container from "./container";
import Link from "./link";

const socialIconStyles = {
  height: 35,
  width: 35,
  marginBottom: "10px",
};

const SocialIcons = ({personalInfo}) => (
  <>
    {(personalInfo.socialMedia || []).map((link, i) =>
      <div>
        <SocialIcon
          key={`social-${i}`}
          url={link}
          fgColor="#FFFFFF"
          style={socialIconStyles}
        />
        <br />
      </div>
    )}
  </>
)

const Layout = ({
  children,
  personalInfo,
  logo,
  menuLinks,
  siteTitle,
}) => (
  <>
    <div sx={{ display: ["initial", "none", "none", "none"] }}>
      <MobileHeader
        siteTitle={siteTitle}
        logo={logo}
        menuLinks={menuLinks}
      />
    </div>
    <Grid gap={[4, 4, 5, 6]} columns={[1, "1fr 5fr"]}>
      <div sx={{ display: ["none", "initial", "initial", "initial"], mt: "150px" }}>
        <div sx={{position: "sticky", top: "150px", textAlign: "right", fontSize: [3, 2, 4, 4], color: "#D3CFCC", fontWeight: "medium",}}>
          {menuLinks.map(x =>
            <div sx={{ mb: 2 }}>
              <Link to={x.link} href={x.link} variant="default">
                {x.name}
              </Link>
            </div>
          )}
          <Spacer height={5} />
          <SocialIcons personalInfo={personalInfo} />
        </div>
      </div>
      <div sx={{ minHeight: "70vh", mt: 5, mb: 5 }}>
        {children}
      </div>
    </Grid>
  </>
);

export default Layout;

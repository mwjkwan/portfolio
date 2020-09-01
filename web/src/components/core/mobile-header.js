/** @jsx jsx */
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import React, { useState } from "react";
import Link from "./link";
import Container from "./container";
import HamburgerMenu from "react-hamburger-menu";
import Fade from "react-reveal/Fade";
import { Collapse } from "react-collapse";
import { jsx, Box, Divider, Flex, Grid, Text } from "theme-ui";

function MenuLink(props) {
  return (
    <Link to={props.link} href={props.link} variant="default">
      {props.children}
    </Link>
  );
}
class MobileHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  componentDidMount() {
    this.setState({
      open: false,
    });
    this.props.menuLinks.forEach((link) => {
      let slug = link.link;
      if (link.submenu && link.submenu.length > 0) {
        this.setState({
          [slug]: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.setState({
      open: false,
    });
  }

  handleClick() {
    this.setState({
      open: !this.state.open,
    });
  }

  renderTopBar() {
    const { logo } = this.props;
    const logoSrc = logo && imageUrlFor(buildImageObj(logo)).width(600).url();
    return (
      <div sx={{ width: "100vw" }}>
        <Container>
          <Flex sx={{ mt: [4] }}>
            <Box sx={{ flex: "1 5 auto" }}>
              <Link to="/">
                <img src={logoSrc} sx={{ maxHeight: "30px" }} alt={logo.alt} />
              </Link>
            </Box>
            <Box
              sx={{
                pt: 1,
                flex: "0 1 auto",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <HamburgerMenu
                isOpen={this.state.open}
                menuClicked={this.handleClick.bind(this)}
                width={30}
                height={20}
                strokeWidth={2}
                rotate={0}
                color="black"
                borderRadius={0}
                animationDuration={0.5}
                sx={{ ":hover": { cursor: "pointer" } }}
              />
            </Box>
          </Flex>
        </Container>
      </div>
    );
  }

  onToggleItem = (slug) => {
    if (slug !== null) {
      this.setState({ [slug]: !this.state[slug] });
    }
  };

  renderMenuItem(i) {
    const link = this.props.menuLinks[i];
    const slug = link.link;

    return (
      <>
        <Grid
          columns={"5fr 1fr"}
          sx={{ alignItems: "center" }}
          onClick={() => this.onToggleItem(slug)}
        >
          <h2
            onClick={this.handleClick.bind(this)}
            sx={{
              color: "text",
              width: "fit-content !important",
              ":hover": { cursor: "pointer !important" },
            }}
          >
            <MenuLink {...link}>{link.name}</MenuLink>
          </h2>
          {link.subMenu && link.subMenu.length > 0 && (
            <h2
              onClick={() => this.onToggleItem(slug)}
              sx={{
                fontSize: "5",
                margin: "0",
                ":hover": { cursor: "pointer" },
              }}
            >
              {!this.state[slug] ? "+" : "-"}
            </h2>
          )}
        </Grid>
        <Collapse
          sx={{ transition: "height 500ms" }}
          isOpened={this.state[slug] === true}
        >
          {link.subMenu &&
            link.subMenu.map((subLink) => (
              <Text
                onClick={() => this.handleClick()}
                sx={{
                  color: "text",
                  fontSize: 2,
                  mb: 2,
                  width: "fit-content !important",
                  ":hover": { cursor: "pointer !important" },
                }}
              >
                <MenuLink {...subLink}>{subLink.name}</MenuLink>
              </Text>
            ))}
        </Collapse>
      </>
    );
  }

  renderMenuItems() {
    const { menuLinks } = this.props;
    return (
      <Fade>
        <div
          sx={{
            width: "100vw",
            minHeight: "95vh",
            color: "primary",
            bg: "light",
            padding: "1.5em",
          }}
        >
          {menuLinks.map((_link, i) => (
            <>
              {this.renderMenuItem(i)}
              <Divider color="grey" />
            </>
          ))}
        </div>
      </Fade>
    );
  }

  render() {
    const { open } = this.state;
    return (
      <>
        {this.renderTopBar()}
        {open && this.renderMenuItems()}
      </>
    );
  }
}

export default MobileHeader;

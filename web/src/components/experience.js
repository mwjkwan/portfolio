/** @jsx jsx */
import React, { useState } from "react";
import { jsx, Styled, Text } from "theme-ui";
import { format } from "date-fns";
import Link from "./core/link";
import Container from "./core/container";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import BlockContent from "../components/block-content";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => (
  {
    root: {
      display: "flex",
      flexGrow: 1,
      minHeight: 224,
      maxWidth: "90vw",
    },
    tabs: {
      borderRight: `1px solid #D3CFCC`,
    },
  }
));

const useHorizontalStyles = makeStyles((orientation) => (
  {
    root: {
      maxWidth: "90vw",
    },
    tabs: {
      borderRight: `1px solid #D3CFCC`,
    },
}));

function Content({ node, i }) {
  return (
    <div>
      <Styled.h3 style={{ marginTop: "10px", marginBottom: "10px" }}>
        {node.position}
        <Link
          variant="highlighted"
          href={node.url}
        >{` @ ${node.name}`}</Link>
      </Styled.h3>
      <Text variant="caps">
        {format(new Date(node.startDate), "MMMM YYYY")}
        {` – `}
        {node.endDate
          ? format(new Date(node.endDate), "MMMM YYYY")
          : "PRESENT"}
      </Text>
      <div class="small">
        <BlockContent blocks={node._rawDescription || []} />
      </div>
    </div>
  )
}

function VerticalExperience({ nodes }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation={"vertical"}
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        {nodes.map((node, i) => (
          <Tab
            disableRipple
            label={node.name || "Untitled"}
            {...a11yProps(i)}
          />
        ))}
      </Tabs>
      {nodes.map((node, i) => (
        <TabPanel value={value} index={i}>
          <Container maxWidth={"600px"}>
            <Content node={node} i={i} />
          </Container>
        </TabPanel>
      ))}
    </div>
  );
}

function HorizontalExperience({ nodes }) {
  const classes = useHorizontalStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabs}
        variant="scrollable"
        scrollButtons="auto"
        width="90vw"
      >
        {nodes.map((node, i) => (
          <Tab
            disableRipple
            label={node.name || "Untitled"}
            {...a11yProps(i)}
          />
        ))}
      </Tabs>
      <br/>
      {nodes.map((node, i) => (
        <TabPanel value={value} index={i}>
            <Content node={node} i={i} />
        </TabPanel>
      ))}
    </div>
  );
}

function Experience({ nodes, orientation }) {
  return (
    <div>
      <div sx={{ display: ["initial", "initial", "none", "none"]}}>
        <HorizontalExperience nodes={nodes}  orientation={"horizontal"}/>
      </div>
      <div sx={{ display: ["none", "none", "initial", "initial"]}}>
        <VerticalExperience nodes={nodes} orientation={"vertical"}/>
      </div>
    </div>
  );
}

export default Experience;

/** @jsx jsx */
import React from 'react';
import { jsx, Styled, Text } from "theme-ui";
import { format } from "date-fns";
import Link from "./core/link";
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import BlockContent from "../components/block-content"

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
      {value === index && (
        <Box pl={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid #D3CFCC`,
  },
}));

function Experience({ nodes }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {nodes.map((node, i) =>
          <Tab disableRipple label={node.name || "Untitled"} {...a11yProps(i)} />
        )}
      </Tabs>
      {nodes.map((node, i) =>
        <TabPanel value={value} index={i}>
          <div style={{ maxWidth: "600px" }}>
            <Styled.h3 style={{ marginTop: "10px", marginBottom: "10px" }}>
              {node.position}
              <Link variant="highlighted" href={node.url}>{` @ ${node.name}`}</Link>
            </Styled.h3>
            <Text variant="caps">
              {format(new Date(node.startDate), "MMMM YYYY")}
              {` – `}
              {node.endDate ? format(new Date(node.endDate), "MMMM YYYY") : "PRESENT"}
            </Text>
            <BlockContent small blocks={node._rawDescription || []} />
          </div>
        </TabPanel>
      )}
    </div>
  );
}

export default Experience;

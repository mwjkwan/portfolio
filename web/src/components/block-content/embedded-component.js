/** @jsx jsx */
import { jsx } from "theme-ui";
import WheelOfFortune from "../../interactives/wheel-of-fortune";
import CovidMap from "../../interactives/covid-dashboard/covidmap";
import StateGraph from "../../interactives/covid-dashboard/stategraph";
import CountryGraph from "../../interactives/covid-dashboard/countrygraph";
import CovidGraphPanel from "../../interactives/covid-dashboard/covid-graph-panel";

function EmbeddedComponent(component) {
  let props = {};
  component.props &&
    component.props.forEach((pair) => {
      props[pair.name] = pair.value;
    });
  switch (component.name) {
    case "WheelOfFortune":
      return <WheelOfFortune {...props} />;
    case "CovidMap":
      return <CovidMap />;
    case "CountryGraph":
      return <CountryGraph />;
    case "StateGraphCumulative":
      return <StateGraph sort={"cumulative"} />;
    case "StateGraphDaily":
      return <StateGraph sort={"daily"} />;
    case "CovidGraphPanel":
      return <CovidGraphPanel />;

    default:
      return (
        <p>Missing React Component (check whether you named it correctly!)</p>
      );
  }
}

export default EmbeddedComponent;

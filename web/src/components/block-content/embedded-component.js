/** @jsx jsx */
import { jsx } from "theme-ui";

function EmbeddedComponent(component) {
  let props = {};
  component.props &&
    component.props.forEach((pair) => {
      props[pair.name] = pair.value;
    });
  switch (component.name) {
    default:
      return (
        <p>Missing React Component (check whether you named it correctly!)</p>
      );
  }
}

export default EmbeddedComponent;

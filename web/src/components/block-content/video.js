import React from "react";
import { Embed } from "theme-ui";

function Video(props) {
  return (
    <div>
      <br />
      <Embed src={props.url} />
      <br />
    </div>
  );
}

export default Video;

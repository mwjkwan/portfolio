/** @jsx jsx */
import { jsx } from "theme-ui";
import CustomArticle from "../article-layouts/custom-article";
import SideHeaderArticle from "../article-layouts/side-header-article";
import FullImageArticle from "../article-layouts/full-image-article";
import StackHeaderArticle from "../article-layouts/stack-header-article";

function Project(props) {
  switch (props.layout) {
    case "custom":
      return <CustomArticle {...props} />;
    case "fullImage":
      return <FullImageArticle {...props} />;
    case "sideHeader":
      return <StackHeaderArticle {...props} />;
    default:
      return <SideHeaderArticle {...props} />;
  }
}

export default Project;

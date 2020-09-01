/** @jsx jsx */
import { jsx, Grid } from "theme-ui";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import ArticleBody from "./article-body";
import ArticleHeader from "./article-header";
import Container from "../core/container";

function SideHeader(props) {
  const { mainImage } = props;

  return (
    <Container>
      <Grid pt={3} gap={[3, 4, 5]} columns={[1, "1fr 1fr", "2.5fr 1fr"]}>
        {props.mainImage && mainImage.asset && (
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((5 / 8) * 1200))
              .fit("crop")
              .url()}
            alt={mainImage.alt}
            sx={{ maxWidth: "100%", mb: [3, 0, 0] }}
          />
        )}
        <div sx={{ display: "flex", alignItems: "center" }}>
          <ArticleHeader {...props} />
        </div>
      </Grid>
    </Container>
  );
}

function SideHeaderArticle(props) {
  return (
    <div>
      <SideHeader {...props} />
      <ArticleBody {...props} />
    </div>
  );
}

export default SideHeaderArticle;

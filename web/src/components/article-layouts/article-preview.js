/** @jsx jsx */
import { jsx, Badge, Grid, Styled, Text } from "theme-ui";
import Link from "../core/link";
import { buildImageObj, formatDate } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import BlockText from "../core/block-text";
import ArticleByline from "./article-byline";

function PreviewText(props) {
  return (
    <div>
      <Link to={props.newLink}>
        <Text variant={props.headerAs ? props.headerAs : "h3"}>
          {props.title}
        </Text>
      </Link>
      {props._rawExcerpt && <BlockText blocks={props._rawExcerpt} />}
      <Text fontFamily="mono">
        {props.technologies &&
          props.technologies.map((item, i) => (
            <Badge variant="outline" mr={2}>
              {item.title}
            </Badge>
          ))}
      </Text>
      {props.children}
    </div>
  );
}

function HorizontalArticlePreview(props) {
  const containerStyles = {
    display: "flex",
    alignItems: "center",
    pr: 3,
  };
  return (
    <div
      className="small preview"
      sx={{ bg: props.container ? "container" : "none" }}
    >
      <Grid gap={props.gap || 3} columns={props.columns || ["1fr 2fr"]}>
        <Link to={props.newLink}>
          {props.mainImage && props.mainImage.asset && (
            <img
              src={imageUrlFor(buildImageObj(props.mainImage))
                .width(1200)
                .height(Math.floor((5 / 8) * 1200))
                .url()}
              sx={{
                width: "100%",
                objectFit: "cover",
              }}
              alt={props.mainImage.alt}
            />
          )}
        </Link>
        <div sx={(props.container || props.size == "large") && containerStyles}>
          <PreviewText {...props} link={props.link}>
            {props.children}
          </PreviewText>
        </div>
      </Grid>
    </div>
  );
}

function VerticalArticlePreview(props) {
  return (
    <div
      className="small preview"
      sx={{ width: "100%", bg: props.container ? "container" : "#FFFFFF" }}
    >
      <Link to={props.newLink}>
        <div>
          {props.mainImage && props.mainImage.asset && (
            <img
              src={imageUrlFor(buildImageObj(props.mainImage))
                .width(600)
                .height(Math.floor((5 / 8) * 600))
                .url()}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt={props.mainImage.alt}
            />
          )}
        </div>
      </Link>
      <div className={`${props.size}-block`} sx={props.container && { p: [3] }}>
        {!props.container && <br />}
        <PreviewText {...props} link={props.link}>
          {props.children}
        </PreviewText>
      </div>
    </div>
  );
}

function ArticlePreview(props) {
  const newLink =
    props.type === "blog" ? `/blog/${props.link}` : `/projects/${props.link}`;
  // Collapse large horizontal previews to vertical
  if (props.horizontal && props.size === "large") {
    return (
      <div>
        <div sx={{ display: ["none", "initial", "initial"] }}>
          <HorizontalArticlePreview newLink={newLink} {...props} />
        </div>
        <div sx={{ display: ["initial", "none", "none"] }}>
          <VerticalArticlePreview
            newLink={newLink}
            headerAs={null}
            {...props}
          />
        </div>
      </div>
    );
  }
  return props.horizontal ? (
    <HorizontalArticlePreview {...props} newLink={newLink} />
  ) : (
    <VerticalArticlePreview {...props} newLink={newLink} />
  );
}

export default ArticlePreview;

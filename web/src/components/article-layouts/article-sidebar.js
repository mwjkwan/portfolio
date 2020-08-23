/** @jsx jsx */
import { jsx, Divider, Grid, Styled, Text } from "theme-ui";
import { format, distanceInWords, differenceInDays } from "date-fns";
import RoleList from "./role-list";
import ArticlePreview from "./article-preview";
import Section from "../core/section";

// Creates a sidebar with all available props
function ArticleSidebar(props) {
  const {
    categories,
    subjects,
    authors,
    members,
    publishedAt,
    relatedProjects,
  } = props;
  const labels = [
    ...(subjects ? subjects : []),
    ...(categories ? categories : []),
  ];
  const numLabels = labels.length;

  return (
    <aside>
      {publishedAt && (
        <Section>
          <Text variant="small">
            {differenceInDays(new Date(publishedAt), new Date()) > 3
              ? distanceInWords(new Date(publishedAt), new Date())
              : format(new Date(publishedAt), "MM-DD-YYYY")}
          </Text>
        </Section>
      )}
      {members && members.length > 0 && (
        <Section>
          <RoleList items={members} title="Contributors" />
        </Section>
      )}
      {authors && authors.length > 0 && (
        <Section>
          <RoleList items={authors} title="Authors" />
        </Section>
      )}
      {labels && labels.length > 0 && (
        <Section>
          <Styled.h4>Filed under</Styled.h4>
          {labels.map((item, i) =>
            i < numLabels - 1 ? (
              <span key={item._id}>
                {item.title}
                {`, `}
              </span>
            ) : (
              <span key={item._id}>{item.title}</span>
            )
          )}
        </Section>
      )}
      {relatedProjects && relatedProjects.length > 0 && (
        <Section>
          <Styled.h4>Related projects</Styled.h4>
          <Grid columns={[1]}>
            {relatedProjects.map((project) => (
              <ArticlePreview
                key={`related_${project._id}`}
                title={project.title}
                mainImage={project._rawMainImage}
                image={project._rawMainImage}
                link={`/project/${project.slug.current}`}
                horizontal
                headerAs={"medium"}
              />
            ))}
          </Grid>
        </Section>
      )}
    </aside>
  );
}

export default ArticleSidebar;

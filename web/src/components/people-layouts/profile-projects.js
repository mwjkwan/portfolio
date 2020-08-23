import React from "react";
import { Card, Grid } from "theme-ui";
import Section from "../core/section";
import ProjectPreviewGrid from "../project-layouts/project-preview-grid";
import { useState } from "react";

// Shout-out to Alex for doing this in the data catalog first so I can mooch now :)
function ProfileProjects(props) {
  // TODO Better to define a schema in sanity for contribution type and mapping from type to role!
  // So that future devs can update just the schemas and don't have to track down this component
  const subjects = [
    "Projects",
    "Contributions",
    "Editing",
    "Design",
    "Blog posts",
    "All",
  ];
  const [activeCategory, setActiveCategory] = useState("Projects");
  const cards = subjects.map((subject) => {
    const included = activeCategory === subject;
    return (
      <Card
        variant="list"
        sx={{
          backgroundColor: included ? "primary" : "inherit",
          color: included ? "background" : "inherit",
          wordWrap: "break-word",
          "&:hover": {
            bg: included ? "primary" : "muted",
          },
        }}
        onClick={() => {
          setActiveCategory(subject);
        }}
      >
        {subject}
      </Card>
    );
  });
  const role_dict = {
    Projects: ["author", "developer"],
    Editing: ["editor", "manager"],
    Illustrations: ["designer", "illustrator"],
    Contributions: ["contributor"],
  };
  let nodes;
  if (activeCategory === "Blog posts") {
    nodes = props.blog;
  } else if (activeCategory === "All") {
    nodes = props.projects.concat(props.blog);
  } else {
    nodes = props.projects.filter((project) => {
      var person = project._rawMembers.filter((p) => {
        return p.person.id === props.id;
      });
      for (let role in role_dict[activeCategory]) {
        if (
          person[0].roles &&
          person[0].roles.indexOf(role_dict[activeCategory][role]) !== -1
        ) {
          return true;
        }
      }
      return false;
    });
  }

  return (
    <div>
      <br></br>
      <Section header={"Latest Work"}>
        <Grid gap={4} columns={[1, "2fr 4fr", "1fr 4fr 1fr"]}>
          <div>
            <br></br>
            {cards}
          </div>
          <div>
            <div>
              <br></br>
              {nodes && (
                <ProjectPreviewGrid nodes={nodes} horizontal columns={[1]} />
              )}
            </div>
          </div>
        </Grid>
      </Section>
    </div>
  );
}

export default ProfileProjects;

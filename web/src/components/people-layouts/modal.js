import React from "react";
import { Container, Grid, Button, Styled, Image, Text } from "theme-ui";
import BlockText from "../core/block-text";
import { buildImageObj } from "../../lib/helpers";
import { imageUrlFor } from "../../lib/image-url";
import Link from "../core/link";
import defaultProfile from "../../assets/default-profile.jpg";

export default class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }
    const {
      image,
      name,
      _rawBio,
      position,
      concentration,
      house,
      year,
    } = this.props.data;
    return (
      <div className="modal" id="modal">
        <div className="modal-content">
          <Container>
            <Grid gap={4} columns={[1, 2, "1fr 2fr"]}>
              <div>
                {image && image.asset && (
                  <div className="default-profile">
                    <Link to={`/people/${this.props.data.slug.current}`}>
                      <Image
                        src={imageUrlFor(buildImageObj(image))
                          .width(500)
                          .height(500)
                          .fit("crop")
                          .url()}
                      />
                    </Link>
                  </div>
                )}
                {!image && (
                  <div className="default-profile">
                    <Image src={defaultProfile} />
                  </div>
                )}
              </div>
              <div>
                <div className="close-button">
                  <Button
                    bg="white"
                    color="deep"
                    text="strong"
                    onClick={this.props.closeModal}
                  >
                    X
                  </Button>
                </div>
                {name && (
                  <div className="profile-name">
                    <Link to={`/people/${this.props.data.slug.current}`}>
                      <Text variant="h2">{name}</Text>
                    </Link>
                  </div>
                )}
                {position.title && (
                  <Styled.p className="profile-title">
                    {position.title}
                  </Styled.p>
                )}
                <div className="very-small">
                  {concentration && concentration + ", "}
                  {house && house + " "}
                  {year && year + " "}
                </div>
                {_rawBio && (
                  <div className="small preview" id="small-bio">
                    <BlockText blocks={_rawBio} />
                  </div>
                )}
                <div className="modal-buttons">
                  <Link to={`/people/${this.props.data.slug.current}`}>
                    <Button>View HODP Work</Button>
                  </Link>
                </div>
              </div>
            </Grid>
          </Container>
        </div>
      </div>
    );
  }
}

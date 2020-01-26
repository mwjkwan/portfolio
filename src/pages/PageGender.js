import React from 'react';
import { Component } from 'react';

export default class PageGender extends Component {
  render() {
    return (
      <div>
        <div>
          <h3>Gender Policy 2019</h3>
          <h4>Key Goals:</h4>
          <p>
            Treat everyone equally by building in a third gender option just
            like the previous two. Make everyone excited for Datamatch by
            creating an awesome product.
          </p>
          <h4>Self-description:</h4>
          <p>
            Users will be required to select one of three categories for which
            gender they want the algorithm to treat them as. These will be
            either "Man", "Woman", or "Non-binary". In addition to selecting one
            of these three categories, users will be able to add a limited
            amount of text (100 characters) to describe their gender. This
            additional description will be optional, and available to people who
            identify with any of the three larger gender categories. In addition
            to gender influencing matching, gender identity will optionally
            appear on a user’s profile page according to the gender category
            they chose and their self-description.
          </p>
          <h4>Matching:</h4>
          <p>
            Users will be matched based on how they self identify from among the
            three categories above. Users will select gender preferences through
            selecting any one, two or three of the three gender categories they
            prefer to be match eligible with. This will be implemented with
            checkboxes. Users will be matched with people from among the genders
            that they indicated being interested in who also expressed interest
            in people of that user’s gender.
          </p>
          <h4>Language:</h4>
          <p>
            Datamatch will no longer use gender to summarize a match, for
            example by displaying something like “Your match Russell is a junior
            male living in Leverett". Instead, we will just drop gender from
            this description, “Your match Russell is a junior living in
            Leverett". Datamatch will not use gender within our officially
            crafted publicity materials, unless it includes references to all
            three gender subcategories equally. This means we will refrain from
            poster text such as "Hey guys and gals check out this cute meet".
          </p>
          <h4>Visualizations:</h4>
          <p>
            In creating cool visualizations, all collected gender information
            will be included. This means visualizations summarizing past data
            will only have two gender options, though visualizations describing
            data collected on or after 2018 will have three options. In order to
            demonstrate we still care about this issue, any visualization with
            incomplete gender categories will include a footnote pointing out
            our past error. Footnote text: "Data for this visualization came
            from a time when Datamatch regrettably only included two gender
            options."
          </p>
          <h4>Periphery Implications:</h4>
          <p>
            Datamatch shall follow these guidelines at other schools it operates
            at.
          </p>
        </div>
      </div>
    );
  }
}

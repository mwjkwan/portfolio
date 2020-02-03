/** @jsx jsx */

import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';

import Description from '../components/Description';
import Thumbnail from '../components/Thumbnail';
import Photo from '../assets/photos/DiegoFigueroa-MK.JPG';
import Article from '../components/Article';

const paperStyle = css`
  .paper {
    margin-bottom: 1em;
  }
`;

const content = {
  header: 'Writing',
  description: "Here are some papers and articles I've written.",
};

const philPapers = [
  {
    link: require('assets/files/MinimalJustice.pdf'),
    title: 'Minimal Justice and Obligation to Obey the Law, 2019',
    description:
      'An examination of obligation to obey the law for those who get more than their fair share.',
  },
  {
    link: require('assets/files/FreeExpression.pdf'),
    title: 'Limitations of Mill’s Justification of Free Expression, 2019',
    description:
      'A case for why Mill’s free marketplace ideas do not function as he intended.',
  },
  {
    link: require('assets/files/MoralBargaining.pdf'),
    title: 'A Moral Bargaining Account of Animals, 2019',
    description:
      'An extension of Harman’s social bargaining theory of morality.',
  },
  {
    link: require('assets/files/FundamentalAuthority.pdf'),
    title: 'Addressing the Problem of Fundamental Authority, 2019',
    description:
      'A problem for Gibbard’s normative authority and a potential solution.',
  },
  {
    link: require('assets/files/DeepSelfCritique.pdf'),
    title: 'Modifying the Deep Self Theory of Free Will, 2019',
    description: 'A caveat for Wolf’s theory of free will.',
  },
];

const articles = [
  {
    link: require('assets/files/TheSellout.pdf'),
    title: 'Reversing Archival Footage',
    description: (
      <p>
        An analysis of civil rights humor in Paul Beatty's satirical novel{' '}
        <i>The Sellout</i>.
      </p>
    ),
  },
  {
    link:
      'https://harkeraquila.com/42383/onlineexclusive/humans-of-harker-isabella-spradlin-gleans-insight-from-sisterhood/',
    title: 'Isabella Spradlin gleans insight from sisterhood',
    description:
      'A feature profile about pep talks, being the youngest in the family, and the word "goofy."',
  },
  {
    link:
      'https://harkeraquila.com/37997/features/humans-of-harker-jimmy-lin-stays-humble/',
    title: 'Jimmy Lin stays humble',
    description: 'Volleyball is an extremely humbling sport.',
  },
];

export default class PageAbout extends Component {
  renderPaper = data => {
    const { link, title, description } = data;
    return (
      <div class="paper">
        <a target="_blank" href={link}>
          {title}
        </a>
        {description && <p>{description}</p>}
      </div>
    );
  };

  render() {
    return (
      <Article {...content}>
        <div css={paperStyle}>
          <h3>Philosophy Papers</h3>
          {philPapers.map(paperData => this.renderPaper(paperData))}
          <h3>Other Writing</h3>
          {articles.map(article => this.renderPaper(article))}
        </div>
      </Article>
    );
  }
}

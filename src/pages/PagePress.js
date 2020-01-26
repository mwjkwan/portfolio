import React from 'react';
import { Component } from 'react';

export default class PagePress extends Component {
  render() {
    const articles = [
      {
        url:
          'https://www.washingtonpost.com/news/grade-point/wp/2018/02/13/for-just-one-day-love-is-in-the-air-amid-the-gigibytes/?noredirect=on&utm_term=.6ed2c57f5eda',
        img:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/The_Logo_of_The_Washington_Post_Newspaper.svg/2000px-The_Logo_of_The_Washington_Post_Newspaper.svg.png',
        title: 'For just one day, love is in the air amid the gigabytes',
      },
      {
        url: 'https://www.thecrimson.com/article/2018/2/15/datamatch-numbers/',
        img:
          'https://s3.amazonaws.com/thumbnails.thecrimson.com/photos/2017/07/26/150944_1323621.png.800x811_q95_crop-smart_upscale.png',
        title: 'Thousands Search for Love Using Datamatch',
        style: { maxHeight: 100, maxWidth: 100 },
      },
      {
        url: 'http://www.bcgavel.com/2019/02/04/is-datamatch-bcs-new-cupid/',
        img:
          'https://www.bcgavel.com/wp-content/uploads/2015/10/gavelbanner-Master.jpg',
        title: 'The Gavel',
      },
      {
        url:
          'https://www.facebook.com/thenewenglandclassic/posts/2064094710347589',
        img:
          'https://thenewenglandclassic.com/wp-content/uploads/goliath/NewHeader%20%282%29.png',
        title: 'The New England Classic',
      },
    ];
    return (
      <div className="content_wrap">
        <div
          className="content"
          style={{ textAlign: 'center', paddingTop: 30 }}
        >
          <h1>Some Press</h1>
          <iframe
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            height="315"
            src="https://www.youtube.com/embed/7Nbrcdl-1_o"
            style={{ maxWidth: 560, width: '100%' }}
            title="Datmatch ASMR"
          />
          <br />
          <br />
          <br />
          {articles.map(article => {
            return (
              <div key={article.title}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={article.url}
                  style={{ fontSize: 30 }}
                >
                  {article.img ? (
                    <img
                      alt="article"
                      src={article.img}
                      style={{
                        width: '100%',
                        height: '100%',
                        maxWidth: 400,
                        borderRadius: 5,
                        maxHeight: 400,
                        ...article.style,
                      }}
                    />
                  ) : (
                    article.title
                  )}
                </a>
                <br />
                <br />
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

// export default PagePress;

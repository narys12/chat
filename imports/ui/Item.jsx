import React from 'react';

export default class Item extends React.Component {

  render() {
    const tweets = this.props.tweet;
    return (
      <div id="tweets">
        {tweets.map((t, index) =>
          <div key={index} className="item">
            <span>{t.n} le {t.d.toLocaleTimeString()} : </span> {t.msg}
          </div>
        )}
      </div>
    );
  }
}

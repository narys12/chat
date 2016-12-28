import React, { PropTypes } from 'react';
import Item from './Item.jsx';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Tweets from '../api/tweets.js';
import { createContainer } from 'meteor/react-meteor-data';

class Chat extends TrackerReact(React.Component) {

  constructor(props) {
    super(props);
    this.state = {
      msg: "",
    }
  }

  getTweets() {
    return this.props.tweets;
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Nom : </label>
            <input type="text" ref="nom" />
          <label>Message : </label>
            <input type="text" ref="message"
              onChange={this.handleMsgChange.bind(this)}
              onFocus={this.handleMsgChange.bind(this)}
              onBlur={this.handleMsgNoChange.bind(this)}
            />
          <input type="submit" />
        </form>
        <div>{this.state.msg}</div>
        <Item tweet={this.props.tweets} />
      </div>
    );
  }

  handleMsgNoChange(event) {
    this.setState({
      msg: "",

    })
  }

  handleMsgChange(event) {
    name = this.refs.nom.value.trim();
    this.setState({
      msg: name + " is writing...",
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    message = this.refs.message.value.trim();
    name = this.refs.nom.value.trim();
    Tweets.insert({
      n: name,
      msg: message,
      d: new Date()
    });
    this.refs.message.value = "";
  }
}

Chat.propTypes = {
  tweets: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tweets: Tweets.find({}).fetch(),
  };
}, Chat);

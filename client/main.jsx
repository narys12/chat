import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import Chat from '../imports/ui/Chat.jsx';

Meteor.startup(() => {
  render(<Chat />, document.getElementById('render-target'));
});

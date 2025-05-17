import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Update from './Update.jsx';

const modals = {
  add: Add,
  remove: Remove,
  update: Update,
};

export default (modalName) => modals[modalName];
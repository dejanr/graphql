class User {}

var viewer = new User();
viewer.id = '0';
viewer.displayName = 'Anonymous';

module.exports = {
  User,
  getUser: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
};

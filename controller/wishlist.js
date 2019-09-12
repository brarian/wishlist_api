exports.addItem = (req, res, next) => {
  res.send('creating a new  user');
};

exports.getAlItems = (req, res, next) => {
  res.send('returning list of all items');
};

exports.getItemById = (req, res, next) => {
  res.send('get single item');
};

exports.editItem = (req, res, next) => {
  res.send('editing an item');
};

exports.deleteItem = (req, res, next) => {
  res.send('deleting item');
};

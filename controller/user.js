const pool = require('../queries');
exports.createNewUser = (req, res) => {
  //need to salt and hash pw
  const { name, email, password } = req.body;

  pool.query(
    `INSERT INTO userinfo (name, email, password) VALUES ($1, $2, $3)`,
    [name, email, password],
    (error, results) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.redirect('/userHome');
      }
    }
  );
};

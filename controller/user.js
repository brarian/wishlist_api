const pool = require('../queries');
exports.createNewUser = (req, res) => {
  //need to salt and hash pw
  const { name, username, email, password } = req.body;

  pool.query(
    `INSERT INTO userinfo (name, username, email, password) VALUES ($1, $2, $3, $4)`,
    [name, username, email, password],
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

exports.signIn = (req, res) => {
  //need to salt and hash pw
  const { username, password } = req.body;

  pool.query(
    `SELECT top 1 FROM usersinfo WHERE (name, password) VALUES ($1, $2 )`,
    [username, password],
    (error, results) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(`{${results.username} , ${results.password}} `);
        res.redirect('/userHome');
      }
    }
  );
};

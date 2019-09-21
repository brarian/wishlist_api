const pool = require('../queries');
exports.createNewUser = (req, res) => {
  //need to salt and hash pw

  const { name, email, password } = req.body;

  pool.query(
    `INSERT INTO users_pwandfile (name,  email, password) VALUES ($1, $2, $3, )`,
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

exports.findUserById = id => {
  pool.query(
    `SELECT * FROM users_pwandfile where id =$1`,
    id,
    (error, results) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.json({ results });
      }
    }
  );
};

exports.verifyUser = email => {
  pool.query(
    `SELECT * FROM users_pwandfile where email=$1`,
    email,
    (error, results) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        res.json({ results });
      }
    }
  );
};

exports.signIn = (req, res) => {
  //need to salt and hash pw
  // validations
  const { username, password } = req.body;

  return pool.query(
    `SELECT top 1 FROM usersinfo WHERE (name, password) VALUES ($1, $2 )`,
    [username],
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

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');
const aws_config = require('./aws_config');

const dotenv = require('dotenv');
dotenv.config();

const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'brariannamonywa',
  host: 'localhost',
  database: 'mock_wishlist',
  password: 'greedy1mock',
  port: 5432,
  sc: 'jjjjjjjjjjjjjj'
});

exports.registerUser = (req, res) => {
  console.log('inside register user');
  const name = req.body.name;
  const email = req.body.email;
  console.log(req.body);
  if (req.body.password != req.body.passwordConfirmation) {
    throw 'Passwords do not match';
  } else {
    password = req.body.password;
  }

  const poolData = {
    UserPoolId: aws_config.USER_POOL_ID,
    ClientId: aws_config.CLIENT_ID
  };

  let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  let attributeList = [];

  let dataName = {
    Name: 'name',
    Value: name
  };

  let dataEmail = {
    Name: 'email',
    Value: email
  };

  var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
    dataEmail
  );

  attributeList.push(attributeName, attributeEmail);
  console.log(attributeList);
  userPool.signUp(name, password, attributeList, null, function(error, result) {
    if (error) {
      return res.status(404).send(error);
    } else if (!error) {
      CognitoUser = result.user;
      console.log('username is ', CognitoUser.getUsername());
      return res.send('check you email for a verification link');
    }
  });
};

exports.signIn = (req, res) => {
  const name = req.body.username;
  const password = req.body.password;
  console.log('inside signin');
  const authenticationData = {
    Username: name,
    Password: password
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );

  const poolData = {
    UserPoolId: aws_config.USER_POOL_ID,
    ClientId: aws_config.CLIENT_ID
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const userData = {
    Username: authenticationData.Username,
    Pool: userPool
  };

  console.log('USER DATA', userData);
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  console.log(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      console.log(result);
      var accessToken = result.getAccessToken().getJwtToken();
      /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/
      var idToken = result.idToken.jwtToken;

      return res.send('RESULT', result);
    },

    onFailure: function(error) {
      console.log(error);
      return res.send(error);
    }
  });
};

exports.signOut = (req, res) => {
  if (cognitoUser != null) {
    cognitoUser.signOut();
    return res.json({ success: 'signed out' });
  }
  console.log(window.localStorage.getItem('access_token'));
};

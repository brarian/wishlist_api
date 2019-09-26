const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
global.fetch = require('node-fetch');
const aws_config = require('./aws_config');
const poolData = {
  UserPoolId: aws_config.USER_POOL_ID,
  ClientId: aws_config.CLIENT_ID
};
exports.registerUser = (req, res) => {
  console.log('inside register user');
  res.send('hello');
  let poolData;
  const name = req.body.name;
  const email = req.body.email;
  console.log(req.body);
  if (req.body.password != req.body.passwordConfirmation) {
    throw 'Passwords do not match';
  } else {
    password = req.body.password;
  }

  const poolData = aws_config.poolData;

  let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  let attributeList = [];

  let dataName = {
    Name: 'name',
    Value: req.body.name
  };

  let dataEmail = {
    Name: 'email',
    Value: req.body.email
  };

  var attributeName = new AmazonCognitoIdentity.CognitoUserAttribute(dataName);
  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
    dataEmail
  );

  attributeList.push(attributeName, attributeEmail);
  console.log(attributeList);
  userPool.signUp(name, password, attributeList, null, function(error, result) {
    if (error) {
      res.send(error);
      return;
    }

    CognitoUser = result.user;
    console.log('username is ', CognitoUser.getUsername());
    res.send('check you email for a verification link');
  });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  console.log('inside signin');
  const authData = {
    Username: email,
    password: password
  };

  let authDetails = new AmazonCognitoIdentity.AuthenticationDetails(authData);

  const poolData = aws_config.poolData;

  let userPool = new AmazonCognitoIdentity.CognitoUser(poolData);

  const userData = {
    Username: email,
    Pool: userPool
  };

  let CognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  CognitoUser.authenticateUser(authDetails, {
    onSuccess: function(result) {
      let accessToken = result.getAccessToken().getJwtToken();
      console.log(accessToken);
    },
    onFailure: function(error) {
      console.log(error);
      res.send(error);
    }
  });
};

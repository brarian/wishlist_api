import { Config, CognitoIdentityCredentials } from 'aws-sdk';
import {
  CognitoUser,
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';
import * as AWSCONFIGS from './aws_config';

exports.registerUser = (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  if (req.body.password !== req.body.passwordCheck) {
    console.log(error);
    res.send({ error });
  }
  const poolData = {
    userPoolId: AWSCONFIGS.default.USER_POOL_ID,
    clientId: AWSCONFIGS.default.USER_POOL_ID
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  let attributeName = AmazonCognitoIdentity.CognitoUserAttribute(name);
  let attributeEmail = AmazonCognitoIdentity.CognitoUserAttribute(email);

  const attributeList = [attributeName, attributeEmail];

  let cognitoUSer = re;
};

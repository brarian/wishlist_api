const validateUsername = usernameData => {
  return new Promise((resolve, reject) => {
    if (username < 6) {
      reject('username needs to be at least 6 characters');
    } else {
      resolve();
    }
  });
};

const validatePassword = passwordData => {
  return new Promise((resolve, reject) => {
    if (
      passwordData.length < 8 ||
      !passwordData.includes('characters') ||
      !passwordData.includes('number')
    ) {
      reject('password does not meet the criteria');
    }
    resolve();
    j;
  });
};

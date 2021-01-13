import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import _ from 'lodash';
import md5 from 'md5';

const bcryptService = () => {
  const password = (user: any) => {
    const salt = genSaltSync();
    const hash = hashSync(user.password, salt);
    return hash;
  };

  const comparePassword = (pw: string, hash: string) => compareSync(pw, hash);

  const addressHash = (addressObj: any) => {
    const {
      addressLine: line = '',
      city = '',
      state = '',
      country = '',
      postCode = '',
      latitude = '',
      longitude = ''
    } = addressObj;

    const addressString = `${line}:${city}:${state}:${country}:${postCode}:${latitude}:${longitude}`;
    const lowerCaseString = _.toLower(addressString);
    const addressHash = md5(lowerCaseString);
    // console.log(addressHash);
    return addressHash;
  };

  return {
    password,
    comparePassword,
    addressHash,
  };
};

export default bcryptService;

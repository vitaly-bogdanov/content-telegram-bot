import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from './bcrypt.constant.js';

export const getHashHelper = (password) => bcrypt.hashSync(password, SALT_ROUNDS);
export const isHashComparedHelper = (password, hashPasword) => bcrypt.compareSync(password, hashPasword);
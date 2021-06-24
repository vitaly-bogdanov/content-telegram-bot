import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from './bcrypt.constant.js';

export const hashHelper = (password) => bcrypt.hashSync(password, SALT_ROUNDS);
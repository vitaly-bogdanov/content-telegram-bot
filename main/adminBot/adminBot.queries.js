import { MAILING_ACTION_NAME, mailingQuery } from '../../core/mailing/index.js';

const queries = {
  [MAILING_ACTION_NAME]: mailingQuery
};

export const queryAdminBot = function(ctx) {
  console.log(ctx);
};
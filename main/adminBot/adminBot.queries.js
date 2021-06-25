import { MAILING_ACTION_NAME, mailingQuery } from '../../core/mailing/index.js';
import { getActionNameHelper } from '../../lib/telegram/index.js';

const queries = {
  [MAILING_ACTION_NAME]: mailingQuery
};

export const queryAdminBot = function(ctx) {
  const actionName = getActionNameHelper(ctx);
  queries[actionName] && queries[actionName].bind(this)(ctx);
};
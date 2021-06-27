import { MAILING_ACTION_NAME, mailingQuery } from '../../core/mailing/index.js';
import { ADMIN_ACTION_NAME, adminQuery } from '../../core/admin/index.js';
import { CREATE_MANAGER_ACTION_NAME, createManagerQuery } from '../../core/createManager/index.js';
import { DELETE_MANAGER_ACTION_NAME, deleteManagerQuery } from '../../core/deleteManager/index.js';

import { getActionNameHelper } from '../../lib/telegram/index.js';

const queries = {
  [ADMIN_ACTION_NAME]: adminQuery,
  [MAILING_ACTION_NAME]: mailingQuery,
  [CREATE_MANAGER_ACTION_NAME]: createManagerQuery,
  [DELETE_MANAGER_ACTION_NAME]: deleteManagerQuery
};

export const queryAdminBot = function(ctx) {
  const actionName = getActionNameHelper(ctx);
  queries[actionName] && queries[actionName].bind(this)(ctx);
};
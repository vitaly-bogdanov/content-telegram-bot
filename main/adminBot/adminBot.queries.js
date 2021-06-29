import { MAILING_ACTION_NAME, mailingQuery } from '../../core/mailing/index.js';
import { ADMIN_ACTION_NAME, adminQuery } from '../../core/admin/index.js';
import { ADD_MANAGER_ACTION_NAME, addManagerQuery } from '../../core/addManager/index.js';
import { DELETE_MANAGER_ACTION_NAME, deleteManagerQuery } from '../../core/deleteManager/index.js';
import { CATEGORIES_ACTION_NAME, categoriesQuery } from '../../core/categories/index.js';
import { ADD_CATEGORY_ACTION_NAME, addCategoryQuery } from '../../core/addCategory/index.js';
import { DELETE_CATEGORY_ACTION_NAME, deleteCategoryQuery } from '../../core/deleteCategory/index.js';
import { CONTENT_ACTION_NAME, contentQuery } from '../../core/content/index.js';


import { getActionNameHelper } from '../../lib/telegram/index.js';

const queries = {
  [ADMIN_ACTION_NAME]: adminQuery,
  [MAILING_ACTION_NAME]: mailingQuery,
  [ADD_MANAGER_ACTION_NAME]: addManagerQuery,
  [DELETE_MANAGER_ACTION_NAME]: deleteManagerQuery,
  [CATEGORIES_ACTION_NAME]: categoriesQuery,
  [ADD_CATEGORY_ACTION_NAME]: addCategoryQuery,
  [DELETE_CATEGORY_ACTION_NAME]: deleteCategoryQuery,
  [CONTENT_ACTION_NAME]: contentQuery
};

export const queryAdminBot = async function(ctx) {
  const actionName = getActionNameHelper(ctx);
  queries[actionName] && queries[actionName].bind(this)(ctx);
};
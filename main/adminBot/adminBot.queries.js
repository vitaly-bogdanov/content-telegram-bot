import { MAILING_ACTION_NAME, mailingQuery } from '../../core/mailing/index.js';
import { ADMIN_ACTION_NAME, adminQuery } from '../../core/admin/index.js';
import { ADD_MANAGER_ACTION_NAME, addManagerQuery } from '../../core/addManager/index.js';
import { DELETE_MANAGER_ACTION_NAME, deleteManagerQuery } from '../../core/deleteManager/index.js';
import { CATEGORIES_ACTION_NAME, categoriesQuery } from '../../core/categories/index.js';
import { ADD_CATEGORY_ACTION_NAME, addCategoryQuery } from '../../core/addCategory/index.js';
import { DELETE_CATEGORY_ACTION_NAME, deleteCategoryQuery } from '../../core/deleteCategory/index.js';
import { CONTENT_ACTION_NAME, contentQuery } from '../../core/content/index.js';
import { EDIT_CONTENT_ACTION_NAME, editContentQuery } from '../../core/editContent/index.js';
import { ADD_CONTENT_ACTION_NAME, addContentQuery } from '../../core/addContent/index.js';
import { SCHEDULE_LIST_ACTION_NAME, scheduleListQuery } from '../../core/scheduleList/index.js';
import { SCHEDULE_ACTION_NAME, scheduleQuery } from '../../core/schedule/index.js';
import { TIME_LIST_ACTION_NAME, timeListQuery } from '../../core/timeList/index.js';
import { TIME_ACTION_NAME, timeQuery } from '../../core/time/index.js';
import { SELECT_CATEGORY_ACTION_NAME, selectCategoryQuery } from '../../core/selectCategory/index.js';
import { CHANGE_CATEGORY_ACTION_NAME, changeCategoryQuery } from '../../core/changeСategory/index.js';

import { getActionQueryNameAndData } from '../../lib/telegram/index.js';

const queries = {
  [ADMIN_ACTION_NAME]: adminQuery,
  [MAILING_ACTION_NAME]: mailingQuery,
  [ADD_MANAGER_ACTION_NAME]: addManagerQuery,
  [DELETE_MANAGER_ACTION_NAME]: deleteManagerQuery,
  [CATEGORIES_ACTION_NAME]: categoriesQuery,
  [ADD_CATEGORY_ACTION_NAME]: addCategoryQuery,
  [DELETE_CATEGORY_ACTION_NAME]: deleteCategoryQuery,
  [CONTENT_ACTION_NAME]: contentQuery,
  [EDIT_CONTENT_ACTION_NAME]: editContentQuery,
  [ADD_CONTENT_ACTION_NAME]: addContentQuery,
  [SCHEDULE_LIST_ACTION_NAME]: scheduleListQuery,
  [SCHEDULE_ACTION_NAME]: scheduleQuery,
  [TIME_LIST_ACTION_NAME]: timeListQuery,
  [TIME_ACTION_NAME]: timeQuery,
  [SELECT_CATEGORY_ACTION_NAME]: selectCategoryQuery,
  [CHANGE_CATEGORY_ACTION_NAME]: changeCategoryQuery
};

export const queryAdminBot = async function(ctx) {
  const { actionName, queryData } = getActionQueryNameAndData(ctx);
  ctx = { ...ctx, queryData };
  actionName && queries[actionName] && queries[actionName].bind(this)(ctx);
};
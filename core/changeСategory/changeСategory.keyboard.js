import { SELECT_CATEGORY_ACTION_NAME } from '../selectCategory/index.js';
import { ACTION } from './changeСategory.constant.js';

export const changeCategoryKeyboard = (categories, scheduleId, managerId) => {
  
  const buttons = categories.reduce((memo, category) => {
    memo.push([{ text: category.title, callback_data: `${ACTION.CHANGE}?categorId=${category.id}` }]);
    return memo;
  }, []);

  return {
    reply_markup: {
      inline_keyboard: [
        ...buttons,
        [
          { text: 'Назад 🔙', callback_data: `${SELECT_CATEGORY_ACTION_NAME}?scheduleId=${scheduleId}&managerId=${managerId}` }
        ]
      ]
    }
  };
}
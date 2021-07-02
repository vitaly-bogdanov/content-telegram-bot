import { CATEGORIES_ACTION_NAME } from '../categories/index.js';
import { EDIT_CONTENT_ACTION_NAME } from '../editContent/index.js';
import { ADD_CONTENT_ACTION_NAME } from '../addContent/index.js';
import { ACTION } from './content.constant.js';

export const mainContentKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Добавить контент ➕', callback_data: ADD_CONTENT_ACTION_NAME }
      ],
      [
        { text: 'Назад 🔙', callback_data: CATEGORIES_ACTION_NAME }
      ]
    ]
  }
};

export const contentEditKeyboard = (contentId) => ({
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Редактировать', callback_data: EDIT_CONTENT_ACTION_NAME }
      ],
      [
        { text: 'Удалить', callback_data: `${ACTION.DELETE}?contentId=${contentId}` }
      ]
    ]
  }
});
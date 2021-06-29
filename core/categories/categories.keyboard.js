import { ADD_CATEGORY_ACTION_NAME } from '../addCategory/index.js';
import { DELETE_CATEGORY_ACTION_NAME } from '../deleteCategory/index.js';

export const mainCategoriesKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Добавить категорию ➕', callback_data: ADD_CATEGORY_ACTION_NAME },
        { text: 'Удалить категорию ➖', callback_data: DELETE_CATEGORY_ACTION_NAME }
      ],
      [
        { text: 'Назад 🔙', callback_data: 'start' }
      ]
    ]
  }
};

export const categoryConfigKeyboard = (text) => ({
  reply_markup: {
    inline_keyboard: [
      [
        { text, callback_data: 'content' }
      ]
    ]
  }
});
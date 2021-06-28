import { ADD_CATEGORY_ACTION_NAME } from '../addCategory/index.js';

export const mainCategoriesKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Добавить категорию ➕', callback_data: ADD_CATEGORY_ACTION_NAME },
        { text: 'Удалить категорию ➖', callback_data: 'hhhhhhhhh' }
      ],
      [
        { text: 'Назад 🔙', callback_data: 'start' }
      ]
    ]
  }
};

export const categoryConfigKeyboard = (callback_data) => ({
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Обзор', callback_data }
      ]
    ]
  }
});
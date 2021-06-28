import { CATEGORIES_ACTION_NAME } from '../categories/index.js';

export const mainAddCategoryKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Назад 🔙', callback_data: CATEGORIES_ACTION_NAME }
      ]
    ]
  }
};
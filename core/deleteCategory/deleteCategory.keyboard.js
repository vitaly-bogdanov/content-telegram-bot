import { CATEGORIES_ACTION_NAME } from '../categories/index.js';
import { CONFIRM } from './deleteCategory.constant.js';

export const mainDeleteCategoryKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Назад 🔙', callback_data: CATEGORIES_ACTION_NAME }
      ]
    ]
  }
};

export const confirmDeleteCategoryKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Да ✅', callback_data: CONFIRM.YES },
        { text: 'Нет ❌', callback_data: CONFIRM.NO }
      ]
    ]
  }
};
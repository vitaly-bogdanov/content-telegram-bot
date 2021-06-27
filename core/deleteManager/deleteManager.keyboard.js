import { MAILING_ACTION_NAME } from '../mailing/index.js';
import { CONFIRM } from './deleteManager.constant.js';

export const mainDeleteManagerKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Назад 🔙', callback_data: MAILING_ACTION_NAME }
      ]
    ]
  }
};

export const confirmDeleteManagerKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Да ✅', callback_data: CONFIRM.YES },
        { text: 'Нет ❌', callback_data: CONFIRM.NO }
      ]
    ]
  }
};
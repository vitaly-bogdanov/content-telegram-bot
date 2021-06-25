import { CATEGORIES_ACTION_NAME } from '../categories/index.js';
import { MAILING_ACTION_NAME } from '../mailing/index.js';

export const mainAdminKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Категории', callback_data: CATEGORIES_ACTION_NAME },
        { text: 'Рассылка', callback_data: MAILING_ACTION_NAME }
      ]
    ]
  }
};
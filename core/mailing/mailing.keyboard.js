import { CREATE_MANAGER_ACTION_NAME } from '../createManager/index.js';
import { DELETE_MANAGER_ACTION_NAME } from '../deleteManager/index.js';

export const mainMailingKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Добавить менеджера', callback_data: CREATE_MANAGER_ACTION_NAME },
        { text: 'Удалить менеджера', callback_data: DELETE_MANAGER_ACTION_NAME }
      ],
      [
        { text: 'Назад', callback_data: 'start' }
      ]
    ]
  }
};
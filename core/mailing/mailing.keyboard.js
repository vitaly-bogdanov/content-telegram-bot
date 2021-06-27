import { ADD_MANAGER_ACTION_NAME } from '../addManager/index.js';
import { DELETE_MANAGER_ACTION_NAME } from '../deleteManager/index.js';

export const mainMailingKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Добавить менеджера', callback_data: ADD_MANAGER_ACTION_NAME },
        { text: 'Удалить менеджера', callback_data: DELETE_MANAGER_ACTION_NAME }
      ],
      [
        { text: 'Назад', callback_data: 'start' }
      ]
    ]
  }
};
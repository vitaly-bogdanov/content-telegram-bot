import { ADD_MANAGER_ACTION_NAME } from '../addManager/index.js';
import { DELETE_MANAGER_ACTION_NAME } from '../deleteManager/index.js';
import { SCHEDULE_LIST_ACTION_NAME } from '../scheduleList/index.js';



export const mainMailingKeyboard = (managers) => {

  let buttons = managers.reduce((memo, manager) => {
    memo.push([{ text: `😎 ID: ${manager.telegram_id}, ${manager.first_name} ${manager.last_name}`, callback_data: `${SCHEDULE_LIST_ACTION_NAME}?managerId=${manager.id}&telegramId=${manager.telegram_id}` }]);
    return memo;
  }, []);

  return {
      reply_markup: {
      inline_keyboard: [
        ...buttons,
        [
          { text: 'Добавить менеджера ➕', callback_data: ADD_MANAGER_ACTION_NAME },
          { text: 'Удалить менеджера ➖', callback_data: DELETE_MANAGER_ACTION_NAME }
        ],
        [
          { text: 'Назад 🔙', callback_data: 'start' }
        ]
      ]
    }
  };
};
import { adminCommand, ADMIN_ACTION_NAME } from '../../core/admin/index.js'
import { getActionNameHelper } from '../../lib/telegram/index.js';

const commands = {
  [ADMIN_ACTION_NAME]: adminCommand
};

export const commandAdminBot = function(ctx) {
	const actionName = getActionNameHelper(ctx); // получаем название команды
	commands[actionName] && commands[actionName].bind(this)(ctx);
};
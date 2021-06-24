import { managerCommand, MANAGER_ACTION_NAME } from '../../core/manager/index.js';
import { getActionNameHelper } from '../../lib/telegram/index.js';

const commands = {
  [MANAGER_ACTION_NAME]: managerCommand
};

export const commandManagerBot = function(ctx) {
  const actionName = getActionNameHelper(ctx);
	commands[actionName] && commands[actionName].bind(this)(ctx);
};
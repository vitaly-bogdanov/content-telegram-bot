import { adminBot, commandAdminBot, queryAdminBot } from './main/adminBot/index.js';
import { managerBot, commandManagerBot } from './main/managerBot/index.js';
import { startScheduler } from './main/scheduler/index.js';

adminBot.on('message', commandAdminBot.bind(adminBot));
adminBot.on('callback_query', queryAdminBot.bind(adminBot));
adminBot.on("polling_error", console.log);

managerBot.on('message', commandManagerBot.bind(managerBot));
managerBot.on("polling_error", console.log);

startScheduler(managerBot);
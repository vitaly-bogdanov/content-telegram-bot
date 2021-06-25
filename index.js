import { adminBot, commandAdminBot, queryAdminBot } from './main/adminBot/index.js';
import { managerBot, commandManagerBot } from './main/managerBot/index.js';

adminBot.on('message', commandAdminBot.bind(adminBot));
adminBot.on('callback_query', queryAdminBot.bind(adminBot));
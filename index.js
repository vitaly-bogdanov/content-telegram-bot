import { adminBot, commandAdminBot } from './main/adminBot/index.js';

import { managerBot, commandManagerBot } from './main/managerBot/index.js';

adminBot.on('message', commandAdminBot.bind(adminBot));
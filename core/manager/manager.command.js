import Prisma from '@prisma/client';

import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { reloadManagerContentEmmiter } from '../../main/scheduler/index.js';
import { clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { managerKeyboard } from './manager.keyboard.js';

const { PrismaClient } = Prisma;

import { getUserHelper } from '../../lib/telegram/telegram.helpers.js'
import { managerService } from './manager.service.js';

export const managerCommand = async function(ctx) {
  const { id, first_name, last_name, username } = getUserHelper(ctx);
  const isRegistered = await managerService.isRegistered(id);
  if (!isRegistered) await managerService.registration({ id, first_name, last_name, username });
  const text = `Добро пожаловать!\nваш ID: ${id}`;
  let msgId1 = (await this.sendMessage(id, text)).message_id;
  reloadManagerContentEmmiter.on(`reload${id}`, async () => {
    await clearMessageAndOnceEventsHepler(this, id);
    let me = await managerService.getMeWhithAllContent(id);
    me.contents.forEach(async (managerContent) => {
      let msg = await this.sendMessage(id, managerContent.content.description, managerKeyboard);
      setCacheMessageIdsHelper(id, msg);
    });
  });

  reloadManagerContentEmmiter.emit(`reload${id}`);
};
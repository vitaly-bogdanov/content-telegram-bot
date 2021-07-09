import Prisma from '@prisma/client';
import fetch from 'node-fetch';

import { setCacheMessageIdsHelper, initializeCacheStateHelper } from '../../lib/cache/index.js';
import { reloadManagerContentEmmiter } from '../../main/scheduler/index.js';
import { clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { managerKeyboard } from './manager.keyboard.js';
import { getActionQueryNameAndData } from '../../lib/telegram/index.js';
import { ACTION } from './manager.constant.js';

const { PrismaClient } = Prisma;

import { getUserHelper } from '../../lib/telegram/telegram.helpers.js'
import { managerService } from './manager.service.js';

export const managerCommand = async function(ctx) {
  const { id, first_name, last_name, username } = getUserHelper(ctx);
  const isRegistered = await managerService.isRegistered(id);
  if (!isRegistered) await managerService.registration({ id, first_name, last_name, username });
  initializeCacheStateHelper(id);
  const text = `Добро пожаловать!\nваш ID: ${id}`;
  let msgId1 = (await this.sendMessage(id, text)).message_id;
  reloadManagerContentEmmiter.on(`reload${id}`, async () => {
    await clearMessageAndOnceEventsHepler(this, id);
    let me = await managerService.getMeWhithAllContent(id);
    me.contents.forEach(async (managerContent) => {
      let res = await fetch(`https://api.telegram.org/bot${process.env.ADMIN_BOT_TOKEN}/getFile?file_id=${managerContent.content.data}`);
      let data = await res.json();
      let file_path = data.result.file_path;
      let pic = await fetch(`https://api.telegram.org/file/bot${process.env.ADMIN_BOT_TOKEN}/${file_path}`);
      let buffer = pic.body._readableState.buffer.tail.data;
      switch (managerContent.content.format) {
        case 'document':
          let msgId2 = (await this.sendDocument(id, buffer, managerKeyboard(id, managerContent.content.id))).message_id;
          setCacheMessageIdsHelper(id, [msgId2]);
          break;
        case 'photo':
          let msgId3 = (await this.sendPhoto(id, buffer, managerKeyboard(id, managerContent.content.id))).message_id;
          setCacheMessageIdsHelper(id, [msgId3]);
          break;
        case 'audio':
          let msgId4 = (await this.sendAudio(id, buffer, managerKeyboard(id, managerContent.content.id))).message_id;
          setCacheMessageIdsHelper(id, [msgId4]);
          break;
        case 'video':
          let msgId5 = (await this.sendVideo(id, buffer, managerKeyboard(id, managerContent.content.id))).message_id;
          setCacheMessageIdsHelper(id, [msgId5]);
          break;
        case 'text':
          let msgId6 = (await this.sendMessage(id, randomContent.data, managerKeyboard(id, managerContent.content.id))).message_id;
          setCacheMessageIdsHelper(id, [msgId6]);
      }
    });
  });
  reloadManagerContentEmmiter.emit(`reload${id}`);

  this.on('callback_query', async (ctx) => {
    const { actionName, queryData } = getActionQueryNameAndData(ctx);
    if (actionName === ACTION.SET_CONTENT) {
      const { managerId, contentId } = queryData;
      
      
    }
  });
};
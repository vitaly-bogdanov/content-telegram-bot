import { getUserHelper, clearMessageAndOnceEventsHepler } from '../../lib/telegram/index.js';
import { setCacheMessageIdsHelper } from '../../lib/cache/index.js';
import { TIME_FORMAT } from './time.constant.js';
import { timeListQuery } from '../timeList/index.js';
import { timeService } from './time.service.js';

const regTime = new RegExp(TIME_FORMAT); 

export const timeQuery = async function(ctx) {
  let initCtx = ctx;
  const { id } = getUserHelper(ctx);
  const { timeId } = ctx.queryData;
  await clearMessageAndOnceEventsHepler(this, id);
  const text = 'Введите желаемое время в\nформате 00:00-00:00'
  let msgId1 = (await this.sendMessage(id, text)).message_id;
  setCacheMessageIdsHelper(id, [msgId1]);
  this.once('message', async (ctx) => {
    setCacheMessageIdsHelper(id, [ctx.message_id]);
    const value = ctx.text;
    let isTimeFormatValid = regTime.exec(value);
    if (isTimeFormatValid) {
      let msgId2 = (await this.sendMessage(id, 'Готово!\nВремя успешно изменено.')).message_id;
      const time = await timeService.updateTimeById(timeId, value);
      setCacheMessageIdsHelper(id, [msgId2]);
      ctx.queryData = {};
      ctx.queryData.scheduleId = time.scheduleId;
      setTimeout(() => { timeListQuery.bind(this)(ctx) }, 1500);
    } else {
      let msgId3 = (await this.sendMessage(id, 'Ошибка!\nНекорректный формат времени.')).message_id;
      setCacheMessageIdsHelper(id, [msgId3]);
      setTimeout(() => { timeQuery.bind(this)(initCtx) }, 1500);
    }
  });
};
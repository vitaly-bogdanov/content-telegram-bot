import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

export const managerBot = new TelegramBot(process.env.MANAGER_BOT_TOKEN, { polling: true });
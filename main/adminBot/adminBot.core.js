import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

dotenv.config();

export const adminBot = new TelegramBot(process.env.ADMIN_BOT_TOKEN, { polling: true });
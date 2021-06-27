import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class MailingService {
  constructor() { this.db = new PrismaClient() }

  async getManagers() {
    return await this.db.manager.findMany(
      { 
        where: { confirmed: true }, 
        select: { 
          first_name: true, 
          last_name: true, 
          username: true, 
          telegram_id: true,
          id: true
        } 
      }
    );
  }
}

export const mailingService = new MailingService();
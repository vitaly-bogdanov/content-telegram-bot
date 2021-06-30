import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class ScheduleListService {
  constructor() { this.db = new PrismaClient() }

  
};

export const scheduleListService = new ScheduleListService();
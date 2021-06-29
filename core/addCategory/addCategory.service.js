import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class AddCategoryService {
  constructor() { this.db = new PrismaClient() }

  async create(title) {
    return await this.db.category.create({ data: { title } });
  }
  
};

export const addCategoryService = new AddCategoryService()
import Prisma from '@prisma/client';
import slug from 'slug';

const { PrismaClient } = Prisma;

class AddCategoryService {
  constructor() { this.db = new PrismaClient() }

  async create(title) {
    return await this.db.category.create({ data: { title, slug: slug(title) } });
  }
  
};

export const addCategoryService = new AddCategoryService()
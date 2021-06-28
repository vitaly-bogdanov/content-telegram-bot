import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class CategoriesService {
  constructor() { this.db = new PrismaClient() }

  async getCategories() {
    return this.db.category.findMany();
  }
  
};

export const categoriesService = new CategoriesService();
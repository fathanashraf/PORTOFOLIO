// Fallback implementation when Prisma is not available
class MockPrismaClient {
  profile = {
    findFirst: async () => null,
    upsert: async () => null,
  };
  message = {
    create: async (data: any) => ({ id: "mock", ...data.data, createdAt: new Date() }),
    findMany: async () => [],
    count: async () => 0,
  };
  project = {
    findMany: async () => [],
    count: async () => 0,
  };
  experience = {
    count: async () => 0,
  };
  skill = {
    findMany: async () => [],
    count: async () => 0,
    create: async (data: any) => data.data,
  };
  adminUser = {
    upsert: async () => null,
  };
  async $disconnect() {}
}

export const prisma = new MockPrismaClient() as any;

import { prisma } from "@/lib/db/prisma";

export class ProfileService {
  static async getProfile() {
    return await prisma.profile.findFirst();
  }

  static async updateProfile(data: any) {
    const existing = await prisma.profile.findFirst();
    if (existing) {
      return await prisma.profile.update({
        where: { id: existing.id },
        data,
      });
    }
    return await prisma.profile.create({ data });
  }
}

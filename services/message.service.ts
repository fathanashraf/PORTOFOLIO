import { prisma } from "@/lib/db/prisma";

export class MessageService {
  static async createMessage(data: any) {
    return await prisma.message.create({
      data: {
        ...data,
        status: "unread",
      },
    });
  }

  static async getAllMessages() {
    return await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static async getUnreadCount() {
    return await prisma.message.count({
      where: { status: "unread" },
    });
  }

  static async updateStatus(id: string, status: string) {
    return await prisma.message.update({
      where: { id },
      data: { status, readAt: status === "read" ? new Date() : undefined },
    });
  }

  static async deleteMessage(id: string) {
    return await prisma.message.delete({
      where: { id },
    });
  }
}

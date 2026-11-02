import { NextRequest, NextResponse } from "next/server";
import { messageSchema } from "@/lib/validation/message";
import { prisma } from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = messageSchema.parse(body);

    const message = await prisma.message.create({
      data: {
        name: validated.name,
        email: validated.email,
        subject: validated.subject || null,
        message: validated.message,
        status: "unread",
      },
    });

    return NextResponse.json(
      { success: true, message: "Pesan berhasil dikirim", data: message },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { success: false, message: "Validasi gagal", errors: error },
        { status: 400 }
      );
    }

    console.error("Error creating message:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat mengirim pesan" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat mengambil pesan" },
      { status: 500 }
    );
  }
}

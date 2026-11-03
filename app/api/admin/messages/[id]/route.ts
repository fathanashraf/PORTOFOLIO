import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await req.json();
    const message = await prisma.message.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(
      { success: true, message: "Pesan berhasil diperbarui", data: message }
    );
  } catch (error) {
    console.error("Error updating message:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat memperbarui pesan" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    await prisma.message.delete({
      where: { id },
    });
    return NextResponse.json(
      { success: true, message: "Pesan berhasil dihapus" }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat menghapus pesan" },
      { status: 500 }
    );
  }
}

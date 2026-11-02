import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const educations = await prisma.education.findMany({
      orderBy: { startYear: "desc" },
    });
    return NextResponse.json({ success: true, data: educations });
  } catch (error) {
    console.error("Error fetching educations:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat mengambil pendidikan" },
      { status: 500 }
    );
  }
}

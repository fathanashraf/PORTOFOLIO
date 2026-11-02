import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ success: true, data: skills });
  } catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat mengambil keahlian" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const skill = await prisma.skill.create({
      data: body,
    });
    return NextResponse.json(
      { success: true, message: "Keahlian berhasil ditambahkan", data: skill },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating skill:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat menambahkan keahlian" },
      { status: 500 }
    );
  }
}

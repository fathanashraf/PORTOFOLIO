import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const { slug } = await params;
    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        technologies: {
          include: {
            technology: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Proyek tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan saat mengambil proyek" },
      { status: 500 }
    );
  }
}

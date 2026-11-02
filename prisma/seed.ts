// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const passwordHash = await bcrypt.hash("admin123", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@fathanalashraf.com" },
    update: {},
    create: {
      name: "Fathan Al Ashraf",
      email: "admin@fathanalashraf.com",
      passwordHash,
      role: "admin",
    },
  });

  // Create profile
  await prisma.profile.upsert({
    where: { email: "fathan.alashraf@example.com" },
    update: {},
    create: {
      fullName: "Fathan Al Ashraf",
      nickname: "Fathan",
      email: "fathan.alashraf@example.com",
      phone: "+62 xxx xxx xxx",
      location: "Indonesia",
      profession: "Web Developer",
      headline: "Sarjana Komputer & Aspiring Web Developer",
      description:
        "Halo, saya Fathan Al Ashraf. Sarjana Komputer dan Aspiring Web Developer yang memiliki ketertarikan dalam membangun website modern, responsif, serta aplikasi digital yang fungsional dan memberikan pengalaman terbaik bagi penggunanya.",
      githubUrl: "https://github.com/",
      linkedinUrl: "https://linkedin.com/",
      instagramUrl: "https://instagram.com/",
    },
  });

  // Create skills
  const skills = [
    { name: "React", category: "Frontend", proficiency: 75, displayOrder: 1 },
    { name: "Next.js", category: "Frontend", proficiency: 70, displayOrder: 2 },
    { name: "TypeScript", category: "Frontend", proficiency: 70, displayOrder: 3 },
    { name: "Laravel", category: "Backend", proficiency: 60, displayOrder: 4 },
    { name: "MySQL", category: "Database", proficiency: 65, displayOrder: 5 },
    { name: "Tailwind CSS", category: "Frontend", proficiency: 80, displayOrder: 6 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

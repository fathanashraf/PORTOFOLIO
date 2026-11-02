import { prisma } from "@/lib/db/prisma";
import { IoFolderOpenOutline, IoMailOutline, IoBriefcaseOutline, IoCodeSlashOutline } from "react-icons/io5";

export default async function AdminDashboard() {
  const [projectCount, messageCount, unreadCount, experienceCount, skillCount] =
    await Promise.all([
      prisma.project.count(),
      prisma.message.count(),
      prisma.message.count({ where: { status: "unread" } }),
      prisma.experience.count(),
      prisma.skill.count(),
    ]);

  const stats = [
    { label: "Total Projects", value: projectCount, icon: <IoFolderOpenOutline />, href: "/admin/projects" },
    { label: "Total Messages", value: messageCount, icon: <IoMailOutline />, href: "/admin/messages" },
    { label: "Unread Messages", value: unreadCount, icon: <IoMailOutline />, href: "/admin/messages" },
    { label: "Experiences", value: experienceCount, icon: <IoBriefcaseOutline />, href: "/admin/experiences" },
    { label: "Skills", value: skillCount, icon: <IoCodeSlashOutline />, href: "/admin/skills" },
  ];

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold">Dashboard Overview</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent hover:bg-accent-soft"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-accent">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </div>
              <div className="text-2xl text-accent">{stat.icon}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

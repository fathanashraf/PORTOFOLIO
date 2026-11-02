import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Fathan Al Ashraf",
  description: "Dashboard Administrasi Portfolio",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <nav className="flex items-center gap-6 text-sm">
            <a href="/admin" className="hover:text-accent">Overview</a>
            <a href="/admin/profile" className="hover:text-accent">Profile</a>
            <a href="/admin/projects" className="hover:text-accent">Projects</a>
            <a href="/admin/experiences" className="hover:text-accent">Experiences</a>
            <a href="/admin/skills" className="hover:text-accent">Skills</a>
            <a href="/admin/messages" className="hover:text-accent">Messages</a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}

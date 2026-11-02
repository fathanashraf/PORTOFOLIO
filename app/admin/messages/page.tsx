import { prisma } from "@/lib/db/prisma";
import { IoMailUnreadOutline } from "react-icons/io5";

export default async function AdminMessages() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold">Messages</h2>
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-8 text-center text-muted">
            Belum ada pesan
          </div>
        ) : (
          messages.map((msg: any) => (
            <div
              key={msg.id}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{msg.name}</h3>
                  <p className="text-sm text-muted">{msg.email}</p>
                  {msg.subject && (
                    <p className="mt-1 text-sm font-medium">{msg.subject}</p>
                  )}
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    msg.status === "unread"
                      ? "bg-accent-soft text-accent"
                      : "bg-surface-hover text-muted"
                  }`}
                >
                  {msg.status}
                </span>
              </div>
              <p className="whitespace-pre-wrap text-sm text-muted">
                {msg.message}
              </p>
              <p className="mt-3 text-xs text-subtle">
                {new Date(msg.createdAt).toLocaleString("id-ID")}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

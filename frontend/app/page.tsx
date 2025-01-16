"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function Home() {
  const session = authClient.useSession();

  if (session.data?.session) {
    redirect("/dashboard");
  }

  return (
    <div>
      <div className=" ">
        <button className="btn">Button</button>
        <button className="btn btn-neutral">Neutral</button>
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
        <button className="btn btn-ghost">Ghost</button>
        <button className="btn btn-link">Link</button>
      </div>
    </div>
  );
}

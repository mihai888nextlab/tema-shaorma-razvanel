"use client";

import DashboardHeader from "@/app/components/DashboardHeader";
import DashboardSidebar from "@/app/components/DashboardSIdebar";
import Loading from "@/app/components/Loading";
import { useUser } from "@/app/hooks/UserContext";

export default function Dashboard() {
  const user = useUser();

  if (user.loading) {
    return <Loading />;
  }

  return (
    <>
      <DashboardHeader />
      <main className="mt-10 px-20 grid grid-cols-[1fr_3fr]">
        <DashboardSidebar />
        <section className="py-3 px-10">
          <h1 className="m-0 text-3xl">
            <span className="font-bold">Hello,</span> {user.user?.name}
          </h1>
        </section>
      </main>
    </>
  );
}

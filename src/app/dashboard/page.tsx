"use client";

import Loading from "../components/Loading";
import { useUser } from "../hooks/UserContext";

export default function Dashboard() {
  const user = useUser();

  if (user.loading) {
    return <Loading />;
  }

  return <h1>{user?.user?.name}</h1>;
}

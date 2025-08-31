"use client";

import { useRouter } from "next/navigation";
import { useScrollToTop } from "@/hooks";

export default function Page() {
  const router = useRouter();
  useScrollToTop();

  const deleteUserHandler = async () => {
    router.push("/");
  };

  return (
    <div>
      Profile
      <button onClick={deleteUserHandler}>Delete user</button>
    </div>
  );
}

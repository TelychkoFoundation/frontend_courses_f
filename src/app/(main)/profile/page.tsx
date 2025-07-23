"use client";

import { deleteUser } from "@/actions";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const deleteUserHandler = async () => {
    await deleteUser();
    router.push("/login");
  };

  return (
    <div>
      Profile
      <button onClick={deleteUserHandler}>Delete user</button>
    </div>
  );
}

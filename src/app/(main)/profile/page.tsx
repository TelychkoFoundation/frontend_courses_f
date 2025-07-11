"use client";

import { deleteUser } from "../../lib/deleteActions";
import { useUser } from "../../hooks/useUser";
import { useRouter } from "next/navigation";

export default function Page() {
  const { setUser } = useUser();
  const router = useRouter();

  const deleteUserHandler = async () => {
    setUser(null);
    await deleteUser();
    router.push("/");
  };

  return (
    <div>
      Profile <button onClick={deleteUserHandler}>Delete user</button>
    </div>
  );
}

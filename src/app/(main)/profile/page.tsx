"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

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

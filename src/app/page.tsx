import { verifySession } from "@/lib";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const session = await verifySession();

  console.log(session, "SESSION");

  if (!session?.userID) {
    redirect("/login");
  }
}

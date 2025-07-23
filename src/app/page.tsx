import { verifySession } from "@/lib";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const session = await verifySession();

  if (!session?.userID) {
    redirect("/login");
  } else {
    redirect("/courses");
  }
}

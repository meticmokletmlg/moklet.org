import { findAllEvents } from "@/utils/database/event.query";
import AspirationWrapper from "./_components/Wrapper";
import { nextGetServerSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";

export default async function Aspirasi() {
  const events = await findAllEvents();
  const session = await nextGetServerSession();

  if (!session?.user)
    return redirect("/api/auth/signin?callbackUrl=%2Faspirasi");

  return <AspirationWrapper events={events} />;
}

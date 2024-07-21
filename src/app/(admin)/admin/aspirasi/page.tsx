import Filter from "./components/Filter";
import { findAllEvents } from "@/utils/database/event.query";
import AspirationList from "./components/AspirationList";
import { Suspense } from "react";

export default async function AspirasiAdmin() {
  const events = await findAllEvents();

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Filter event={events} />
        <AspirationList />
      </Suspense>
    </>
  );
}

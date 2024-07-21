"use client";

import { aspirationType } from "@/actions/aspirasi";
import { useState } from "react";
import AspirationForm from "./AspirationForm";
import Selector from "./Selector";
import { Event } from "@prisma/client";

export default function AspirationWrapper({ events }: { events: Event[] }) {
  const [type, setType] = useState<aspirationType | undefined>();

  const [recipient, setRecipient] = useState<string | undefined>();
  const [eventName, setEventName] = useState<string | undefined>();

  return (
    <>
      <Selector
        recipient={recipient?.toString()}
        setRecipient={setRecipient}
        setEventName={setEventName}
        setType={setType}
        type={type}
        event={events}
      />
      <AspirationForm
        recipient={recipient!}
        type={type!}
        eventName={eventName!}
      />
    </>
  );
}

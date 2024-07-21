"use server";

import { createEvent } from "@/utils/database/event.query";
import { revalidatePath } from "next/cache";

export async function upsertEvent(data: FormData, userId: string) {
  const date = new Date(data.get("eventDate") as string);
  const event_name = data.get("eventName") as string;

  try {
    await createEvent({
      date,
      event_name,
      user: {
        connect: {
          id: userId,
        },
      },
    });
    revalidatePath("/admin/aspirasi");
    revalidatePath("/aspirasi");
    return {
      success: true,
      message: "Berhasil menambahkan event!",
    };
  } catch (e) {
    return {
      success: false,
      message: "Gagal menambahkan event!",
    };
  }
}

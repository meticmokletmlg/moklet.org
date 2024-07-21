"use client";
import { useFormStatus } from "react-dom";

import { Button } from "@/app/_components/global/Button";

export default function SubmitButton({ label = "Simpan" }: { label?: string }) {
  const { pending } = useFormStatus();

  return (
    <Button variant={"primary"} type="submit" isDisabled={pending}>
      {label}
    </Button>
  );
}

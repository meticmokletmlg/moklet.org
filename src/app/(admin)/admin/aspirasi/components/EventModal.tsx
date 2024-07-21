import { Dispatch, SetStateAction } from "react";
import { FaX } from "react-icons/fa6";

import { upsertEvent } from "@/actions/event";
import { TextField } from "@/app/_components/global/Input";
import SubmitButton from "@/app/_components/global/SubmitButton";
import { H3, P } from "@/app/_components/global/Text";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function EventModal({
  setIsOpenModal,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session } = useSession();

  async function submitForm(data: FormData) {
    const toastId = toast.loading("Membuat Event...");
    const result = await upsertEvent(data, session?.user?.id || "");
    if (result.success) {
      setIsOpenModal(false);
      return toast.success(result.message, { id: toastId });
    }
    return toast.error(result.message, { id: toastId });
  }

  return (
    <div
      className={
        "bg-gray-300/50 fixed w-[calc(100%-20rem)] z-10 justify-center items-center top-0 right-0 h-screen m-auto transition-all duration-500"
      }
    >
      <div className="relative p-4 w-full h-full max-w-2xl max-h-full m-auto top-20">
        <div className="relative bg-white rounded-lg px-10">
          <div className="flex items-center justify-between p-4 md:p-5 border-b">
            <H3>Tambah Event</H3>
            <button
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center transition-all"
              onClick={() => setIsOpenModal(false)}
            >
              <FaX size={25} />
            </button>
          </div>
          <form className="py-6" action={submitForm}>
            <div className="w-full flex flex-col gap-4">
              <TextField
                type="text"
                label="Nama Event"
                required
                name="eventName"
              />
              <div className="w-full">
                <P className="text-black">Tanggal Event</P>
                <input type="date" required name="eventDate" className="mt-1" />
              </div>
            </div>

            <div className="w-full flex justify-end mt-2">
              <SubmitButton label="Tambah" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

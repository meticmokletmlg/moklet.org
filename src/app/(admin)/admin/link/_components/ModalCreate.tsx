import { Dispatch, SetStateAction, useRef, useState } from "react";
import { FaX } from "react-icons/fa6";
import { toast } from "sonner";

import { addLink } from "@/actions/link";
import { TextField } from "@/app/_components/global/Input";
import { H3 } from "@/app/_components/global/Text";
import { LinkWithCountAndUser } from "@/types/entityRelations";

import FormButton from "./part/SubmitButton";

export default function ModalCreate({
  setIsOpenModal,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  link?: LinkWithCountAndUser;
}) {
  const ref = useRef<HTMLFormElement>(null);
  const [password, setPassword] = useState(false);
  async function create(formdata: FormData) {
    const toastId = toast.loading("Loading...");
    const result = await addLink(formdata);
    if (result.error) {
      toast.error(result.message, { id: toastId });
    } else {
      toast.success(result.message, { id: toastId });
      setIsOpenModal(false);
      return ref.current?.reset();
    }
  }

  return (
    <div className="bg-gray-300/50 fixed w-full lg:w-[calc(100%-20rem)] z-10 justify-center items-center top-0 right-0 h-[calc(100%-1rem)] m-auto">
      <div className="relative p-4 w-full h-full max-w-2xl max-h-full m-auto top-20">
        <div className="relative bg-white rounded-lg">
          <form ref={ref} action={create}>
            <div className="flex items-center justify-between p-4 md:p-5 border-b">
              <H3>Create Link</H3>
              <button
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center transition-all"
                onClick={() => setIsOpenModal(false)}
              >
                <FaX size={25} />
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <TextField
                type="url"
                label="Destination"
                name="destLink"
                placeholder="https://example.com/thisisaverylongstringthatyouwouldliketoshorten"
                required={true}
              />
              <TextField
                type="text"
                label="Short URL"
                name="slug"
                placeholder="MokletHebat"
              />
              {password && (
                <TextField
                  type="password"
                  label="Password"
                  placeholder="*******"
                  name="password"
                />
              )}
              <span className="flex gap-1">
                <input
                  id="password"
                  type="checkbox"
                  className="p-2 text-primary-500 accent-primary-500  transition-all"
                  onChange={() => setPassword(!password)}
                />
                <label htmlFor="password">URL Pribadi</label>
              </span>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b justify-end">
              <FormButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

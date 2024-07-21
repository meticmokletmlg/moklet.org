"use client";

import { aspirationType } from "@/actions/aspirasi";
import { SelectField } from "@/app/_components/global/Input";
import { P } from "@/app/_components/global/Text";
import { SmallSectionWrapper } from "@/app/_components/global/Wrapper";
import { Event } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import Select from "react-select";

const organisasis = [
  "OSIS",
  "MPK",
  "BDI",
  "PALWAGA",
  "PASKATEMA",
  "TSBC",
  "TSFC",
  "TSVC",
  "PMR",
  "MEMO",
  "MAC",
  "METIC",
  "COMET",
  "PUSTEL",
  "DA",
].map((a) => ({ label: a, value: a }));

const units = [
  "KURIKULUM",
  "KESISWAAN",
  "SARPRA",
  "HUBIN",
  "ISO",
  "TU",
  "GURU",
].map((a) => ({ label: a, value: a }));

const types = ["ORGANISASI", "EVENT", "SEKOLAH"].map((a) => ({
  label: a,
  value: a,
}));

units.push({ label: "SATPAM / CS", value: "SATPAMCS" });

export default function Selector({
  type,
  setType,
  recipient,
  setRecipient,
  setEventName,
  event,
}: {
  type: string | undefined;
  setType: Dispatch<SetStateAction<aspirationType | undefined>>;
  recipient: string | undefined;
  setRecipient: Dispatch<SetStateAction<string | undefined>>;
  setEventName: Dispatch<SetStateAction<string | undefined>>;
  event: Event[];
}) {
  const events = event.map((a) => ({
    label: a.event_name,
    value: a.id,
  }));

  return (
    <SmallSectionWrapper id="Selector" className="flex flex-col gap-5">
      <div>
        <P className="pb-2">Pilih Tipe Penerima</P>
        <SelectField
          value={type}
          name="type"
          options={types}
          handleChange={(e) => {
            setType(e.currentTarget.value as aspirationType);
          }}
        />
      </div>
      {type === "ORGANISASI" && (
        <div>
          <P className="pb-2">Pilih Organisasi</P>
          <SelectField
            name="organisasi"
            options={organisasis}
            required
            handleChange={(e) => {
              setRecipient(e.currentTarget.value);
            }}
          />
        </div>
      )}
      {type === "SEKOLAH" && (
        <div>
          <P className="pb-2">Pilih Unit Sekolah</P>
          <SelectField
            name="organisasi"
            options={units}
            required
            handleChange={(e) => {
              setRecipient(e.currentTarget.value);
            }}
          />
        </div>
      )}
      {type === "EVENT" && (
        <div>
          <P className="pb-2">Pilih Event</P>
          <Select
            options={events}
            unstyled
            required
            classNames={{
              control: () =>
                "rounded-xl border border-neutral-400 px-[18px] active:border-black hover:border-black py-[14px] text-black placeholder-neutral-500 bg-white focus:outline-none transition-all duration-500",
              menu: () =>
                "bg-white rounded-lg px-[18px] py-[14px] border border-neutral-400",
              multiValue: () =>
                "bg-primary-400 px-4 py-2 text-white rounded-2xl",
              valueContainer: () => "flex gap-2",
              menuList: () => "text-base flex flex-col gap-1",
              option: () =>
                "hover:bg-neutral-300 hover:cursor-pointer transition-all duration-500 rounded-lg p-2",
            }}
            onChange={(e) => {
              setRecipient(e?.value);
              setEventName(
                events.filter((a) => {
                  return a.value === e?.value;
                })[0].label,
              );
            }}
          />
        </div>
      )}
    </SmallSectionWrapper>
  );
}

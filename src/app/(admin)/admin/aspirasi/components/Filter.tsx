"use client";

import LinkButton, { Button } from "@/app/_components/global/Button";
import { SelectField } from "@/app/_components/global/Input";
import { H4, P } from "@/app/_components/global/Text";
import { getDateMonths } from "@/utils/atomics";
import { Event } from "@prisma/client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import EventModal from "./EventModal";
import { FaRegFileExcel } from "react-icons/fa";

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

units.push({ label: "SATPAM / CS", value: "SATPAMCS" });

export default function Filter({ event }: { event: Event[] }) {
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const organ = searchParams.get("organisasi");
  const eventQuery = searchParams.get("event");
  const unit = searchParams.get("unit");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const dateMax = getDateMonths(new Date(from || ""), 6);
  const events = event.map((a) => ({ label: a.event_name, value: a.id }));

  return (
    <>
      {openAddEvent && <EventModal setIsOpenModal={setOpenAddEvent} />}
      <section id="filter" className="flex flex-col gap-4 mb-10">
        {!(unit || eventQuery) && (
          <div>
            <P>Organisasi</P>
            <SelectField
              name="organisasi"
              options={organisasis}
              value={organ || undefined}
              handleChange={(e) => {
                router.push(
                  pathName +
                    `?organisasi=${e.target.value.toLowerCase()}&from=${from || ""}&to=${to || ""}`,
                  { scroll: false },
                );
              }}
            />
          </div>
        )}
        {!(organ || eventQuery) && (
          <div>
            <P>Unit Sekolah</P>
            <SelectField
              name="units"
              value={unit || undefined}
              options={units}
              handleChange={(e) => {
                router.push(
                  pathName + `?unit=${e.target.value.toLowerCase()}&`,
                  { scroll: false },
                );
              }}
            />
          </div>
        )}
        {!(unit || organ) && (
          <div>
            <P>Event</P>
            <div className="flex w-full gap-2">
              <SelectField
                name="event"
                options={events}
                value={eventQuery || ""}
                handleChange={(e) => {
                  router.push(
                    pathName +
                      `?event=${e.target.value}&from=${from || ""}&to=${to || ""}`,
                    { scroll: false },
                  );
                }}
                className="w-full"
              />
              <Button variant={"primary"} onClick={() => setOpenAddEvent(true)}>
                Add
              </Button>
            </div>
          </div>
        )}
        {(organ || unit) && (
          <div>
            <P className="text-black">Range Tanggal</P>
            <div className="flex gap-3 items-center">
              <div className="flex flex-col gap-1">
                <P>Dari tanggal</P>
                <input
                  type="date"
                  defaultValue={from!}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    router.push(
                      pathName +
                        `?${organ ? "organisasi" : "unit"}=${organ || unit}&from=${e.target.value}&to=${to || ""}`,
                      { scroll: false },
                    )
                  }
                />
              </div>
              <H4>-</H4>
              <div className="flex flex-col gap-1">
                <P>Sampai tanggal</P>
                <input
                  type="date"
                  defaultValue={to!}
                  min={
                    from
                      ? new Date(from!).toISOString().split("T")[0]
                      : undefined
                  }
                  max={from ? dateMax.toISOString().split("T")[0] : undefined}
                  onChange={(e) =>
                    router.push(
                      pathName +
                        `?${organ ? "organisasi" : "unit"}=${organ || unit}&from=${from || ""}&to=${e.target.value}`,
                      { scroll: false },
                    )
                  }
                />
              </div>
            </div>
          </div>
        )}
        {(organ || unit || from || to || eventQuery) && (
          <div className="flex justify-between">
            <LinkButton variant={"tertiary"} href={"/admin/aspirasi"}>
              clear filters
            </LinkButton>
            <LinkButton
              href={"aspirasi/excel?" + searchParams.toString()}
              variant={"primary"}
              className="text-center flex gap-2 items-center"
              disabledProgressBar
              target="_blank"
              prefetch={false}
            >
              <FaRegFileExcel />
              Download Excel
            </LinkButton>
          </div>
        )}
      </section>
    </>
  );
}

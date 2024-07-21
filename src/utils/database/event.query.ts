import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";

export const findAllEvents = async (filter?: Prisma.EventWhereInput) => {
  return await prisma.event.findMany({
    where: filter,
    orderBy: { date: "desc" },
  });
};

export const findEvent = async (filter: Prisma.EventWhereUniqueInput) => {
  return await prisma.event.findUnique({ where: filter });
};

export const createEvent = async (data: Prisma.EventCreateInput) => {
  return await prisma.event.create({ data });
};

export const updateEvent = async (
  where: Prisma.EventWhereUniqueInput,
  data: Prisma.EventUpdateInput,
) => {
  return await prisma.event.update({ where, data });
};

export const deleteEvent = async (filter: Prisma.EventWhereUniqueInput) => {
  return await prisma.event.delete({ where: filter });
};

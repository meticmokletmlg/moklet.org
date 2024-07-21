import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";

export const findAllAspirations = async (
  filter?: Prisma.AspirasiWhereInput,
  take?: number,
  skip?: number,
) => {
  return await prisma.aspirasi.findMany({
    where: filter,
    take,
    skip,
    orderBy: { created_at: "desc" },
    include: { user: true },
  });
};

export const countAllAspirations = async (
  filter?: Prisma.AspirasiWhereInput,
) => {
  return await prisma.aspirasi.count({
    where: filter,
  });
};

export const findAllAspirationsWithEvent = async (
  filter?: Prisma.AspirasiWhereInput,
) => {
  return await prisma.aspirasi.findMany({
    where: filter,
    orderBy: { created_at: "desc" },
    include: { user: true, event: { select: { event_name: true } } },
  });
};

export const findAspiration = async (
  filter: Prisma.AspirasiWhereUniqueInput,
) => {
  return await prisma.aspirasi.findUnique({
    where: filter,
    include: { user: true, event: true },
  });
};

export const createAspiration = async (data: Prisma.AspirasiCreateInput) => {
  return await prisma.aspirasi.create({ data });
};

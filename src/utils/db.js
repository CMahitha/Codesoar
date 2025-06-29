// import { PrismaClient } from "../generated/prisma";

import { PrismaClient } from "../generated/prisma/client.js";

const prismadb = new PrismaClient();

// const prismadb = globalThis.prisma || new PrismaClient();
// if (process.env.NODE_ENV != "production") globalThis.prisma = prismadb;

export default prismadb;

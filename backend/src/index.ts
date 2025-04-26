import { startServer } from "./shared/infra/http/server";

const PORT = process.env.PORT || 3000;

const server = startServer(Number(PORT));

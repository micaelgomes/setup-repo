import Fastify from "fastify";
import cors from '@fastify/cors'
import { appRoutes } from "./routes";

const app = Fastify()
app.register(cors)

appRoutes(app);

app.listen({
    port: 3333
}).then(() => {
    console.log('Server is running');
})
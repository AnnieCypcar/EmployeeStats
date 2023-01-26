import app from '../dist/index.js';
import { db } from '../dist/database.js';
const PORT = 4000;

let server = null;

export const Server = {
    start: async () => {
        server = await app.listen(PORT, () => {
            console.log(`app is listening on port ${PORT}`);
        });
    },
    stop: async () => {
        db.close();
        await server.close();
    }
}
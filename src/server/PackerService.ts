import Packer from "@web-atoms/pack/dist/Packer";
import { existsSync, mkdirSync } from "fs";
import FolderWatcher from "./FolderWatcher";

if (!existsSync("./dist")) {
    mkdirSync("./dist");
}

const state = { running: false };

async function pack() {
    try {
        state.running = true;
        const p = new Packer();
        await p.run([]);
    } catch (e) {
        // tslint:disable-next-line: no-console
        console.error(e);
    } finally {
        state.running = false;
    }
}

const fw = new FolderWatcher("./dist", () => {
    if (state.running) { return; }
    pack();
});

pack();

export default { state, fw };

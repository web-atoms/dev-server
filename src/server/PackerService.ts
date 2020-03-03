import Packer from "@web-atoms/pack/dist/Packer";
import { existsSync, mkdirSync } from "fs";
import FolderWatcher from "./FolderWatcher";

if (!existsSync("./dist")) {
    mkdirSync("./dist");
}

const state = { running: false, timeout: null };

async function _pack() {
    try {
        FolderWatcher.busy = true;
        state.running = true;
        const p = new Packer();
        await p.run([]);
    } catch (e) {
        // tslint:disable-next-line: no-console
        console.error(e);
    } finally {
        state.running = false;
        FolderWatcher.busy = false;
    }
}

function pack() {
    if (state.timeout) {
        clearTimeout(state.timeout);
        state.timeout = null;
    }
    state.timeout = setTimeout(() => {
        _pack();
        state.timeout = null;
    }, 500);
}

const fw = new FolderWatcher("./dist", () => {
    if (state.running) { return; }
    pack();
});

pack();

export default { state, fw };

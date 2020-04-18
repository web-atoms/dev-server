
// import * as lockfile from "proper-lockfile";
import * as fs from "fs";
import * as lockfile from "lockfile";

const firstTime = {};

export default function locker(name): (() => void) {
    if (!firstTime[name]) {
        if (fs.existsSync(name)) {
            fs.unlinkSync(name);
        }
        firstTime[name] = locker;
    }
    while (true) {
        try {
            lockfile.lockSync(name, { });
            break;
        } catch (ex) {
            // console.warn(ex);
            continue;
        }
    }
    return () => {
        lockfile.unlockSync(name);
    };
}

import path from "path";
import { remote } from "electron";

const getters = {
  Path() {
    if (remote == null) return "";
    if (process.env.NODE_ENV !== "production") {
      return path.join(remote.app.getAppPath(), "..");
    } else {
      return path.join(remote.app.getAppPath(), "..", "..", "..", "..");
    }
  },
};

export default {
  getters,
};

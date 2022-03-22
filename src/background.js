"use strict";

import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      enableRemoteModule: true,
      webSecurity: false,
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

ipcMain.handle("send-attachments", async (event, arg) => {
  let listImageRes = arg.listImageResult;
  let hostname = arg.hostname;
  let pageId = arg.pageId;
  let base64 = arg.base64;

  let promises = [];
  for (let i = 0; i < listImageRes.length; i++) {
    let arr = listImageRes[i].split("/");
    let filename = arr[arr.length - 1];
    let file = fs.readFileSync(listImageRes[i]);

    let body = new FormData();
    body.append("file", file, {
      filename: filename,
    });
    body.append("minorEdit", "true");

    promises.push(
      axios.post(
        `${hostname}/wiki/rest/api/content/${pageId}/child/attachment`,
        body,
        {
          headers: {
            ...body.getHeaders(),
            Authorization: `Basic ${base64}`,
            "X-Atlassian-Token": "nocheck",
          },
        }
      )
    );
  }

  await Promise.allSettled(promises).catch((err) => {
    return err;
  });
});

ipcMain.handle("create-content", async (event, arg) => {
  let id = 0;
  await axios
    .post(
      `${arg.hostname}/wiki/rest/api/content`,
      JSON.stringify({
        type: "page",
        title: arg.confluenceTitle,
        space: {
          key: arg.space,
        },
        ancestors: arg.ancestors,
        body: {
          storage: {
            value: arg.newBody,
            representation: "storage",
          },
        },
      }),
      {
        headers: {
          Authorization: `Basic ${arg.base64}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Atlassian-Token": "no-check",
        },
      }
    )
    .then((response) => {
      id = response.data.id;
    });

  return id;
});

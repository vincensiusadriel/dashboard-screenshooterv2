<template>
  <div
    :class="{
      'modal modal-full-screen modal-fx-slideBottom': true,
      'is-active': value,
    }"
  >
    <div :class="{ 'loader-wrapper': true, 'is-active': isLoading }">
      <div class="loader is-loading"></div>
    </div>
    <div class="modal-content modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Checkout</p>
        <button
          class="modal-button-close delete"
          aria-label="close"
          @click="close"
        ></button>
      </header>
      <div class="modal-card-body px-0 py-0">
        <!-- Modal card body -->
        <div class="container" style="height: 100%">
          <div class="columns is-mobile" style="height: 100%; width: 100%">
            <div class="column overflown-column is-4" style="background: white">
              <div class="columns is-multiline">
                <div class="column is-full pb-0">
                  <span class="icon-text my-3 mx-3 is-size-7 has-text-info">
                    <span class="icon">
                      <i class="fa fa-info-circle"></i>
                    </span>
                    <span
                      >Please make sure that all of the links bellow are
                      authenticated</span
                    >
                  </span>
                </div>
                <div class="column is-full pt-0">
                  <button
                    class="button is-primary ml-3 mt-3"
                    @click="openChromium(getAllDomain)"
                  >
                    Login All Session
                  </button>
                </div>
              </div>

              <table class="table" width="100%">
                <tbody>
                  <tr v-for="item in getAllDomain" :key="item">
                    <td class="px-1">
                      <div
                        class="icon is-size-7 has-text-success has-tooltip-right cursor-default"
                        data-tooltip="Authenticated"
                        v-if="
                          listOriginCommputed[item] ||
                          listOriginCommputed[getHostName(item)]
                        "
                      >
                        <i class="fa fa-circle" aria-hidden="true"></i>
                      </div>
                      <div
                        class="icon is-size-7 has-text-danger has-tooltip-right cursor-default"
                        data-tooltip="Not Authhenticated"
                        v-else
                      >
                        <i class="fa fa-circle" aria-hidden="true"></i>
                      </div>
                    </td>
                    <td class="pl-0">
                      <a class="is-size-7" @click="openChromium([item])">{{
                        item
                      }}</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="column overflown-column is-4" style="background: white">
              <article v-if="currentPrinted != null">
                <div class="columns is-multiline is-mobile">
                  <div class="column is-full is-size-6">
                    {{ currentPrinted.key }}
                  </div>
                  <div class="column is-full">
                    <progress
                      class="progress is-small is-primary"
                      max="100"
                    ></progress>
                    <div class="control" v-if="timerCount != 0">
                      <div class="columns">
                        <div class="column is-size-7">Wait (second)</div>
                        <div class="column">
                          <input
                            class="input is-small has-text-right"
                            type="number"
                            placeholder="Value"
                            @focus="isHold = true"
                            @blur="isHold = false"
                            v-model="timerCount"
                          />
                        </div>
                      </div>
                    </div>
                    <p v-if="timerCount == 0" class="is-size-7">
                      <i class="fa fa-circle-o-notch fa-spin mr-2"></i>Loading
                    </p>
                  </div>
                  <div class="column is-full">
                    <div class="is-flex is-flex-wrap-wrap">
                      <button
                        class="button is-danger mr-2 mb-2"
                        @click="skip()"
                      >
                        Skip
                      </button>

                      <button
                        :class="{
                          'button is-primary mr-2 mb-2': true,
                          'is-loading': isPrinting,
                        }"
                        @click="takePrint(currentPrinted.key)"
                      >
                        Take a peek
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              <article
                class="post"
                v-for="item in listToBePrinted"
                :key="item.key"
              >
                <div class="columns is-multiline is-mobile">
                  <div class="column is-full is-size-6">{{ item.key }}</div>
                  <div class="column is-full">
                    <div class="control">
                      <input
                        class="input is-small has-text-right"
                        type="number"
                        placeholder="Value"
                        @focus="isHold = true"
                        @blur="isHold = false"
                        v-model="item.timeout"
                      />
                    </div>
                  </div>
                </div>
              </article>
              <article
                class="post"
                v-for="item in linksSelectedExcludeToBePrinted"
                :key="item"
              >
                <div class="columns is-multiline is-mobile">
                  <div class="column is-full is-size-6">
                    <span
                      class="icon has-tooltip-right cursor-default"
                      data-tooltip="Saved"
                      v-if="linksResult[item] != null"
                    >
                      <i
                        class="fa fa-check has-text-success"
                        aria-hidden="true"
                      ></i>
                    </span>
                    {{ item }}
                  </div>
                  <div
                    class="column is-full is-size-7"
                    v-if="linksResult[item] != null"
                  >
                    Captured at: {{ linksResult[item].timestamp }}
                  </div>
                  <div class="column is-full">
                    <div class="is-flex is-flex-wrap-wrap">
                      <button
                        class="button is-primary mr-2 mb-2"
                        @click="startPrint([item])"
                      >
                        Add To Queue
                      </button>
                      <button
                        v-if="linksResult[item] != null"
                        class="button is-info mr-2 mb-2"
                        @click="setCurrentLinkResult(linksResult[item])"
                      >
                        Show Result
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <div class="column overflown-column" style="background: white">
              <div class="mt-4"></div>
              <links-result
                :currentLinkResult="currentLinkResult"
                :counter="counter"
              ></links-result>
            </div>
          </div>
        </div>
      </div>
      <footer class="modal-card-foot px-0 py-0">
        <div class="container">
          <div class="columns is-mobile mx-1 my-1" style="min-width: 100%">
            <div class="column">
              <div class="field">
                <input
                  id="switchIsBackground"
                  type="checkbox"
                  name="switchIsBackground"
                  class="switch is-rounded"
                  :checked="isBackground ? 'checked' : 'unchecked'"
                  v-model="isBackground"
                />
                <label class="is-vcentered pt-0" for="switchIsBackground"
                  >Run on background</label
                >
              </div>
            </div>
            <div class="column">
              <button
                class="button is-primary is-pulled-right mb-2 mr-2"
                @click="startPrint(linksSelectedExcludeToBePrinted)"
              >
                Start Shooting
              </button>
              <button
                class="button is-info is-pulled-right mb-2 mr-2"
                @click="
                  isShowConfluenceModal = true;
                  isDoneGenerateConfluence = false;
                "
              >
                Generate Confluence Report
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>

    <confirmation-modal
      v-model="isShowConfluenceModal"
      :title="'Generate Confluence Report'"
      :yesText="'Generate'"
      :noText="'Cancel'"
      :closeOnYes="false"
      :isLoadingButton="isLoadingPrintConfluence"
      @onYes="printConfluence"
    >
      <div class="columns">
        <div class="column">
          <div class="field is-horizontal">
            <input
              id="switchIsCreateCopy"
              type="checkbox"
              name="switchIsCreateCopy"
              class="switch is-rounded"
              :checked="isCreateCopy ? 'checked' : 'unchecked'"
              v-model="isCreateCopy"
            />
            <label class="is-vcentered pt-0" for="switchIsCreateCopy"
              >Create a copy</label
            >
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Template URL</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input class="input" type="text" v-model="templateURL" />
                </p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal" v-if="isCreateCopy">
            <div class="field-label is-normal">
              <label class="label">Title</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input class="input" type="text" v-model="confluenceTitle" />
                </p>
              </div>
            </div>
          </div>

          <div
            class="notification is-danger"
            v-for="(item, i) in errorConfluence"
            :key="i"
          >
            {{ item }}
          </div>

          <div v-if="isDoneGenerateConfluence" class="notification is-success">
            Successfully Generated
          </div>
        </div>
      </div>
    </confirmation-modal>

    <ConfirmationModal
      v-model="isShowModal"
      :title="'Close Browser'"
      :isHideClose="true"
      :yesText="'Confirm'"
      :noText="'Cancel'"
      @onYes="closeAndSaveChromium()"
      @onNo="closeChromium()"
    >
      Please press confirm to close and save browser session, or cancel to close
      the browser

      <table class="table is-fullwidth is-striped" v-if="listError.length > 0">
        <thead>
          <tr>
            <th>URL</th>
            <th>Error Message</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listError" :key="index">
            <td>{{ item.url }}</td>
            <td>
              {{ item.err }}
            </td>
          </tr>
        </tbody>
      </table>
    </ConfirmationModal>
  </div>
</template>

<script>
import ConfirmationModal from "./ConfirmationModal.vue";
import { chromium, errors } from "playwright";
import path from "path";
import fs from "fs";
import moment from "moment";
import LinksResult from "./LinksResult.vue";
import { ipcRenderer } from "electron";

let context;
let pageMap = {};
const toTimestamp = (strDate) => {
  if (strDate == null || strDate == "") return null;

  const dt = moment(strDate).unix() * 1000;
  if (isNaN(dt)) {
    return null;
  }
  return dt;
};

function wait(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

const replaceWithVar = (toReplace, globalVar, withDoubleQuote) => {
  if (toReplace == null || toReplace == "") return "";
  if (!(typeof toReplace == "string")) return "";
  if (globalVar == null) return toReplace;

  let i = 0;
  let lengthToReplace = toReplace.length;
  let finishString = "";
  let variableName = "";
  let startVar = false;
  while (i < lengthToReplace) {
    if (startVar == true && toReplace[i] == "{") {
      finishString += toReplace[i] + variableName;
    }

    if (toReplace[i] == "{") {
      variableName = "";
      startVar = true;
    } else if (toReplace[i] == "}" && startVar == true) {
      let val = globalVar[variableName];
      if (val != null) {
        if (withDoubleQuote == true) {
          finishString += '"' + val + '"';
        } else {
          finishString += val + "";
        }
      }

      variableName = "";
      startVar = false;
    } else {
      if (startVar == true) {
        variableName += toReplace[i];
      } else {
        finishString += toReplace[i];
      }
    }
    i++;
  }

  //insurance if no closing bracket found
  if (startVar) {
    finishString += `{${variableName}`;
  }

  try {
    let result = eval(finishString);
    return result == null ? "" : result;
  } catch (error) {
    return finishString;
  }
};

const replaceConfluenceAPI = (toReplace, globalVar) => {
  if (toReplace == null || toReplace == "") return ["", []];
  if (!(typeof toReplace == "string")) return ["", []];
  if (globalVar == null) return [toReplace, []];

  let i = 0;
  let lengthToReplace = toReplace.length;
  let finishString = "";
  let variableName = "";
  let startVar = false;
  let imageUrls = [];
  while (i < lengthToReplace) {
    if (startVar == true && toReplace[i] == "{") {
      finishString += toReplace[i] + variableName;
    }

    if (toReplace[i] == "{") {
      variableName = "";
      startVar = true;
    } else if (toReplace[i] == "}" && startVar == true) {
      let temp = variableName.split(".");
      if (temp.length != 3 && temp.length != 2) {
        i++;
        variableName = "";
        startVar = false;
        continue;
      }

      if (globalVar[temp[0]] == null) {
        i++;
        variableName = "";
        startVar = false;
        continue;
      }

      let linkResult = globalVar[temp[0]];
      if (linkResult[temp[1]] == null) {
        i++;
        variableName = "";
        startVar = false;
        continue;
      }

      if (temp[1] == "image") {
        let pathToImage = linkResult["image"];
        if (!fs.existsSync(pathToImage)) {
          i++;
          variableName = "";
          startVar = false;
          continue;
        }

        imageUrls.push(pathToImage);
        finishString += `<ac:image ac:align="center" ac:layout="center"><ri:attachment ri:filename="${temp[0]}.png" /></ac:image>`;
      } else if (temp[1] == "scrapper") {
        if (temp.length != 3) {
          i++;
          variableName = "";
          startVar = false;
          continue;
        }
        if (linkResult["scrapper"][temp[2]] == null) {
          i++;
          variableName = "";
          startVar = false;
          continue;
        }

        let value = linkResult["scrapper"][temp[2]];
        finishString += value + "";
      }

      variableName = "";
      startVar = false;
    } else {
      if (startVar == true) {
        variableName += toReplace[i];
      } else {
        finishString += toReplace[i];
      }
    }
    i++;
  }

  //insurance if no closing bracket found
  if (startVar) {
    finishString += `{${variableName}`;
  }

  return [finishString, imageUrls];
};

const loadSLA = function (pathUrl, listOrigin) {
  const pathToJson = path.join(pathUrl, "state.json");
  if (!fs.existsSync(pathToJson)) {
    return;
  }
  let json = JSON.parse(fs.readFileSync(pathToJson));
  if (json == null) return;
  if (json.origins == null) return;
  if (json.origins.length <= 0) return;
  if (json.cookies == null) return;
  if (json.cookies.length <= 0) return;

  for (let i = 0; i < json.origins.length; i++) {
    if (json.origins[i].origin == null) continue;

    listOrigin[json.origins[i].origin] = true;
  }

  let timeStampInMs =
    window.performance &&
    window.performance.now &&
    window.performance.timing &&
    window.performance.timing.navigationStart
      ? window.performance.now() + window.performance.timing.navigationStart
      : Date.now();

  for (let i = 0; i < json.cookies.length; i++) {
    if (json.cookies[i].domain == null) continue;
    if (json.cookies[i].expires == null) continue;
    if (new Date(json.cookies[i].expires * 1000) < new Date(timeStampInMs))
      continue;

    listOrigin[json.cookies[i].domain] = true;
  }
};
export default {
  components: {
    ConfirmationModal,
    LinksResult,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDoneGenerateConfluence: false,
      browser: null,
      isShowModal: false,
      isShowConfluenceModal: false,
      listOrigin: {},
      listError: [],
      listToBePrinted: [],
      currentPrinted: null,
      timerCount: 0,
      timerInterval: null,
      isHold: false,
      isLoading: false,
      isLoadingPrintConfluence: false,
      isPrinting: false,
      isBackground: true,
      isCreateCopy: true,
      isShowImage: false,
      currentLinkResult: null,
      counter: 0,
      currentShow: "image",
      templateURL: "",
      errorConfluence: [],
      confluenceTitle: "",
    };
  },
  mounted() {
    //test function
    toTimestamp("");
    this.loadResult();
    //end test

    loadSLA(this.Path, this.listOrigin);
  },
  methods: {
    loadResult() {
      const dir = path.join(this.Path, "result");

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      let len = this.linksArr.length;
      for (let i = 0; i < len; i++) {
        let key = this.linksArr[i];
        let imagePath = path.join(dir, `${key}.png`);
        let scrapperPath = path.join(dir, `${key}.json`);
        let payload = { timestamp: "Preload" };
        if (fs.existsSync(imagePath)) {
          payload.image = imagePath;
        }

        if (fs.existsSync(scrapperPath)) {
          payload.scrapper = JSON.parse(fs.readFileSync(scrapperPath));
        }

        if (payload.image != null || payload.scrapper != null) {
          this.$store.commit("ADD_LINK_RESULT", {
            key: key,
            value: payload,
          });
        }
      }
    },
    async printConfluence() {
      this.isLoadingPrintConfluence = true;
      this.isDoneGenerateConfluence = false;
      this.errorConfluence = [];
      let username = this.$store.getters.email;
      let token = this.$store.getters.apiKey;

      let base64 = Buffer.from(`${username}:${token}`).toString("base64");

      let versionNumber;
      let bodyValue;
      let pageTitle;
      if (this.isCreateCopy && this.confluenceTitle == "") {
        this.isLoadingPrintConfluence = false;
        return;
      }
      let ancestors;

      let linkURL = this.templateURL;
      let url = null;
      try {
        url = new URL(linkURL);
      } catch (error) {
        this.errorConfluence.push(error);
        this.isLoadingPrintConfluence = false;
        return;
      }

      if (url == null) {
        this.isLoadingPrintConfluence = false;
        return;
      }

      let arr = url.pathname.split("/");
      if (arr.length < 6) {
        this.isLoadingPrintConfluence = false;
        return;
      }
      let pageId = arr[5];
      let space = arr[3];
      let hostname = url.origin;

      try {
        await fetch(
          `${hostname}/wiki/rest/api/content/${pageId}?expand=body.storage,version,ancestors`,
          {
            method: "GET",
            headers: {
              Authorization: `Basic ${base64}`,
              Accept: "application/json",
            },
          }
        )
          .then((response) => {
            return response.text();
          })
          .then((text) => {
            let obj = JSON.parse(text);
            versionNumber = obj.version.number;
            bodyValue = obj.body.storage.value;
            pageTitle = obj.title;
            ancestors = obj.ancestors;
          });
      } catch (error) {
        this.errorConfluence.push(error);
        this.isLoadingPrintConfluence = false;
        return;
      }

      let [newBody, listImageRes] = replaceConfluenceAPI(
        bodyValue,
        this.linksResult
      );

      if (this.isCreateCopy) {
        try {
          await ipcRenderer
            .invoke("create-content", {
              hostname: hostname,
              base64: base64,
              confluenceTitle: this.confluenceTitle,
              space: space,
              ancestors: ancestors,
              newBody: newBody,
            })
            .then((id) => {
              pageId = id;
            });
        } catch (error) {
          this.errorConfluence.push(error);
          this.isLoadingPrintConfluence = false;

          return;
        }
      } else {
        try {
          await fetch(`${hostname}/wiki/rest/api/content/${pageId}`, {
            method: "PUT",
            headers: {
              Authorization: `Basic ${base64}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: pageId,
              type: "page",
              title: pageTitle,
              space: {
                key: space,
              },
              body: {
                storage: {
                  value: newBody,
                  representation: "storage",
                },
              },
              version: {
                number: ++versionNumber,
              },
            }),
          }).then((response) => {
            return response.text();
          });
        } catch (error) {
          this.errorConfluence.push(error);
          this.isLoadingPrintConfluence = false;

          return;
        }
      }

      await ipcRenderer
        .invoke("send-attachments", {
          listImageResult: listImageRes,
          hostname: hostname,
          pageId: pageId,
          base64: base64,
        })
        .then((result) => {
          if (result == null) return;
          this.errorConfluence.push(result);
        });
      this.isLoadingPrintConfluence = false;
      this.isDoneGenerateConfluence = true;
    },
    setCurrentLinkResult(val) {
      this.counter++;
      this.currentLinkResult = val;
    },
    async takePrint(key) {
      let pathScrapper = null;
      let pathImage = null;
      let scrapperResult = null;
      let imageResult = null;
      let page = pageMap[key];
      this.isPrinting = true;
      const dir = path.join(this.Path, "result");

      if (page == null) {
        this.isPrinting = false;
        return;
      }
      let clip =
        await eval(`page.$eval('${this.links[key].selector}', (element) => {
        const { height, width, x, y } = element.getBoundingClientRect();
        return { height, width, x, y }; })`).catch((err) => {
          console.log("error eval ", err);
          this.isPrinting = false;
          return;
        });

      if (this.links[key].scrapper != null) {
        let scrapperLength = this.links[key].scrapper.length;
        let result = {};
        for (let i = 0; i < scrapperLength; i++) {
          let scrapperObj = this.links[key].scrapper[i];
          if (scrapperObj.selector != null && scrapperObj.selector != "") {
            let els = await eval(`page.$$('${scrapperObj.selector}')`).catch(
              (err) => {
                console.log("error finding parent selector ", err);
              }
            );

            if (els != null) {
              for (let j = 0; j < els.length; j++) {
                let title = "";
                if (
                  scrapperObj.titleSelector == null ||
                  scrapperObj.titleSelector == ""
                ) {
                  title = scrapperObj.titleText;
                } else {
                  title = await eval(
                    `els[j].$eval('${scrapperObj.titleSelector}', el => el.innerText);`
                  ).catch((err) => {
                    console.log("error getting title selector ", err);
                  });
                  if (title == null) {
                    title = scrapperObj.titleText;
                  }
                }

                let value = "";
                let isFirst = true;

                if (scrapperObj.valueSelector != null) {
                  let scrapperValueLength = scrapperObj.valueSelector.length;
                  for (let k = 0; k < scrapperValueLength; k++) {
                    let tempValue = await eval(
                      `els[j].$eval('${scrapperObj.valueSelector[k]}', el => el.innerText);`
                    ).catch(() => {});

                    if (tempValue == null) {
                      tempValue = "";
                    } else {
                      if (isFirst) {
                        isFirst = false;
                      } else {
                        tempValue = " " + tempValue;
                      }
                    }
                    value += tempValue;
                  }
                }

                result[title] = value;
              }
            }
          }
        }

        if (Object.values(result).length > 0) {
          scrapperResult = result;
          let scrapperResultString = JSON.stringify(result, null, 4);
          pathScrapper = path.join(dir, key + ".json");
          fs.writeFileSync(pathScrapper, scrapperResultString);
        }
      }

      if (clip != null) {
        pathImage = path.join(dir, key + ".png");
        imageResult = await page.screenshot({
          type: "png",
          path: pathImage,
          fullPage: false,
          clip: {
            height: clip.height + clip.y + 10,
            width: clip.width + clip.x + 10,
            x: 0,
            y: 0,
          },
        });
      }

      if (imageResult != null || scrapperResult != null) {
        let payload = {
          // image: "data:image/jpeg;base64," + imageResult.toString("base64"),
          image: pathImage,
          scrapper: scrapperResult,
          timestamp: moment().format("MMMM Do YYYY, h:mm:ss a"),
        };

        this.$store.commit("ADD_LINK_RESULT", {
          key: key,
          value: payload,
        });

        this.setCurrentLinkResult(payload);
      }

      this.isPrinting = false;
    },
    async startPrint(list) {
      await wait(100);
      if (this.browser == null) {
        this.isLoading = true;
        const pathToJson = path.join(this.Path, "state.json");
        let noSession = false;
        if (!fs.existsSync(pathToJson)) {
          if (confirm("No session is stored are you sure ?")) {
            noSession = true;
          } else {
            return;
          }
        }
        try {
          this.browser = await chromium.launch({ headless: this.isBackground });

          if (noSession) {
            context = await this.browser.newContext();
          } else {
            context = await this.browser.newContext({
              storageState: pathToJson,
            });
          }
        } catch (error) {
          this.isLoading = false;
          return;
        }
        this.isLoading = false;
      }

      this.listToBePrinted.push(
        ...list.map((x) => {
          return {
            key: x,
            timeout: this.configs.wait,
          };
        })
      );

      if (this.currentPrinted == null) {
        this.currentPrinted = this.listToBePrinted.shift();
      }
    },
    async skip(key) {
      clearInterval(this.timerInterval);

      let currKey = "";
      if (key == "" || key == null) {
        currKey = this.currentPrinted?.key;
      } else {
        currKey = key;
      }

      let page = pageMap[currKey];

      if (page != null) {
        await page.close();
        pageMap[currKey] = null;
      }

      this.currentPrinted = this.listToBePrinted.shift();
    },
    getHostName(link) {
      try {
        return new URL(link).hostname;
      } catch (error) {
        return null;
      }
    },
    async openChromium(links) {
      if (links == null) return;
      if (links.length <= 0) return;

      this.listError = [];

      const pathToJson = path.join(this.Path, "state.json");

      this.browser = await chromium.launch({ headless: false });
      this.isShowModal = true;

      if (fs.existsSync(pathToJson)) {
        context = await this.browser.newContext({
          storageState: pathToJson,
        });
      } else {
        context = await this.browser.newContext();
      }
      for (let i = 0; i < links.length; i++) {
        let page = await context.newPage();
        await page.goto(links[i]).catch(async (err) => {
          this.listError.push({ url: links[i], err: err });
          await page.close();
        });
      }
    },
    async closeAndSaveChromium() {
      const pathToJson = path.join(this.Path, "state.json");
      await context.storageState({ path: pathToJson });
      await this.browser.close();
      this.browser = null;
      this.listOrigin = {};
      loadSLA(this.Path, this.listOrigin);
      this.isShowModal = false;
    },
    async closeChromium() {
      await this.browser.close();
      this.browser = null;
      this.isShowModal = false;
    },
    close() {
      this.$emit("input", false);
    },

    //SCREENSHOOTER LOGIC
  },
  computed: {
    linksResult() {
      return this.$store.getters.linksResult;
    },
    configs() {
      return this.$store.getters.configs;
    },
    globalVar() {
      return this.$store.getters.globalVar;
    },
    globalVarReplaced() {
      let temp = {};
      for (let key in this.globalVar) {
        temp[key] = replaceWithVar(this.globalVar[key], this.globalVar, true);
      }

      return temp;
    },
    listOriginCommputed() {
      return this.listOrigin;
    },
    Path() {
      return this.$store.getters.Path;
    },
    links() {
      return this.$store.getters.links;
    },
    linksArr() {
      return this.$store.getters.linksArr;
    },
    linksSelected() {
      return this.linksArr.filter((x) => this.links[x].selected == true);
    },
    linksSelectedExcludeToBePrinted() {
      return this.linksArr.filter(
        (x) =>
          this.links[x].selected == true &&
          !this.listToBePrinted.some((y) => x == y.key) &&
          this.currentPrinted?.key != x
      );
    },
    getAllDomain() {
      let hostName = this.linksSelected.map((x) => {
        try {
          let url = new URL(this.links[x].link);
          return url.protocol + "//" + url.hostname;
        } catch (error) {
          return null;
        }
      });

      let set = {};
      let res = [];

      for (let i = 0; i < hostName.length; i++) {
        if (hostName[i] in set) {
          continue;
        }
        set[hostName[i]] = true;
        res.push(hostName[i]);
      }

      return res;
    },
  },
  watch: {
    async currentPrinted(oldVal) {
      if (this.browser == null) return;

      if (oldVal == null) {
        await this.browser.close();
        this.browser = null;
        return;
      }

      let key = oldVal.key;

      this.timerCount = 0;

      let url = replaceWithVar(
        this.links[key].link,
        this.globalVarReplaced,
        false
      );

      let page = await context.newPage().catch(() => {
        this.skip();
        return;
      });

      pageMap[key] = page;

      try {
        await page.setViewportSize({
          height: this.configs.layoutHeight,
          width: this.configs.layoutWidth,
        });

        await page.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: this.configs.timeout * 1000,
        });

        const selectorOptions = {
          timeout: this.configs.timeout * 1000,
          visible: true,
        };
        await page.waitForSelector(this.links[key].selector, selectorOptions);
      } catch (error) {
        if (error instanceof errors.TimeoutError) {
          this.skip();
        }
        return;
      }

      clearInterval(this.timerInterval);
      this.timerCount = oldVal.timeout;
      this.timerInterval = setInterval(() => {
        if (this.timerCount > 0) {
          if (this.isHold == false) {
            this.timerCount--;
          }
        } else {
          clearInterval(this.timerInterval);
          this.takePrint(key).then(() => {
            this.skip();
          });
        }
      }, 1000);
    },
  },
};
</script>

<style scoped>
@import "~bulma/css/bulma.css";
@import "~bulma-modal-fx/dist/css/modal-fx.min.css";
.modal-card-head {
  border-top: 4px solid hsl(171, 100%, 41%);
  background-color: white;
}
.modal-card-body {
  background: #ecf0f3;
}
.overflown-column {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  resize: horizontal;
  border-right: 4px solid #ecf0f3;
}
table {
  word-wrap: break-word;
}

.loader-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #fff;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
}

.loader {
  height: 80px;
  width: 80px;
}
.loader-wrapper.is-active {
  opacity: 1;
  z-index: 1;
}
</style>

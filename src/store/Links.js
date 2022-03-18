import Vue from "vue";

const state = {
  linksResult: {},
  links: {
    "newrelic play interactive": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://one.newrelic.com/launcher/dashboards.launcher?platform[filters]=IihuYW1lIExJS0UgJ3BsYXkgcHVibGljJyBPUiBpZCA9ICdwbGF5IHB1YmxpYycgT1IgZG9tYWluSWQgPSAncGxheSBwdWJsaWMnKSI=&platform[timeRange][begin_time]={beginTimestamp}&platform[timeRange][end_time]={endTimestamp}&pane=eyJuZXJkbGV0SWQiOiJkYXNoYm9hcmRzLmRldGFpbCIsInVzZURlZmF1bHRUaW1lUmFuZ2UiOmZhbHNlLCJzZWxlY3RlZFBhZ2UiOiJNekl5TVRrNE5IeFdTVnA4UkVGVFNFSlBRVkpFZkRJeU1EazBPVFUiLCJpc1RlbXBsYXRlRW1wdHkiOmZhbHNlLCJlbnRpdHlHdWlkIjoiTXpJeU1UazROSHhXU1ZwOFJFRlRTRUpQUVZKRWZHUmhPakU0TWpNME5nIn0=&state=c6c88409-26e6-09c1-a8ce-cdf81e54743e",
      scrapper: [],
    },
    "newrelic play summary": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://one.newrelic.com/launcher/dashboards.launcher?platform[filters]=IihuYW1lIExJS0UgJ3BsYXkgcHVibGljJyBPUiBpZCA9ICdwbGF5IHB1YmxpYycgT1IgZG9tYWluSWQgPSAncGxheSBwdWJsaWMnKSI=&platform[timeRange][begin_time]={beginTimestamp}&platform[timeRange][end_time]={endTimestamp}&pane=eyJuZXJkbGV0SWQiOiJkYXNoYm9hcmRzLmRldGFpbCIsInNlbGVjdGVkUGFnZSI6Ik16SXlNVGs0Tkh4V1NWcDhSRUZUU0VKUFFWSkVmREl5T0RZMk1qTSIsImlzVGVtcGxhdGVFbXB0eSI6ZmFsc2UsInVzZURlZmF1bHRUaW1lUmFuZ2UiOmZhbHNlLCJlbnRpdHlHdWlkIjoiTXpJeU1UazROSHhXU1ZwOFJFRlRTRUpQUVZKRWZHUmhPakU1TVRFNU9BIn0=&state=7b24ac68-b040-f15b-6efc-f705029911bc",
      scrapper: [],
    },
    "newrelic entrypoint": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://one.newrelic.com/launcher/dashboards.launcher?platform[filters]=IihuYW1lIExJS0UgJ3BsYXkgcHVibGljJyBPUiBpZCA9ICdwbGF5IHB1YmxpYycgT1IgZG9tYWluSWQgPSAncGxheSBwdWJsaWMnKSI=&platform[timeRange][begin_time]={beginTimestamp}&platform[timeRange][end_time]={endTimestamp}&pane=eyJuZXJkbGV0SWQiOiJkYXNoYm9hcmRzLmRldGFpbCIsInVzZURlZmF1bHRUaW1lUmFuZ2UiOmZhbHNlLCJzZWxlY3RlZFBhZ2UiOiJNekl5TVRrNE5IeFdTVnA4UkVGVFNFSlBRVkpFZkRNd016TTRORGsiLCJpc1RlbXBsYXRlRW1wdHkiOmZhbHNlLCJlbnRpdHlHdWlkIjoiTXpJeU1UazROSHhXU1ZwOFJFRlRTRUpQUVZKRWZHUmhPall3T1RBd01RIn0=&state=9779ff83-d96c-883e-e7a3-1cc9662b0cbc",
      scrapper: [],
    },
    "newrelic channelroom": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://one.newrelic.com/launcher/dashboards.launcher?platform[filters]=IihuYW1lIExJS0UgJ3BsYXkgcHVibGljJyBPUiBpZCA9ICdwbGF5IHB1YmxpYycgT1IgZG9tYWluSWQgPSAncGxheSBwdWJsaWMnKSI=&platform[timeRange][begin_time]={beginTimestamp}&platform[timeRange][end_time]={endTimestamp}&pane=eyJuZXJkbGV0SWQiOiJkYXNoYm9hcmRzLmRldGFpbCIsInVzZURlZmF1bHRUaW1lUmFuZ2UiOmZhbHNlLCJzZWxlY3RlZFBhZ2UiOiJNekl5TVRrNE5IeFdTVnA4UkVGVFNFSlBRVkpFZkRNd016UTBNek0iLCJpc1RlbXBsYXRlRW1wdHkiOmZhbHNlLCJlbnRpdHlHdWlkIjoiTXpJeU1UazROSHhXU1ZwOFJFRlRTRUpQUVZKRWZHUmhPall3T1RBd01RIn0=&state=27ebf8dd-d479-0fe8-54f6-db3c1c075793",
      scrapper: [],
    },
    "newrelic interactive": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://one.newrelic.com/launcher/dashboards.launcher?platform[filters]=IihuYW1lIExJS0UgJ3BsYXkgcHVibGljJyBPUiBpZCA9ICdwbGF5IHB1YmxpYycgT1IgZG9tYWluSWQgPSAncGxheSBwdWJsaWMnKSI=&platform[timeRange][begin_time]={beginTimestamp}&platform[timeRange][end_time]={endTimestamp}&pane=eyJuZXJkbGV0SWQiOiJkYXNoYm9hcmRzLmRldGFpbCIsInVzZURlZmF1bHRUaW1lUmFuZ2UiOmZhbHNlLCJzZWxlY3RlZFBhZ2UiOiJNekl5TVRrNE5IeFdTVnA4UkVGVFNFSlBRVkpFZkRNd016UTVNamMiLCJpc1RlbXBsYXRlRW1wdHkiOmZhbHNlLCJlbnRpdHlHdWlkIjoiTXpJeU1UazROSHhXU1ZwOFJFRlRTRUpQUVZKRWZHUmhPall3T1RBd01RIn0=&state=d9613554-65fc-9cc6-900a-3fcb3dcc1a1b",
      scrapper: [],
    },
    "newrelic socket": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://one.newrelic.com/launcher/dashboards.launcher?platform[filters]=IihuYW1lIExJS0UgJ3BsYXkgcHVibGljJyBPUiBpZCA9ICdwbGF5IHB1YmxpYycgT1IgZG9tYWluSWQgPSAncGxheSBwdWJsaWMnKSI=&platform[timeRange][begin_time]={beginTimestamp}&platform[timeRange][end_time]={endTimestamp}&pane=eyJuZXJkbGV0SWQiOiJkYXNoYm9hcmRzLmRldGFpbCIsInVzZURlZmF1bHRUaW1lUmFuZ2UiOmZhbHNlLCJzZWxlY3RlZFBhZ2UiOiJNekl5TVRrNE5IeFdTVnA4UkVGVFNFSlBRVkpFZkRNd016UTVNelUiLCJpc1RlbXBsYXRlRW1wdHkiOmZhbHNlLCJlbnRpdHlHdWlkIjoiTXpJeU1UazROSHhXU1ZwOFJFRlRTRUpQUVZKRWZHUmhPall3T1RBd01RIn0=&state=c922225d-8331-a895-49e0-d06639a545b9",
      scrapper: [],
    },
    "datadog play-public": {
      selected: true,
      selector: "#sub_board",
      link: "https://app.datadoghq.com/dashboard/cf4-2m2-nrn/play-public?tpl_var_channel_wib={channelId}&from_ts={beginTimestamp}&to_ts={endTimestamp}&live=false",
      scrapper: [
        {
          selector: ".widget.query_value.widget--with_title",
          titleSelector: ".widget__title-text",
          titleText: "",
          valueSelector: [".query-value__value", ".query-value__unit"],
        },
        {
          selector: "#widget_1327558339247072",
          titleSelector: ".widget__title-text",
          titleText: "",
          valueSelector: [".query-value__value", ".query-value__unit"],
        },
      ],
    },
    "datadog groupchat": {
      selected: true,
      selector: "#sub_board",
      link: "https://app.datadoghq.com/dashboard/nae-2rb-chw/play-groupchat-socket-v2?tpl_var_channel_wib={channelId}&from_ts={beginTimestamp}&to_ts={endTimestamp}&live=false",
      scrapper: [],
    },
    "datadog play DB": {
      selected: true,
      selector: "#sub_board",
      link: "https://app.datadoghq.com/dashboard/nfx-j4d-dws/peasant-database-dashboard?tpl_var_database=tokopedia-play&from_ts={beginTimestamp}&to_ts={endTimestamp}&live=false",
      scrapper: [],
    },
    "datadog play-3rd-party": {
      selected: true,
      selector: "#sub_board",
      link: "https://app.datadoghq.com/dashboard/85w-nke-uyd/play-3rd-party?from_ts={beginTimestamp}&to_ts={endTimestamp}&live=false",
      scrapper: [],
    },
    "datadog play-broadcaster": {
      selected: true,
      selector: "#sub_board",
      link: "https://app.datadoghq.com/dashboard/wqm-dgh-dtb/cmp-broadcaster?from_ts={beginTimestamp}&to_ts={endTimestamp}&live=false",
      scrapper: [],
    },
    "datadog broadcaster DB": {
      selected: true,
      selector: "#sub_board",
      link: "https://app.datadoghq.com/dashboard/nfx-j4d-dws/peasant-database-dashboard?tpl_var_database=tokopedia-broadcaster&from_ts={beginTimestamp}&to_ts={endTimestamp}&live=false",
      scrapper: [],
    },

    "grafana play-grpc": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://grafana.tokopedia.net/d/SIhv5217z/gcp-node-alert-play-grpc?orgId=5&refresh=5s&from={beginTimestamp}&to={endTimestamp}",
      scrapper: [],
    },
    "grafana play-cron": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://grafana.tokopedia.net/d/PuERh217z/gcp-node-alert-play-cron?orgId=5&from={beginTimestamp}&to={endTimestamp}",
      scrapper: [],
    },
    "grafana play-nsq": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://grafana.tokopedia.net/d/tIdWthJnk/gcp-node-alert-play-nsq?orgId=5&from={beginTimestamp}&to={endTimestamp}",
      scrapper: [],
    },
    "grafana elastic": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://grafana.tokopedia.net/d/sRIPGxQGk/gcp-elasticsearch-play-es?orgId=5&refresh=1m&from={beginTimestamp}&to={endTimestamp}",
      scrapper: [],
    },
    "grafana redis-system-overview": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://grafana.tokopedia.net/d/5J2rg_Snk/gcp-load-test-redis-system-overview?orgId=5&from={beginTimestamp}&to={endTimestamp}",
      scrapper: [],
    },
    "grafana istio": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://grafana.tokopedia.net/d/LJ_uJAvmk/gcp-kube-istio-service-dashboard?orgId=5&refresh=10s&from={beginTimestamp}&to={endTimestamp}&var-service=play-grpc.play.svc.cluster.local&var-srcns=All&var-srcwl=All&var-dstns=All&var-dstwl=All&var-datasource=Prometheus-istio-main-production-54ad1e",
      scrapper: [],
    },
    "grafana play-interactive-redis": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://grafana-gcp.tokopedia.net/d/7qLlHScGk/redis-system-overview?orgId=1&var-hostgroup%5B%E2%80%A6%5Droxy=affiliate-engine-redis-proxy&var-instance_proxy=All&from={beginTimestamp}&to={endTimestamp}",
      scrapper: [],
    },
    "grafana play-interactive-db": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://grafana-gcp.tokopedia.net/d/SwZS6zeWz/postgresql-loadtest-monitoring?orgId=1&var-service=tokopedia-play-interactive&var-instance=All&from={beginTimestamp}&to={endTimestamp}",
      scrapper: [],
    },
    "grafana play-interactive-nsq": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://grafana.tokopedia.net/d/Yi1NuVWnz/gcp-node-alert-play-interactive-nsq?orgId=5&from={beginTimestamp}&to={endTimestamp}",
      scrapper: [],
    },
    "grafana play-interactive-grpc": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://grafana.tokopedia.net/d/cUnKJ7m7z/gcp-node-alert-play-interactive-grpc?orgId=5&from={beginTimestamp}&to={endTimestamp}",
      scrapper: [],
    },
    "grafana broadcaster-grpc": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://grafana.tokopedia.net/d/unAAb2Jnk/gcp-node-alert-broadcaster-grpc?orgId=5&from={beginTimestamp}&to={endTimestamp}",
      scrapper: [],
    },
    "grafana broadcaster-cron": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://grafana.tokopedia.net/d/sTXtfhJ7k/gcp-node-alert-broadcaster-cron?orgId=5&refresh=10s&from={beginTimestamp}&to={endTimestamp}",
      scrapper: [],
    },
    "grafana broadcaster-mq": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://grafana.tokopedia.net/d/-ANha2J7k/gcp-node-alert-broadcaster-mq?orgId=5&refresh=5s&from={beginTimestamp}&to={endTimestamp}",
      scrapper: [],
    },
    "grafana broadcaster-report-grpc": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://grafana.tokopedia.net/d/S0j02z-7k/gcp-node-alert-broadcaster-report-grpc?orgId=5&refresh=10s&from={beginTimestamp}&to={endTimestamp}",
      scrapper: [],
    },
    "grafana broadcaster-report-cron": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://grafana.tokopedia.net/d/vy1ehh17k/gcp-node-alert-broadcaster-report-cron?orgId=5&refresh=5s&from={beginTimestamp}&to={endTimestamp}",
      scrapper: [],
    },
    "grafana broadcaster-report-nsq": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://grafana.tokopedia.net/d/o1MSE21nk/gcp-node-alert-broadcaster-report-nsq?orgId=5&refresh=5s&from={beginTimestamp}&to={endTimestamp}",
      scrapper: [],
    },
    "grafana groupchat-socketv2": {
      selected: true,
      selector: ".react-grid-layout",
      link: "https://grafana.tokopedia.net/d/v2OvTh1nz/gcp-node-alert-groupchat-socketv2?orgId=5&from={beginTimestamp}&to={endTimestamp}",
      scrapper: [],
    },
  },
  linksArr: [
    "newrelic play interactive",
    "newrelic play summary",
    "newrelic entrypoint",
    "newrelic channelroom",
    "newrelic interactive",
    "newrelic socket",
    "datadog play-public",
    "datadog groupchat",
    "datadog play DB",
    "datadog play-3rd-party",
    "datadog play-broadcaster",
    "datadog broadcaster DB",
    "grafana play-grpc",
    "grafana play-cron",
    "grafana play-nsq",
    "grafana elastic",
    "grafana redis-system-overview",
    "grafana istio",
    "grafana play-interactive-redis",
    "grafana play-interactive-db",
    "grafana play-interactive-nsq",
    "grafana play-interactive-grpc",
    "grafana broadcaster-grpc",
    "grafana broadcaster-cron",
    "grafana broadcaster-mq",
    "grafana broadcaster-report-grpc",
    "grafana broadcaster-report-cron",
    "grafana broadcaster-report-nsq",
    "grafana groupchat-socketv2",
  ],
};

const mutations = {
  ADD_LINK_RESULT(state, payload) {
    if (payload == null) return;
    Vue.set(state.linksResult, payload.key, payload.value);
  },
  ADD_LINK(state, value) {
    if (value == "" || value == null) return;

    Vue.set(state.links, value, {
      selected: false,
      selector: "",
      link: "",
      scrapper: [],
    });

    state.linksArr.unshift(value);
  },
  DELETE_LINK(state, value) {
    if (value == null || value == "") return;
    Vue.delete(state.links, value);

    state.linksArr = state.linksArr.filter((x) => x != value);
  },
  ADD_SCRAPPER(state, value) {
    if (value == null) return;
    if (
      state.links[value.key].scrapper.length > 0 &&
      state.links[value.key].scrapper[0].selector == ""
    )
      return;

    state.links[value.key].scrapper.unshift({
      selector: "",
      titleSelector: "",
      titleText: "",
      valueSelector: [],
    });
  },
  DELETE_SCRAPPER(state, value) {
    if (value == null) return;
    if (value.key == "" || value.index < 0) return;

    state.links[value.key].scrapper.splice(value.index, 1);
  },
  ADD_VALUE_SELECTOR(state, value) {
    if (value == null) return;

    let len =
      state.links[value.key].scrapper[value.indexScrapper].valueSelector.length;

    if (
      len > 0 &&
      state.links[value.key].scrapper[value.indexScrapper].valueSelector[
        len - 1
      ] == ""
    )
      return;

    state.links[value.key].scrapper[value.indexScrapper].valueSelector.push("");
  },
  DELETE_VALUE_SELECTOR(state, value) {
    if (value == null) return;
    if (value.key == "" || value.indexScrapper < 0 || value.indexSelector < 0)
      return;

    state.links[value.key].scrapper[value.indexScrapper].valueSelector.splice(
      value.indexSelector,
      1
    );
  },
  TOGGLE_SELECTED(state, payload) {
    if (payload == null) return;

    state.links[payload.key].selected = payload.value;
  },
};

const getters = {
  links(state) {
    return state.links;
  },
  linksArr(state) {
    return state.linksArr;
  },
  linksResult(state) {
    return state.linksResult;
  },
};

export default {
  state,
  mutations,
  getters,
};

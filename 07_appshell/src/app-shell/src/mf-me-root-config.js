import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@mf-me/navigation",
  app: () => System.import("@mf-me/navigation"),
  activeWhen: ["/", () => true],
});

registerApplication({
  name: "@mf-me/vue-app",
  app: () => System.import("@mf-me/vue-app"),
  activeWhen: ["/vue"],
});

start({
  urlRerouteOnly: true,
});

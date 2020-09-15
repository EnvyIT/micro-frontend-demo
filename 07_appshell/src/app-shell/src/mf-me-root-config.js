import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

/*configuration for the single-spa layout engine*/
const routes = constructRoutes(document.querySelector("#single-spa-layout"));

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});

const layoutEngine = constructLayoutEngine({ routes, applications });
applications.forEach(registerApplication);

start({
  urlRerouteOnly: true,
});

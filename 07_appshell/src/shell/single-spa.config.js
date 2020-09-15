import * as singleSpa from 'single-spa';

const app1 = 'app1';
const app2 = 'app2';
/* The loading function is a function that returns a promise that resolves with the JavaScript application module.
 * The purpose of it is to facilitate lazy loading -- single-spa will not download the code for a application until it needs to.
 * In this example, import() is supported in webpack and returns a Promise, but single-spa works with any loading function that returns a Promise.
 */
const loadApp1 = () => import('../app1/app1.js');
const loadApp2 = () => import('../app2/app2.js');
/* single-spa does some top-level routing to determine which application is active for any url. You can implement this routing any way you'd like.
 * One useful convention might be to prefix the url with the name of the app that is active, to keep your top-level routing simple.
 */
const activityFunction = (location, route) => location.pathname.startsWith(`/${route}`);

singleSpa.registerApplication(app1, loadApp1, location => activityFunction(location, app1));
singleSpa.registerApplication(app2, loadApp2, location => activityFunction(location, app2));


singleSpa.start();

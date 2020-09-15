//app1.js
let domEl;
export function bootstrap(props) {
  return Promise
  .resolve()
  .then(() => {
    domEl = document.createElement('div');
    domEl.id = 'app2';
    document.body.appendChild(domEl);
  });
}
export function mount(props) {
  return Promise
  .resolve()
  .then(() => {
    // This is where you would normally use a framework to mount some ui to the dom. See https://single-spa.js.org/docs/ecosystem.html.
    domEl.textContent = 'App 2 is mounted!'
  });
}
export function unmount(props) {
  return Promise
  .resolve()
  .then(() => {
    // This is normally where you would tell the framework to unmount the ui from the dom. See https://single-spa.js.org/docs/ecosystem.html
    domEl.textContent = '';
  })
}

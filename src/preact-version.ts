import { h } from "preact";
import { renderToString } from "preact-render-to-string";

// Create your app
const app = h(
  "h1",
  null,
  h("h2", null, "amogus"),
  "Hello World!",
  "asd",
);
// console.log(app);
const output = renderToString(app);
console.log(output);

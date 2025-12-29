import { URL } from "node:url";
import { h } from "./core/h.ts";
import { ChildrenProps, Fragment } from "./core/vnode.ts";
import { htm } from "./htm/htm.ts";
import "./preact-version.ts";
import { renderToString } from "./render/renderToString.ts";
console.log("Preact Version^^^");

function MyComponent(
  { children }: ChildrenProps,
) {
  console.log("ComponentChildren", children);
  return h(Fragment, null, h("h2", null, "asd"), "Pugs are cute!");
}
type CommentsType = {
  postId: number;
  id: number;
  name: string;
  user: { username: string };
  body: string;
}[];
function ListComments({ comments }: { comments: CommentsType }) {
  return h(
    "ul",
    null,
    ...comments.map((comment) =>
      h(
        "li",
        null,
        h("strong", null, comment.name),
        h("span", null, ` (${comment.user.username})`),
        h("p", null, comment.body),
      )
    ),
  );
}
const comments: CommentsType = await fetch(
  "https://dummyjson.com/comments?limit=0",
)
  .then((r) => r.json()).then((r) => r.comments);
const app = h(
  Fragment,
  null,
  "Hello World!",
  h(MyComponent, null, "asd"),
  h(ListComments, { comments }),
);
const app2 = htm`hello ${MyComponent}`;
console.log(app);
console.log("app2", app2);
const renderedApp = renderToString(app);
// console.log(renderedApp);
Deno.serve((req) => {
  const url = new URL(req.url);
  if (url.pathname == "/") {
    return new Response(renderedApp, {
      headers: { "content-type": "text/html" },
    });
  }
  return new Response("404-File not found", { status: 404 });
});

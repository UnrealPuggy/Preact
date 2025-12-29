import { Fragment, VChild } from "../core/vnode.ts";

export function renderToString(node: VChild): string {
  if (node == null || typeof node === "boolean") return "";

  if (typeof node === "string" || typeof node === "number") {
    return node.toString();
  }

  // Component
  if (typeof node.type === "function") {
    return renderToString(node.type(node.props));
  }
  if (node.type === Fragment) {
    return (node.props.children ?? [])
      .map(renderToString)
      .join("");
  }
  // Host element
  const { type, props } = node;
  const children = props.children ?? [];
  const innerHTML = children.map(renderToString).join("");

  return `<${type}>${innerHTML}</${type}>`;
}

import { h } from "../core/h.ts";
import { Fragment, VChild, VNode } from "../core/vnode.ts";

export function htm(
  strings: TemplateStringsArray,
  ...values: VNode["type"][]
): VChild {
  const result: VChild[] = [];

  strings.forEach((str, i) => {
    const text = str.trim();
    if (text) result.push(text); // literal text
    if (i < values.length) {
      let val = values[i] as VChild;
      if (typeof val === "function") {
        val = h(val, null);
      }
      if (Array.isArray(val)) {
        result.push(...val); // flatten arrays
      } else {
        result.push(val);
      }
    }
  });

  if (result.length === 1) return result[0];
  return h(Fragment, null, ...result);
}

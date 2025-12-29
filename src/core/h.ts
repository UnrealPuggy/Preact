import {
  ChildrenProps,
  Fragment,
  FunctionComponent,
  VChild,
  VNode,
} from "./vnode.ts";

type PropsOrNull<P> = keyof P extends never ? P & ChildrenProps | null
  : P & ChildrenProps;

export function h<P>(
  type: FunctionComponent<P>,
  props: PropsOrNull<P>,
  ...children: VChild[]
): VNode;

export function h(
  type: string,
  props: ChildrenProps | null,
  ...children: VChild[]
): VNode;

export function h(
  type: typeof Fragment,
  props: ChildrenProps | null,
  ...children: VChild[]
): VNode;

export function h<P>(
  type: VNode["type"],
  props: P | null,
  ...children: VChild[]
): VNode {
  return {
    type,
    props: {
      ...(props ?? {}),
      children,
    },
  } as VNode;
}

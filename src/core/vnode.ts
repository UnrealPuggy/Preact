// core/vnode.ts
export type VChild = VNode | string | number | boolean | null;
type EmptyObject = Record<PropertyKey, never>;

export type ComponentChildren = VChild[];

export type ChildrenProps = { children?: ComponentChildren };
export type FunctionComponent<P> = (props: P & ChildrenProps) => VNode;
export type HostVNode = {
	type: string;

	props: ChildrenProps;
};

// stfu
// deno-lint-ignore ban-types
export type ComponentVNode<P = {}> = {
	type: FunctionComponent<P>;
	props: P & ChildrenProps;
};

export const Fragment = Symbol('Fragment');

export type FragmentVNode = {
	type: typeof Fragment;
	props: ChildrenProps;
};

export type VNode = HostVNode | ComponentVNode | FragmentVNode;

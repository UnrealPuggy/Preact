type unionThing<P> = P & { children?: string[] };
function test({ a, children }: unionThing<{ a: number }>) {
}
function doIt<P>(
  comp: (props: unionThing<P>) => unknown,
  props: unionThing<P>,
) {
}
doIt(test, { children: [], a: 1 });

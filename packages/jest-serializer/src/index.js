import { createSerializer } from "enzyme-to-json";
import minimalise, {
  minimaliseTransform,
  minimalWebTransform,
  minimalWeb
} from "./minimalise";
import flattenStyle, { flattenStyleTransform } from "./flatten-style";
import replace, {
  justChildren,
  propsNoChildren,
  replaceTransform
} from "./replace";
import replaceProp, { replacePropTransform } from "./replace-prop";
import hoistStyle, { hoistStyleTransform } from "./hoist-style";
import traverse from "./traverse";
import print, { stylePrinter } from "./printers";

const compose = (printer, ...transformers) =>
  traverse(printer, (accum, node, props, children) =>
    transformers.reduce(
      ({ accum: a, node: n, props: p, children: c }, transformer) => {
        if (!n) {
          return {
            accum: a,
            children: c,
            node: n,
            props: p
          };
        }

        return transformer(a, n, p, c);
      },
      {
        accum,
        children,
        node,
        props
      }
    )
  );

const addSerializers = (expect, ...serializers) => {
  serializers.forEach(serializer => expect.addSnapshotSerializer(serializer));
};

const enzymeRenderedSerializer = () => createSerializer({ mode: "deep" });

const enzymeRootSerializer = () => createSerializer({ mode: "shallow" });

const enzymeTreeSerializer = () => createSerializer();

export {
  addSerializers,
  compose,
  enzymeRenderedSerializer,
  enzymeRootSerializer,
  enzymeTreeSerializer,
  flattenStyle,
  flattenStyleTransform,
  hoistStyle,
  hoistStyleTransform,
  justChildren,
  minimalise,
  minimaliseTransform,
  minimalWeb,
  minimalWebTransform,
  print,
  propsNoChildren,
  replace,
  replaceProp,
  replacePropTransform,
  replaceTransform,
  stylePrinter
};

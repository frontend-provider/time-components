import React from "react";
import { colours } from "@times-components/styleguide";
import { defaultProps, propTypes } from "./gradient-prop-types";
import GradientBase from "./gradient.base";

const Gradient = props => (
  <GradientBase
    {...props}
    endColour={colours.functional.backgroundSecondary}
    startColour={colours.functional.backgroundPrimary}
  />
);

Gradient.propTypes = propTypes;
Gradient.defaultProps = defaultProps;

export default Gradient;
export { default as OverlayGradient } from "./overlay-gradient";

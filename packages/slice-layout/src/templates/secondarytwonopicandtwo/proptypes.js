import PropTypes from "prop-types";

const propTypes = {
  breakpoint: PropTypes.string,
  renderSecondary1: PropTypes.func.isRequired,
  renderSecondary2: PropTypes.func.isRequired,
  renderSupport1: PropTypes.func.isRequired,
  renderSupport2: PropTypes.func.isRequired
};

export default propTypes;

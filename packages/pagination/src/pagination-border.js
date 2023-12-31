import React from "react";
import { TcView } from "@times-components/utils";
import styled from "styled-components";
import PropTypes from "prop-types";
import { breakpoints, colours } from "@times-components/ts-styleguide";

const BorderWithResults = styled(TcView)`
  border-style: solid;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  border-bottom-color: ${colours.functional.keyline};
  border-bottom-width: 1px;
  border-top-color: ${colours.functional.keyline};
  border-top-width: 1px;

  @media (min-width: ${breakpoints.medium}px) {
    border-top-width: 0px;
  }
`;

const BorderWithoutResults = styled(TcView)`
  border-style: solid;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  border-bottom-color: ${colours.functional.keyline};
  border-bottom-width: 1px;
  border-top-color: ${colours.functional.keyline};
  border-top-width: 1px;
`;

const PaginationBorder = ({ children, hideResults }) =>
  hideResults ? (
    <BorderWithoutResults>{children}</BorderWithoutResults>
  ) : (
    <BorderWithResults>{children}</BorderWithResults>
  );

PaginationBorder.propTypes = {
  children: PropTypes.node.isRequired,
  hideResults: PropTypes.bool
};

PaginationBorder.defaultProps = {
  hideResults: false
};

export default PaginationBorder;

import React from "react";
import Context from "@times-components/context";
import { checkStylesForUnits } from "@times-components/utils";
import {
  ArticleFlags,
  UpdatedTimeProvider
} from "@times-components/ts-components";
import { fontsWithFallback } from "@times-components/ts-styleguide";
import Label from "../article-label/article-label";
import Meta from "../article-meta/article-meta";
import Standfirst from "../article-standfirst/article-standfirst";
import {
  articleHeaderPropTypes,
  articleHeaderDefaultProps
} from "./article-header-prop-types";
import styles from "../styles";

import {
  FlagsContainer,
  HeaderContainer,
  HeadlineContainer
} from "../styles/responsive";

const headlineContainerStyles = (headlineFont, headlineCase) =>
  checkStylesForUnits({
    ...styles.articleHeadline,
    fontFamily: headlineFont ? fontsWithFallback[headlineFont] : null,
    textTransform: headlineCase || null
  });

const ArticleHeader = ({
  bylines,
  flags,
  hasVideo,
  headline,
  label,
  publicationName,
  publishedTime,
  standfirst,
  updatedTime
}) => (
  <Context.Consumer>
    {({ theme: { headlineFont, headlineCase } }) => (
      <HeaderContainer style={styles.container}>
        <Label isVideo={hasVideo} label={label} />
        <HeadlineContainer
          role="heading"
          aria-level="1"
          styles={headlineContainerStyles(headlineFont, headlineCase)}
        >
          {headline}
        </HeadlineContainer>
        <FlagsContainer>
          <UpdatedTimeProvider updatedTime={updatedTime}>
            <ArticleFlags flags={flags} />
          </UpdatedTimeProvider>
        </FlagsContainer>
        <Standfirst standfirst={standfirst} />
        <Meta
          bylines={bylines}
          publicationName={publicationName}
          publishedTime={publishedTime}
        />
      </HeaderContainer>
    )}
  </Context.Consumer>
);

ArticleHeader.propTypes = articleHeaderPropTypes;
ArticleHeader.defaultProps = articleHeaderDefaultProps;

export default ArticleHeader;

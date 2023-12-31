import React from 'react';
import { Block, Divider, GridLayout, BreakpointKeys } from 'newskit';
import { Article, ArticleProps } from '../../components/slices/article';
import { StackItem, StyledDivider, ScrollContainer } from '../shared-styles';
import { ComposedArticleStack } from './composed-article-stack';
import { clearCreditsAndCaption } from '../../utils/clear-credits-and-caption';
import { ClickHandlerType } from '../types';

export const ArticleStackLarge = ({
  articles,
  breakpoint,
  clickHandler
}: {
  articles: ArticleProps[];
  breakpoint: BreakpointKeys;
  clickHandler: ClickHandlerType;
}) => {
  const articleGrid = (
    <GridLayout
      columns={{
        xs: '170px 1px 170px 1px 170px 1px 170px 1px 170px',
        md: '1fr 1px 1fr 1px 1fr',
        lg: '1fr',
        xl: '1fr'
      }}
      style={{ position: 'relative' }}
      columnGap={{ xs: 'space040', xl: 'space060' }}
      rowGap="space040"
      data-testid="article-container"
    >
      {articles.map((article: ArticleProps, articleIndex, articleArr) => {
        const articleBorder = breakpoint !== 'lg' &&
          breakpoint !== 'xl' &&
          articleIndex < articleArr.length - 1 && (
            <StyledDivider
              overrides={{ stylePreset: 'lightDivider' }}
              vertical
            />
          );
        const topArticle = articleIndex === 0;
        const articleTopBorder =
          (breakpoint === 'xl' && articleIndex > 0) ||
          (breakpoint === 'lg' && articleIndex > 0);

        return (
          <React.Fragment key={article.headline}>
            <Article
              article={{
                ...clearCreditsAndCaption(article),
                hasTopBorder: articleTopBorder,
                hideImage:
                  (breakpoint === 'lg' && !topArticle) || article.hideImage
              }}
              clickHandler={clickHandler}
            />
            {articleBorder}
          </React.Fragment>
        );
      })}
    </GridLayout>
  );

  const isMob = breakpoint === 'xs' || breakpoint === 'sm';

  return isMob ? (
    <ScrollContainer
      overrides={{ overlays: { stylePreset: 'menuScrollOverlay' } }}
      tabIndex={undefined}
    >
      {articleGrid}
    </ScrollContainer>
  ) : (
    articleGrid
  );
};

export const ArticleStackSmall = ({
  articles,
  isFullWidth,
  hideImage,
  hasTopBorder,
  breakpoint,
  clickHandler
}: {
  articles: ArticleProps[];
  isFullWidth: boolean;
  hideImage: boolean;
  hasTopBorder: boolean;
  breakpoint: BreakpointKeys;
  clickHandler: ClickHandlerType;
}) => {
  const articleGrid = (
    <GridLayout columns={{ md: '1fr 1px 1fr' }} columnGap={{ md: 'space040' }}>
      {articles.map((article: ArticleProps, articleIndex, articleArr) => {
        const articleBorder = breakpoint !== 'xs' &&
          breakpoint !== 'sm' &&
          articleIndex < articleArr.length - 1 && (
            <Divider
              overrides={{
                stylePreset: 'lightDivider'
              }}
              vertical
            />
          );
        return (
          <React.Fragment key={article.headline}>
            <Block marginBlockEnd={{ xs: 'space040', md: 'space000' }}>
              <Article
                article={{
                  ...clearCreditsAndCaption(article),
                  hasTopBorder,
                  hideImage,
                  isFullWidth
                }}
                clickHandler={clickHandler}
              />
            </Block>
            {articleBorder}
          </React.Fragment>
        );
      })}
    </GridLayout>
  );

  return <>{articleGrid}</>;
};

export const ArticleStackLeadStory = ({
  mdWidth,
  modifedArticles,
  breakpoint,
  clickHandler
}: {
  mdWidth: string;
  modifedArticles: ArticleProps[];
  breakpoint: BreakpointKeys;
  clickHandler: ClickHandlerType;
}) => {
  return (
    <StackItem
      $width={{
        md: mdWidth,
        lg: '185px',
        xl: '402px'
      }}
      marginBlockStart={{
        xs: 'space040',
        lg: 'space000'
      }}
    >
      <ComposedArticleStack
        articles={modifedArticles}
        breakpoint={breakpoint}
        clickHandler={clickHandler}
      />
    </StackItem>
  );
};

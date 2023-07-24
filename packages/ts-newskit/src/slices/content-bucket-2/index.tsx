import { GridLayout, useBreakpointKey, BreakpointKeys } from 'newskit';
import React, { useState, useEffect } from 'react';
import {
  SliceHeader,
  SliceHeaderProps
} from '../../components/slices/slice-header';
import { Article, ArticleProps } from '../../components/slices/article';
import { StackItem, StyledDivider } from '../shared-styles';
import { CustomStackLayout } from '../shared';
import { FullWidthBlock } from '../../components/slices/shared-styles';

export interface ContentBucket2Props {
  section: SliceHeaderProps;
  articles: ArticleProps[];
}

export const ContentBucket2 = ({ section, articles }: ContentBucket2Props) => {
  const [currentBreakpoint, setBreakpoint] = useState<BreakpointKeys>('xs');
  const breakpointKey = useBreakpointKey();
  useEffect(
    () => {
      setBreakpoint(breakpointKey);
    },
    [breakpointKey]
  );
  const isMob = currentBreakpoint === 'xs' || currentBreakpoint === 'sm';

  return (
    <CustomStackLayout>
      <StackItem>
        <FullWidthBlock>
          <SliceHeader {...section} />
        </FullWidthBlock>
      </StackItem>
      <StackItem>
        <GridLayout
          columns={{
            xs: '1fr',
            md: '1fr 1px 1fr 1px 1fr 1px 1fr'
          }}
          columnGap="space040"
          rowGap="space040"
          data-testid="article-container"
        >
          {articles.map((article: ArticleProps, articleIndex, articleArr) => {
            const articleBorder = articleIndex < articleArr.length - 1 &&
              !isMob && (
                <StyledDivider
                  overrides={{ stylePreset: 'lightDivider' }}
                  vertical
                />
              );

            const isAfterFirstArticle = isMob && articleIndex > 0;

            return (
              <React.Fragment key={article.headline}>
                <Article
                  {...article}
                  hideImage={isAfterFirstArticle}
                  isLeadImage={isMob && articleIndex === 0}
                  hasTopBorder={isMob && articleIndex > 0}
                />
                {articleBorder}
              </React.Fragment>
            );
          })}
        </GridLayout>
      </StackItem>
    </CustomStackLayout>
  );
};

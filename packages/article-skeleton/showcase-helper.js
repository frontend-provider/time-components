/* eslint-disable react/prop-types,no-shadow */
import React from "react";
import { Text, View } from "react-native";
import pick from "lodash.pick";
import { sections } from "@times-components/storybook";
import articleAdConfig from "@times-components/ad/fixtures/article-ad-config.json";
import { ContextProviderWithDefaults } from "@times-components/context";
import { colours, scales } from "@times-components/styleguide";
import storybookReporter from "@times-components/tealium-utils";
import { MockBookmarksProvider } from "@times-components/provider-test-tools";
import {
  getNewsletter,
  subscribeNewsletter
} from "@times-components/provider-queries";
import fullArticleFixture from "./fixtures/full-article";
import ArticleSkeleton from "./src/article-skeleton";

const mocks = [
  ...["TNL-119", "TNL-101"].map(code => ({
    request: {
      query: getNewsletter,
      variables: {
        code
      }
    },
    result: {
      data: {
        newsletter: {
          id: "a2l6E000000CdHzQAK",
          isSubscribed: false,
          title: "Title",
          __typename: "Newsletter"
        }
      }
    },
    newData: () => ({
      data: {
        newsletter: {
          id: "a2l6E000000CdHzQAK",
          isSubscribed: false,
          title: "Title",
          __typename: "Newsletter"
        }
      }
    })
  })),
  {
    request: {
      query: subscribeNewsletter,
      variables: {
        code: "TNL-119"
      }
    },
    result: {
      data: {
        subscribeNewsletter: {
          id: "a2l6E000000CdHzQAK",
          isSubscribed: true,
          __typename: "Newsletter"
        }
      }
    },
    delay: 2000
  }
];

const TestHeader = () => (
  <View
    style={{
      alignItems: "center",
      borderColor: "#66666",
      borderWidth: 1,
      justifyContent: "center",
      margin: 20,
      padding: 20
    }}
  >
    <Text>THIS IS A TEST ARTICLE HEADER</Text>
  </View>
);

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const selectScales = select => select("Scale", scales, scales.medium);
const selectSection = select =>
  select("Section", pick(colours.section, sections), colours.section.default);

const renderArticleSkeleton = ({
  boolean,
  decorateAction,
  hasScaling,
  select
}) => {
  const scale = hasScaling ? selectScales(select) : null;
  const sectionColour = selectSection(select);
  const commentsEnabled = boolean("Comments Enabled?", true);
  const relatedArticleSlice = boolean("Related Articles?", true);
  const topics = boolean("Topics?", true);
  const header = boolean("Header?", false);
  const isPreview = boolean("Preview?", false);
  const inlineRelatedArticlesFlag = boolean(
    "Inline Related Articles",
    false,
    "User State"
  );

  const config = {
    commentsEnabled: commentsEnabled ? undefined : false,
    relatedArticleSlice: relatedArticleSlice ? undefined : null,
    topics: topics ? undefined : []
  };

  const data = fullArticleFixture(config);
  const showHeader = header ? () => <TestHeader /> : () => null;

  const olympicsKeys = {
    staging: {
      endpoint: "https://olympics-embed-staging.pamedia.io",
      authToken: "6i3DuEwbVhr2Fht6",
      gamesCode: "OG2020-TR2"
    },
    prod: {
      endpoint: "https://olympics-embed.pamedia.io",
      authToken: "6i3DuEwbVhr2Fht6",
      gamesCode: "OG2020-TR2"
    }
  };
  const endpoint = select("OlympicsKeys", olympicsKeys, olympicsKeys.staging);

  return (
    <MockBookmarksProvider otherMocks={mocks} delay={1000} articleId={data.id}>
      <ContextProviderWithDefaults value={{ theme: { scale, sectionColour } }}>
        <ArticleSkeleton
          adConfig={articleAdConfig}
          analyticsStream={storybookReporter}
          data={data}
          Header={showHeader}
          isPreview={isPreview}
          olympicsKeys={endpoint}
          inlineRelatedArticlesFlag={inlineRelatedArticlesFlag}
          onAuthorPress={preventDefaultedAction(decorateAction)(
            "onAuthorPress"
          )}
          onCommentGuidelinesPress={preventDefaultedAction(decorateAction)(
            "onCommentGuidelinesPress"
          )}
          onCommentsPress={preventDefaultedAction(decorateAction)(
            "onCommentsPress"
          )}
          onLinkPress={preventDefaultedAction(decorateAction)("onLinkPress")}
          onRelatedArticlePress={preventDefaultedAction(decorateAction)(
            "onRelatedArticlePress"
          )}
          onTopicPress={preventDefaultedAction(decorateAction)("onTopicPress")}
          onTwitterLinkPress={preventDefaultedAction(decorateAction)(
            "onTwitterLinkPress"
          )}
          onVideoPress={preventDefaultedAction(decorateAction)("onVideoPress")}
          onViewableItemsChanged={() => null}
        />
      </ContextProviderWithDefaults>
    </MockBookmarksProvider>
  );
};

export default renderArticleSkeleton;

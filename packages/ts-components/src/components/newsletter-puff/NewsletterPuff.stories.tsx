import { showcaseConverter } from '@times-components/storybook';

import React from 'react';
import { MockedProvider } from '@times-components/provider-test-tools';
import {
  getNewsletter,
  subscribeNewsletter
} from '@times-components/provider-queries';

import { AutoNewsletterPuff } from './AutoNewsletterPuff';
import { InlineNewsletterPuff } from './InlineNewsletterPuff';

import { TrackingContextProvider } from '../../helpers/tracking/TrackingContextProvider';
import { PreviewNewsletterPuff } from './PreviewNewsletterPuff';

import analyticsStream from '../../fixtures/analytics-actions/analytics-actions';

const mocks = [
  {
    request: {
      query: getNewsletter,
      variables: {
        code: 'TNL-101'
      }
    },
    result: {
      data: {
        newsletter: {
          id: 'a2l6E000000CdHzQAK',
          isSubscribed: false,
          title: 'Best of Times',
          __typename: 'Newsletter'
        }
      }
    }
  },
  {
    delay: 1000,
    request: {
      query: subscribeNewsletter,
      variables: {
        code: 'TNL-101'
      }
    },
    result: {
      data: {
        subscribeNewsletter: {
          id: 'a2l6E000000CdHzQAK',
          isSubscribed: true,
          __typename: 'Newsletter'
        }
      }
    }
  }
];

const showcase = {
  children: [
    {
      // eslint-disable-next-line react/prop-types
      component: ({ text }: any) => (
        <MockedProvider mocks={mocks}>
          Current Count = {window.sessionStorage.getItem('view-count')}
          <TrackingContextProvider
            analyticsStream={analyticsStream}
            context={{ component: 'ArticleSkeleton' }}
          >
            <AutoNewsletterPuff
              code={text('code', 'TNL-101')}
              headline={text('headline', 'Best of Times')}
              copy={text(
                'copy',
                'We’ll send you our top stories, across all sections, straight to your inbox. Simple as that.'
              )}
              imageUri={text(
                'imageUri',
                'https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F728c3e68-5311-4533-809a-b313a6503789.jpg?resize=800'
              )}
            />
          </TrackingContextProvider>
        </MockedProvider>
      ),

      name: 'Auto Newsletter Puff',
      platform: 'web',
      type: 'story'
    },
    {
      // eslint-disable-next-line react/prop-types
      component: ({ text }: any) => (
        <MockedProvider mocks={mocks}>
          <TrackingContextProvider
            analyticsStream={analyticsStream}
            context={{ component: 'ArticleSkeleton' }}
          >
            <InlineNewsletterPuff
              code={text('code', 'TNL-101')}
              headline={text('headline', 'Best of Times')}
              copy={text(
                'copy',
                'We’ll send you our top stories, across all sections, straight to your inbox. Simple as that.'
              )}
              imageUri={text(
                'imageUri',
                'https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F728c3e68-5311-4533-809a-b313a6503789.jpg?resize=800'
              )}
            />
          </TrackingContextProvider>
        </MockedProvider>
      ),

      name: 'Inline Newsletter Puff',
      platform: 'web',
      type: 'story'
    },
    {
      // eslint-disable-next-line react/prop-types
      component: ({ text }: any) => (
        <PreviewNewsletterPuff
          headline={text('headline', 'Best of Times')}
          copy={text(
            'copy',
            'We’ll send you our top stories, across all sections, straight to your inbox. Simple as that.'
          )}
          imageUri={text(
            'imageUri',
            'https://www.thetimes.co.uk/imageserver/image/methode%2Ftimes%2Fprod%2Fweb%2Fbin%2F728c3e68-5311-4533-809a-b313a6503789.jpg?resize=800'
          )}
        />
      ),

      name: 'Preview Newsletter Puff',
      platform: 'web',
      type: 'story'
    }
  ],
  name: 'Typescript Component/In Article/Newsletter Puffs'
};

showcaseConverter(module, showcase);

import React from 'react';
import '@testing-library/jest-dom';
import { render } from '../../../../utils/test-utils';
import { LeadArticle, LeadArticleProps } from '../index';
import { leadArticle } from '../../../../slices/fixtures/data.json';
import { useBreakpointKey } from 'newskit';

jest.mock('newskit', () => ({
  ...jest.requireActual('newskit'),
  useBreakpointKey: jest.fn().mockReturnValue('xs')
}));

const leadStoryData: LeadArticleProps = {
  ...leadArticle,
  tagL1: 'TAG'
};

const renderComponent = () =>
  render(<LeadArticle {...leadStoryData} imageTop={false} />);

describe('Render Component one', () => {
  it('should render a snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
  it('should render correct headline', () => {
    const { getByText } = renderComponent();
    const headlineText = getByText(leadArticle.headline);
    expect(headlineText).toBeInTheDocument();
  });

  it('should render correct summary', () => {
    const { getByText } = renderComponent();

    const summaryText = getByText(leadArticle.summary);
    expect(summaryText).toBeInTheDocument();
  });
  it('should render correct readingTime', () => {
    const { getByText } = renderComponent();

    const readingTimeText = getByText(leadArticle.tag.label);
    expect(readingTimeText).toBeInTheDocument();
  });
  it('should render correct caption', () => {
    const { getByText } = renderComponent();

    const captionText = getByText(leadArticle.caption);
    expect(captionText).toBeInTheDocument();
  });
  it('should render tagL1 if passed as props', () => {
    const { getByText } = renderComponent();

    const tagL1 = getByText('TAG');
    expect(tagL1).toBeInTheDocument();
  });

  it('should render tag if tag is provided', () => {
    (useBreakpointKey as any).mockReturnValue('xs');
    const { queryByText } = render(
      <LeadArticle {...leadStoryData} imageTop={true} />
    );
    const tag = queryByText(leadArticle.tag.label);
    expect(tag).toBeVisible();
  });

  it('should not render tag or flag if they are not provided', () => {
    (useBreakpointKey as any).mockReturnValue('lg');

    delete leadStoryData.tag;
    delete leadStoryData.flag;

    const { queryByText } = render(<LeadArticle {...leadStoryData} />);
    const tag = queryByText('Tag');
    const flag = queryByText('Flag');

    expect(tag).not.toBeInTheDocument();
    expect(flag).not.toBeInTheDocument();
  });
});
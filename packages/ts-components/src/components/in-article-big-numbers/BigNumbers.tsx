import React, { useRef, useState, useEffect } from 'react';
import { Placeholder } from '@times-components/image';
import { useFetch } from '../../helpers/fetch/FetchProvider';
import { sanitiseCopy } from '../../helpers/text-formatting/SanitiseCopy';
import {
  Container,
  ContentContainer,
  Headline,
  ListContainer,
  List,
  ListItem,
  NumberContainer,
  Copy,
  ShowAllContainer,
  ShowAllButton
} from './styles';
import { PlaceholderContainer, Label } from '../common-styles';
import { isStandard, isWide } from '../../helpers/layout-size/layoutSize';
import { DeckData } from '../../helpers/fetch/types';

type BigNumbersData = {
  type: string;
  data: {
    number: string;
    copy: string;
  };
};

type BigNumbersDeckData = DeckData<never, BigNumbersData>;

export const BigNumbers: React.FC<{
  sectionColour: string;
}> = ({ sectionColour }) => {
  const { loading, error, data } = useFetch<BigNumbersDeckData>();

  if (loading) {
    return (
      <PlaceholderContainer>
        <Placeholder />
      </PlaceholderContainer>
    );
  }

  if (error || data === undefined) {
    return null;
  }

  const { headline, label, size } = data.fields;
  const bigNumbersData = data.body.data;
  const [showAll, setShowAll] = useState(false);
  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const showAllRef = useRef<HTMLDivElement>(null);
  const [displayShowAll, setShowShowAll] = useState(false);
  const maxHeight = isWide(size) ? 250 : 350;
  useEffect(() => {
    const listContainer = showAllRef.current;
    if (listContainer) {
      setShowShowAll(listContainer.clientHeight > maxHeight);
    }
  }, []);

  return (
    <Container sectionColour={sectionColour} isWide={isWide(size)}>
      <ContentContainer>
        <Label sectionColour={sectionColour}>{label}</Label>
        {headline && <Headline>{headline}</Headline>}
        <ListContainer
          ref={showAllRef}
          showAll={showAll}
          maxHeight={maxHeight}
          displayShowAll={displayShowAll}
        >
          <List>
            {bigNumbersData.map((row: BigNumbersData, index: number) => (
              <ListItem key={index} isStandard={isStandard(size)}>
                <NumberContainer sectionColour={sectionColour}>
                  {row.data.number}
                </NumberContainer>
                <Copy
                  dangerouslySetInnerHTML={{
                    __html: sanitiseCopy(row.data.copy, ['br', 'b', 'i'])
                  }}
                />
              </ListItem>
            ))}
          </List>
        </ListContainer>
      </ContentContainer>
      <ShowAllContainer showAll={showAll} displayShowAll={displayShowAll}>
        <ShowAllButton onClick={handleShowAll}>
          {showAll ? 'Collapse' : 'Show all'}
        </ShowAllButton>
      </ShowAllContainer>
    </Container>
  );
};

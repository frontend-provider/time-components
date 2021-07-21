import React, { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { colours } from '@times-components/styleguide';
import { Container, Button } from './styles';
import { OlympicsKeys } from '../types';

export const OlympicsMedalTable: FC<{ keys: OlympicsKeys }> = ({
  keys: { endpoint, authToken, gamesCode }
}) => {
  const [showAll, setShowAll] = useState(false);
  const handleShowAll = () => {
    setShowAll(!showAll);
  };
  return (
    <Container sectionColour={colours.section.sport} showAll={showAll}>
      <Helmet>
        <script
          src={`${endpoint}/static/medal-table.js`}
          charSet="UTF-8"
          defer
        />
      </Helmet>
      <div
        className="pa-medaltable"
        data-auth-token={authToken}
        data-games-code={gamesCode}
        data-medal-icon-type="round"
      />
      <div className="buttonContainer">
        <Button onClick={handleShowAll}>
          {showAll ? 'Collapse' : 'Show All'}
        </Button>
      </div>
    </Container>
  );
};
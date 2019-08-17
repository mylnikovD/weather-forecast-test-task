import React from 'react';
import Day from './Day';
import styled from 'styled-components';

const Forecast = ({ data, celsium }) => {
  return (
    <Container>
      {
        Object.keys(data).map(key => (
          <Day
            key={`day ${key}`}
            day={key}
            data={data[key]}
            celsium={celsium}
          />
        ))
      }
    </Container>
  )
};

const Container = styled.div`
  margin-top: 5px;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  border-radius: 4px;
  padding: 15px;
`;

export default Forecast;
import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { ReactComponent as Clear } from './clear.svg';
import { ReactComponent as Clouds } from './clouds.svg';
import { ReactComponent as Rain } from './rain.svg';

const icons = {
  Clear: <Clear />,
  Clouds: <Clouds />,
  Rain: <Rain />,
}

const ForecastDay = ({ data, day, celsium }) => {
  return (
    <StyledDay>
      <b>{day}</b>
      {data.map(el => {
        const { main, weather } = el;
        const { main: mainWeather } = weather[0];
        return (
          <div key={el.dt}>
            {icons[mainWeather]}
            <p  className='left time'>
              {moment(el.dt_txt).format('HH:MM')}
            </p>
            <span className='left temperature'>
              T: {celsium ? main.temp_c : main.temp}
            </span>
            <span className='left humidity'>
              {' '}H:{main.humidity}
            </span>
            <span className='left pressure'>
              {' '} P:{main.pressure}
            </span>
          </div>
        );
      })}
    </StyledDay>
  );
};

const StyledDay = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  margin: 15px;
  text-align: center;
  & .left {
    text-align: left;
  }
  & div {
    border: 1px solid lightgray;
    border-radius: 4px;
    padding: 10px 5px;
    margin-top: 5px;

    & p {
      margin: 5px 0 0 0;
    }
    & svg {
      width: 30px;
      height: 30px;
    }
  }

`;

export default ForecastDay;
import React, { Component } from 'react';
import styled from 'styled-components';
import {
  TextField,
  InputAdornment,
  IconButton,
  Icon,
  Button
} from '@material-ui/core';
import {
  COORDINATES_REGEXP,
  ZIPCODE_REGEXP,
  CITY_REGEXP
} from '../../constants';
import { getWeatherForecast } from '../../api';
import Forecast from '../forecast/index';

class App extends Component {

  state = {
    searchField: '',
    error: false,
    data: null,
    celsium: false,
    lastSearches: []
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      let { coords: { longitude, latitude } } = position;
      const searchField = `${longitude}, ${latitude}`;
      this.setState({ searchField })
      this.onSubmit();
    });
  };

  determineSearchType = (searchString) => {
    if (COORDINATES_REGEXP.test(searchString)) {
      return 'coordinates';
    }
    if (ZIPCODE_REGEXP.test(searchString)) {
      return 'zip';
    }
    if (CITY_REGEXP.test(searchString)) {
      return 'city';
    }
    return false;
  };

  onSearchChange = (event) => {
    this.setState({ error: false });
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  onTempKeyChange = () => {
    const { celsium } = this.state;
    this.setState({ celsium: !celsium });
  }

  saveRecentSearches(lastRequest) {
    const { lastSearches } = this.state;
    if (lastSearches.length === 3) {
      lastSearches.shift();
    }
    lastSearches.push(lastRequest);
    this.setState({ lastSearches });
  }

  renderLastSearches = () => {
    const { lastSearches } = this.state;
    if (lastSearches.length > 0) {
      return (<LastSearches>
        <h3>Last Searches</h3>
        {
          lastSearches.map(el => {
            return (
              <div
                key={`${el.value}`}
              >
                {el.type}: {el.value}
              </div>
            )
          })
        }
      </LastSearches>
      )
    }
  }

  onSubmit = async () => {
    const { searchField: value } = this.state;
    const type = this.determineSearchType(value);
    if (!type) {
      this.setState({ error: true });
      return;
    }
    const requestData = {
      type,
      value
    }
    const data = await getWeatherForecast(requestData);

    if (!data) {
      this.setState({ error: true });
      return;
    }
    this.saveRecentSearches(requestData);
    this.setState({ data });
  }

  render() {
    const { searchField, error, data, celsium, lastSearches } = this.state;
    const buttonText = celsium ? 'Switch to Farhengeit' : 'Switch to Celsium';
    return (
      <StyledContainer>
        <h1>Weather forecast </h1>
        <TextField
          id="standard-name"
          variant="outlined"
          error={error}
          className='search-input'
          name='searchField'
          value={searchField}
          label="Search location"
          onChange={this.onSearchChange}
          margin="normal"
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={this.onSubmit}
              >
                <Icon>search</Icon>
              </IconButton>
            </InputAdornment>,
          }}
        />
        <Button
          variant='outlined'
          onClick={this.onTempKeyChange}
        >
          {buttonText}
        </Button>

        {
          data &&
          <Forecast
            data={data}
            celsium={celsium}
          />
        }
        {
          this.renderLastSearches()
        }
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .search-input: {

  }

  & i {
    width: 30px;
    height: 30px;
  }
  & h1 {
    align-self: center;
  }
`;

const LastSearches = styled.div`
`;

export default App;

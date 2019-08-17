import axios from 'axios';
import config from '../config';
import _ from 'lodash'
import moment from 'moment';

export const getWeatherForecast = async (searchData = {}) => {
  const { appid, apiUrl } = config;

  const { type, value } = searchData;
  
  const queryParams = {
    appid,
    units: 'imperial'
  }
  
  if (!type) {
    return 'Unvalid params';
  }

  if (type === 'coordinates') {
    const coordinatesArray = value.split(',');
    queryParams.lon = coordinatesArray[0].trim()
    queryParams.lat = coordinatesArray[1].trim()
  }

  else if (type === 'city') {
    queryParams.q = `${value}, us`
  }

  else if (type === 'zip') {
    queryParams.zip=value;
  }

  try {
    const {data: {list: data}} = await axios.get( apiUrl, {
      params: queryParams,
      responseType: 'json'
    });

    data.forEach(el => {
      el.main.temp_c = ((el.main.temp - 32) * (5 / 9)).toFixed(2);
    })

    return _.groupBy(data, el => moment(el.dt_txt).startOf('day').format('MM-DD-YYYY dd'));
  } catch (error) {
    console.error('getWeatherForecast error: ', error);
    return null;
  }
}
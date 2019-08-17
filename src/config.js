const envType = process.env.NODE_ENV;
const config = {};

switch (envType) {
  case 'production':
    config.url = '';
    config.domain = '';
    break;

  default:
    config.url = 'http://localhost:6800';
    config.domain = '';
    config.appid = '0233413eb4e13c87ed59ac64f8c3dcf7';
    config.apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
    break;
}

export default config;

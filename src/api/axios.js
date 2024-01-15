import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: 'b2dcad89849298a92cb4cffeb39543c3',
    language: 'ko-KR'
  }
})

export default instance;
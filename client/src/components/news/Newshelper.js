const options = {
  method: 'GET', 
  url: 'https://api.newscatcherapi.com/v2/search',
  params: {q: 'Programming JavaScript', lang: 'en', sort_by: 'relevancy', page: '1'},
  headers: {
    'x-api-key': process.env.REACT_APP_NEWS
  }
}

export default options;
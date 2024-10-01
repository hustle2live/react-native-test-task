import axios from 'axios';

import { API } from '../common/enums';
import { GetQuoteResponseDto } from '../common/types';

const getRandomQuote = async (): Promise<GetQuoteResponseDto> => {
   try {
      const [url, proxyUrl] = [API.QUOTE_URL, API.PROXY_URL.concat(API.QUOTE_URL.slice(7))];
      const response = await axios.get<GetQuoteResponseDto>(url, {
         params: { lang: 'en', format: 'json', method: 'getQuote' }
      });
      return response.data;
   } catch (error) {
      console.error('Error while fetching quote', error);

      return {
         quoteText: '',
         quoteAuthor: '',
         quoteLink: ''
      };
   }
};

export { getRandomQuote };

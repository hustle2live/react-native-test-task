import axios from 'axios';

import { API } from '../common/enums';
import { GetQuoteResponseDto } from '../common/types';

const getRandomQuote = async (): Promise<GetQuoteResponseDto> => {
   try {
      const response = await axios.get<GetQuoteResponseDto>(API.QUOTE_URL, {
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

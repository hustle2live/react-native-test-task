import axios from 'axios';

import { API } from '../common/enums';
import { GetQuoteResponseDto } from '../common/types';

const getRandomQuote = async (): Promise<GetQuoteResponseDto> => {
   try {
      const url = API.GH_SERVER_URL.concat(API.GET_QOUTE_PATH);

      const response = await axios.get<GetQuoteResponseDto>(url, {});

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

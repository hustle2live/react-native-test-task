import axios from 'axios';

import { API } from '../common/enums';
import { GetQuoteResponseDto } from '../common/types';
import { Platform } from 'react-native';

const createUrl = (platform = ''): string => {
   const defaultUrlPath = API.QUOTE_URL;
   const webUrlPath = API.PROXY_URL.concat(API.QUOTE_URL.slice(7));

   let ApiURL: string;

   switch (platform) {
      case 'ios':
      case 'android':
         ApiURL = defaultUrlPath;
         break;
      case 'windows':
      default:
         ApiURL = webUrlPath;
   }

   return ApiURL;
};

const getRandomQuote = async (): Promise<GetQuoteResponseDto> => {
   try {
      const requestUrl = createUrl(Platform.OS);
      const response = await axios.get<GetQuoteResponseDto>(requestUrl, {
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

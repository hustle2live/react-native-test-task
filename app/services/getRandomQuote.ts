import axios from 'axios';
import { API } from '../common/enums';
import { GetQuoteResponseDto } from '../common/types';
import { Platform } from 'react-native';

type TParams = {
   reqUrl: string;
   reqParams: { params: { lang: string; format: string; method: string } } | {};
};

const createUrl = (platform = ''): TParams => {
   const defaultUrlPath = API.QUOTE_URL;
   const webUrlPath = API.GH_SERVER_URL.concat(API.GET_QOUTE_PATH);

   let ApiURL: TParams['reqUrl'];
   let ApiParams: TParams['reqParams'];

   switch (platform) {
      case 'ios':
      case 'android':
         ApiURL = defaultUrlPath;
         ApiParams = { lang: 'en', format: 'json', method: 'getQuote' };
         break;
      case 'windows':
      default:
         ApiURL = webUrlPath;
         ApiParams = '';
   }

   return { reqUrl: ApiURL, reqParams: ApiParams };
};

const getRandomQuote = async (): Promise<GetQuoteResponseDto> => {
   try {
      const { reqUrl, reqParams } = createUrl(Platform.OS);

      const response = await axios.get<GetQuoteResponseDto>(reqUrl, reqParams);

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

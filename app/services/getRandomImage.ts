import axios from 'axios';

import { API } from '../common/enums';
import { getRandomNumber } from '../helpers';
import { GetImageResponseDto } from '../common/types';

const ImageIdRange = {
   min: 1,
   max: 1000
};

const getRandomImage = async (): Promise<GetImageResponseDto> => {
   try {
      const randomImageId = getRandomNumber(ImageIdRange);

      const response = await axios.get<GetImageResponseDto>(`${API.IMAGE_URL}/id/${randomImageId}/info`);

      return response.data;
   } catch (error) {
      console.error('Error while fetching random image', error);

      return {
         id: '0',
         download_url: ''
      };
   }
};

export { getRandomImage };

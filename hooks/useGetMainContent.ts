import { base_url } from '@/constants/api';

export const useGetMainContent = async () => {
  return await fetch(base_url+'/images', {
    method: 'GET',
  }).then((res) => {
    return res.json()
  }).catch(err => {
    console.log(err);
  });
}

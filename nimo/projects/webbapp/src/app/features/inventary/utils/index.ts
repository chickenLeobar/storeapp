import { INegocio } from './../models/index';
import { CloudinaryResponse } from 'shared';
/**
 *
 * @param source
 * @returns
 */
export const isCloudinaryResponse = (
  source: CloudinaryResponse | {}
): source is CloudinaryResponse => {
  return 'public_id' in source;
};

export const obtainPreviewUrlOrNotFound = (deal: INegocio) => {
  return isCloudinaryResponse(deal.image)
    ? deal.image.url
    : 'assets/images/empty_one.svg';
};

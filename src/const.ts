export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;
export const CLICK_EVENT_NAME = 'click';
export const PASSWORD_REGEXP = '^(?=.*[A-Za-z])(?=.*\\d).+$';
export const ISO_DATE_TIME_DIVIDER = 'T';
export const INITIAL_REVIEW_FORM_STATE = {
  rating: 0,
  comment: '',
};
export const BASE_URL = import.meta.env.MODE === 'production' ? '/six-cities/' : '/';
export const LOGO_IMAGE_URL = `${BASE_URL}img/logo.svg`;

export const PROD_APP_ID: string = '563306250347158';
export const DEV_APP_ID: string = '142025585924652';
export const APP_ID = process.env.NODE_ENV === 'development' ? DEV_APP_ID : PROD_APP_ID;
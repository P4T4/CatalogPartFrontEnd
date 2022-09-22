import { config } from "config";

export const environment = {
  production: true,
  url: 'http://192.168.5.109:1145',
  apiURL: config.apiUrl,
  mailAdmin: config.mailAdmin,
  nameAdmin: config.nameAdmin
};
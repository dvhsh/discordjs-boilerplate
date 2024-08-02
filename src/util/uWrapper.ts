/*
*
* @file        uWrapper.ts
* @author      David (@dvhsh)
* @description API wrapper utility functions
*
* @created     Thu Aug 1, 2024
* @updated     Thu Aug 1, 2024
*/

import axios from "axios";

const API_BASE = process.env.API_BASE;

/*
*  @function fetchUser
*  @description Fetches a user from the API by their Discord ID.
*
*  @param { string } id
*
*  @returns { Promise<any> } user
*/
export const fetchUser = async (id: string) => {
  const response = await axios.get(`${API_BASE}/user/${id}`, {
    headers: {
      Authorization: process.env.API_TOKEN
    }
  });
  return response.data.data.user;
}

/*
*  @function fetchGuild
*  @description Fetches a guild from the API by its Discord ID.
*
*  @param { string } id
*
*  @returns { Promise<any> } guild
*/
export const fetchGuild = async (id: string) => {
    const response = await axios.get(`${API_BASE}/guild/${id}`, {
        headers: {
        Authorization: process.env.API_TOKEN
        }
    });
    return response.data.data.guild;
}

/*
*  @function setGuildPrefix
*  @description Sets the prefix for a guild in the API.
*
*  @param { string } id
*  @param { string } prefix
*
*  @returns { Promise<void> }
*/
export const setGuildPrefix = async (id: string, prefix: string) => {
    const response = await axios.post(`${API_BASE}/guild/prefix/${id}`, {
        prefix
    }, {
        headers: {
            Authorization: process.env.API_TOKEN,
            'X-Prefix': prefix
        }
    });
}

/*
*  @function postBotStats
*  @description Posts the bot stats for the API.
*
* @param { number } guilds
* @param { number } users
* @param { number } commands
*
* @returns { Promise<void> }
*/
export const postBotStats = async (guilds: number, users: number, commands: number) => {
    const response = await axios.post(`${API_BASE}/stats`, {
        guilds, users, commands
    }, {
        headers: {
            Authorization: process.env.API_TOKEN
        }
    });
}


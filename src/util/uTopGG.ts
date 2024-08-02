/*
*
* @file        uTopGG.ts
* @author      David (@dvhsh)
* @description top.gg API utility functions
*
* @created     Thu Aug 1, 2024
* @updated     Thu Aug 1, 2024
*/
import axios from "axios";

const TOPGG_BASE = "https://top.gg/api";

/*
*  @function hasUserVoted
*  @description Checks if a user has voted for the bot on top.gg within the last 12 hours.
*
*  @param { string } userId
*
*  @returns { Promise<boolean> } voted
*/
export async function hasUserVoted(userId: string) {
    const response = await axios.get(`${TOPGG_BASE}/bots/${process.env.BOT_CLIENT}/check`, {
        params: {
            userId
        },
        headers: {
            Authorization: process.env.TOPGG_TOKEN
        }
    });

    return response.data.voted;
}

// path: src/util/uTopGG.ts

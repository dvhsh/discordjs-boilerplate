import { Client, ActivityType } from "discord.js";
import { AutoPoster }           from 'topgg-autoposter';

module.exports = {
    name: 'ready',
    once: true,
    execute(client: Client) {
        if (client.user === null) throw new Error('Client user is null');

        let envTitle = process.env.BETA === 'true' ? process.env.BETA_BOT_NAME : process.env.BOT_NAME + `${process.env.BOT_VERSION}`;

        console.log(`====================                               `);
        console.log(envTitle);
        console.log(`Client logged in at ${client.readyAt}              `);
        console.log(`Loaded ${client.commands.size} commands            `);
        console.log(`====================                               `);

        client.user.setPresence({
            activities: [{ name: `for ${client.prefix}help`, type: ActivityType.Watching }],
            status: 'online'
        });

        if (process.env.BETA === 'false') {
           /* TODO: check for top.gg token in env
           const ap = AutoPoster(process.env.TOPGG_TOKEN!, client);
            ap.on('posted', () => {
                console.log('[TOP-GG AUTOPOSTER] Server count posted!');
            });*/
        }
    }
}

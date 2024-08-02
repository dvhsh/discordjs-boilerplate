/*
*
* @file        index.ts
* @author      David (@dvhsh)
* @description Bot Index File
*
* @created     Thu Aug 1, 2024
* @updated     Thu Aug 1, 2024
*/
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

require('dotenv').config();

import path            from "path";
import fs              from "fs";

import * as Discord    from "discord.js";

import { getCommands } from "@command/command";

const BETA      = process.env.BETA === 'true';

const client    = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.DirectMessages
    ], partials: [
        Discord.Partials.Channel,
        Discord.Partials.Message
    ]
});

client.commands  = new Discord.Collection();
client.cooldowns = new Discord.Collection();

client.prefix    = BETA ? process.env.BETA_BOT_PREFIX!  : process.env.BOT_PREFIX!;
client.version   = BETA ? process.env.BETA_BOT_VERSION! : process.env.BOT_VERSION!;

const eventsPath = path.join(__dirname, 'event');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

/*
* @function main
* @description Main function to start the bot
*
* @returns {Promise<void>}
*/
async function main() {

    const commands = getCommands(true);
    commands.forEach((command) => { client.commands.set(command.name, command); });

    for (const file of eventFiles) {
        const event = require(`${eventsPath}/${file}`);

        if (event.once) {
            client.once(event.name, (...args: any[]) => event.execute(...args));
        } else {
            client.on(event.name, (...args: any[]) => event.execute(...args));
        }
    }

    // add logging
    await client.login((BETA ? process.env.BETA_BOT_TOKEN : process.env.BOT_TOKEN)!);
}

main().then(() => {}).catch((err) => { throw err; });

// path: src/index.ts

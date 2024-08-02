/*
*
* @file        deploy.ts
* @author      David (@dvhsh)
* @description Slash Command Deploy Script
*
* @created     Thu Aug 1, 2024
* @updated     Thu Aug 1, 2024
*/
require('dotenv').config();

import { REST, Routes } from "discord.js";
import { Category }     from "@command/command";

import path             from "path";
import * as fs          from "fs";

const commands : any[] = [];

const foldersPath      = path.join(__dirname, 'command/impl');
const commandFolders   = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`${foldersPath}/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`${foldersPath}/${folder}/${file}`);

        if (command.category !== Category.Admin) { commands.push(command.build.toJSON()); }
    }
}

( async () => {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const beta : boolean = process.env.BETA as string === 'true';
    const rest : REST    = new REST().setToken(beta ? process.env.BETA_BOT_TOKEN! : process.env.BOT_TOKEN!)

    if (beta) {

        console.log('Deploying to beta');

        await rest.put(Routes.applicationCommands(process.env.BETA_BOT_CLIENT!),
            { body: [] },
        ).catch(console.error);

        await rest.put(
            Routes.applicationGuildCommands(process.env.BETA_BOT_CLIENT!, process.env.GUILD_ID!),
            { body: commands },
        );

    } else {

        console.log('Deploying to production')

        await rest.put(Routes.applicationCommands(process.env.BOT_CLIENT!),
            { body: commands },
        ).catch(console.error);

        await rest.put(
            Routes.applicationGuildCommands(process.env.BOT_CLIENT!, process.env.GUILD_ID!),
            { body: [] },
        );
    }

    console.log(`Successfully reloaded application (/) commands.`);
})();

// path: src/deploy.ts

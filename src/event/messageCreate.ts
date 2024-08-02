import { Message }               from "discord.js";

import { fetchUser, fetchGuild } from "@util/uWrapper";

module.exports = {
    name: 'messageCreate',
    async execute(msg: Message) {
        if (msg.author.bot || msg.author.system) return;

        const user = await fetchUser(msg.author.id);
        let guild  = null;

        const { client } = msg;
        let prefix       = client.prefix;


        // TODO: check if guild is available
        if (msg.guild && process.env.BETA === 'false') {
            guild = await fetchGuild(msg.guild.id);

            if (guild.prefix !== null || guild.prefix !== 'undefined' || guild.prefix !== '') {
                prefix        = guild.prefix;
            }
        }

        const prefixMention = new RegExp(`^<@!?${client.user?.id}>( |)$`);
        if (msg.content.match(prefixMention)) {
            return msg.reply(`My prefix in this server is \`${prefix}\``);
        }

        if (!msg.content.startsWith(prefix)) return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift()!.toLowerCase();

        const cmd = client.commands.get(command) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));
        if (!cmd) return;

        await cmd.executeCommand(client, msg, args, user, guild);
    }
}

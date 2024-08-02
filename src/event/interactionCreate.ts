import { Interaction }           from "discord.js";
import { Command }               from "@command/command";

import { fetchUser, fetchGuild } from "@util/uWrapper";

module.exports = {
    name: 'interactionCreate',
    async execute(interaction: Interaction) {
        if (!interaction.isChatInputCommand()) return;

        const user  = await fetchUser(interaction.user.id);
        let guild   = null;

        // TODO: check if guild is available also only fetch guild if not in beta
        if (interaction.guild) { guild = await fetchGuild(interaction.guild.id); }

        let command: Command | undefined = interaction.client.commands.get(interaction.commandName.toLowerCase()) ||
                                            interaction.client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(interaction.commandName.toLowerCase()));
        if (command === undefined) return;

        await command.executeSlashCommand(interaction, user, guild);
    }
}

/*
*
* @file        invite.ts
* @author      David (@dvhsh)
* @description Utility | Invite Command
*
* @created     Thu Aug 1, 2024
* @updated     Thu Aug 1, 2024
*/
import { EmbedBuilder, Interaction, Client, Message } from "discord.js";
import { Category, Command }                          from "@command/command";

export class cInvite extends Command {

    constructor() {
        super("invite", `Get ${process.env.BOT_NAME} Invite Link.`, Category.Utility);
        this.usage = `${this.prefix}invite`
    }

    embed() {
        return new EmbedBuilder()
            .setColor('#36393F')
            .setURL(`https://discord.com/oauth2/authorize?client_id=${process.env.BOT_CLIENT}&scope=bot`)
            .setTitle(`Invite ${process.env.BOT_NAME} to your server!`)
            .setFooter({ text: `${process.env.BOT_NAME} ${this.version} | Prefix: ${this.prefix}`})
    }

    async executeSlashCommand(interaction: Interaction): Promise<void> {
        if (interaction.isRepliable())
            await interaction.reply({ embeds: [this.embed()]});
    }

    async executeCommand(client: Client, msg: Message, args: string[]): Promise<void> {
        await msg.reply({ embeds: [this.embed()]});
    }
}

module.exports = new cInvite;

// path : src/command/impl/utility/invite.ts

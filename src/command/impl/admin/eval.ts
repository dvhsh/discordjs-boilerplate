import { EmbedBuilder, Interaction, Client, Message } from "discord.js";
import { Category, Command, CommandOption }           from "@command/command";
import { inspect }                                    from "util";

export class cEval extends Command {
constructor() {

        super("eval", "Whitelisted | Evaluate JS.", Category.Admin);

        this.usage = `${this.prefix}eval <code>`;
        this.strings = [new CommandOption('code', 'Code to evaluate', true)];
   }

   evaluate(user: any, args: string, client?: Client, msg?: Message): EmbedBuilder {

       const embed = this.defaultEmbed.setTitle('Evaluation Results:');

       if (user.id !== process.env.OWNER_ID!) {

           embed.setDescription('You do not have permission to use this command.');
           return embed;
       }

       if (args.includes('token') || args.includes('process.env') || args.includes('eval')) {

           embed.setDescription('You do not have permission to use this command.');
           return embed;
       }

       try {

           let result = eval(args);
           let toEval = typeof result === 'string' ? result : inspect(result, {depth: 0 });
           if (toEval.length > 2000) toEval = toEval.slice(0, 2000);
           embed.setDescription(`\`\`\`js\n${toEval}\`\`\``);
       } catch (e) {

           embed.setDescription(`\`\`\`js\n${e}\`\`\``);
       }

       return embed;
   }

    async executeSlashCommand(interaction: Interaction): Promise<void> {

        if (interaction.isRepliable() && interaction.isChatInputCommand()) {

            const code = interaction.options.getString('code');

            if (!code) return;

            await interaction.reply({ embeds: [this.evaluate(interaction.user, code, interaction.client)] });
        }
    }

    async executeCommand(client: Client, msg: Message, args: string[]): Promise<void> {

        if (!args.length) { msg.reply('You must provide code to evaluate.'); }
        else { await msg.reply({ embeds: [this.evaluate(msg.author, args.join(' '), client, msg)] }); }
    }
}

module.exports = new cEval;

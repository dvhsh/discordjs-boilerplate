# discordjs-boilerplate

Written using TypeScript & Discord.js, this boilerplate is intended for creating Discord bots. It relies on having an [external backend](https://github.com/dvhsh/discordjs-backend) and MongoDB instance for data management.

This fully featured boilerplate includes:
- Message & Interaction (/) Commands
- Dynamic Command & Event Handler
- Production & Beta Environments
- Server based prefixes
- TopGG AutoPoster

Included Commands:
- `prefix`
- `invite`
- `help`
- `eval`

Included Events:
- `interactionCreate`
- `messageCreate`
- `ready`

# Development

## Getting Started

```
git clone https://github.com/dvhsh/discordjs-boilerplate.git
npm install
npm run start
```

## Environment Variables
```
# Development Environment Variables
# ========================
BETA=false

API_BASE=http://localhost:3004/bot
API_TOKEN=token

FRONTEND_BASE=http://localhost:3000

# Bot - Owner Configuration
# ========================
OWNER_ID=
GUILD_ID=

# Bot - Discord Configuration
# ========================
BOT_NAME=Bot
BOT_PREFIX=;;
BOT_VERSION=1.0.0
BOT_CLIENT=
BOT_TOKEN=

# BETA - Discord Configuration
# ========================
BETA_BOT_NAME=Beta Bot
BETA_BOT_PREFIX=..
BETA_BOT_VERSION=1.0.0
BETA_BOT_CLIENT=
BETA_BOT_TOKEN=

# API Keys
# ========================
TOPGG_TOKEN=
```

## Deploying Interaction (/) Commands

It is best practice to deploy interaction (/) commands sparingly.

```
npm install
npm run deploy
```

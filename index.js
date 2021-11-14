const { Client, Intents } = require('discord.js')

const { SlashCommandBuilder } = require('@discordjs/builders')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const request = require('request')

const clientId = process.env.DISCORD_CLIENT_ID
const guildId = process.env.DISCORD_GUILD_ID
const accessToken = process.env.DISCORD_ACCESS_TOKEN

const stamps = JSON.parse(process.env.STAMPON_STAMPS)
const api_uri = process.env.STAMPON_API_URI
const api_token = process.env.STAMPON_API_TOKEN

const commands = [
  new SlashCommandBuilder()
    .setName('stampon')
    .setDescription('Replies with stampon!')
].map((command) => command.toJSON())

const rest = new REST({ version: '9' }).setToken(accessToken)

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error)

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
})

client.once('ready', () => {
  console.log('Ready!')
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return

  const { commandName } = interaction

  if (commandName === 'stampon') {
    await interaction.reply('stampon!')
  }
})

client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot || !stamps.includes(reaction._emoji.name)) return

  if (reaction.partial) await reaction.fetch().catch(console.error)

  const member_user = await reaction.message.guild.members.fetch(user)
  const member_author = await reaction.message.guild.members.fetch(
    reaction.message.author
  )

  const options = {
    uri: api_uri,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${api_token}`
    },
    json: {
      discord: {
        channel_id: reaction.message.channelId,
        content_id: reaction.message.id,
        user_id: member_user.user.id,
        user_name: member_user.user.username,
        user_discriminator: member_user.user.discriminator,
        user_display_name: member_user.displayName,
        user_avatar: member_user.user.avatar,
        author_id: member_author.user.id,
        author_name: member_author.user.username,
        author_discriminator: member_author.user.discriminator,
        author_display_name: member_author.displayName,
        author_avatar: member_author.user.avatar,
        content: reaction.message.content,
        wrote_at: reaction.message.createdTimestamp
      }
    }
  }

  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
      console.log('StatusCode: ' + response.statusCode)
    } else {
      if (error) console.log(error.toString())
      if (body) console.log(body)
      if (response) console.log('StatusCode: ' + response.statusCode)
    }
  })
})

client.login(accessToken)

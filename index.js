require('dotenv').config()
const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
client.commands = new Discord.Collection()
client.queue = new Map()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

client.once('ready', () => {
    console.log('Ready!')
    client.user.setActivity('!', {type: "LISTENING"})
})

client.on('message', message => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    const args = message.content.slice(process.env.PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if(!command) return message.reply('There doesn\'t appear to be a command by that name... !help for a list of my commands.')

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${process.env.PREFIX}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
})

client.login(`${process.env.TOKEN}`).catch(err => console.log(err))
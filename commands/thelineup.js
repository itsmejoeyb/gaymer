const Discord = require('discord.js')
const { play } = require('../system/playlist')

module.exports = {
    name: 'lineup',
    description: 'Get the lineup!!',
    aliases: ['starters', 'players', 'ballers'],
    async execute(message, args) {
        const d = new Date();
        const weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";


        const today = weekday[d.getDay()];
        const position = ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"]
        let i = 0

        const { channel } = message.member.voice
        if (!channel) return message.channel.send("You need to be in a voice channel for that...")
        const queue = message.client.queue.get(message.guild.id)
        const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            playing: true,
        }
        let song = {
            url: 'https://www.youtube.com/watch?v=J9FImc2LOr8',
            embed: false,
        }

        if (queue) {
            queue.songs.splice(1, 0, song)
            queue.connection.dispatcher.end()
        } else {
            queueConstruct.songs.push(song)
            message.client.queue.set(message.guild.id, queueConstruct)
            try {
                queueConstruct.connection = await channel.join()
                play(queueConstruct.songs[0], message)
            } catch (error) {
                console.error(`Could not join voice channel: ${error}`)
                message.client.queue.delete(message.guild.id)
                await channel.leave()
                return message.channel.send({ embed: { "title": '😭 | Could not join the channel...', "description": `${error}`, "color": "#ff2050" } }).catch(console.error)
            }
        }
        const users = message.member.voice.channel.members
        const userEmbed = new Discord.MessageEmbed()
            .setColor('#9400D3')
            .setTitle(`LADIES AND GENTLEMEN,\nYOUR STARTING LINEUP THIS ${today.toUpperCase()} EVENING!!`)
            .setAuthor(`Playing in: ${message.member.voice.channel.name}`)
        users.forEach(user => {
            userEmbed.addField(`${user.user.username}`, user.user.username == 'Gaymer' ? 'Water Boy' : `${position[i]}`, true)
            i==5?i=0:i++
        })
        userEmbed.setTimestamp()
        userEmbed.setFooter('Sponsored by Gatorade')

        message.channel.send(userEmbed)
    },
}
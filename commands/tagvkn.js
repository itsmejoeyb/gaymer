const { play } = require('../system/playlist')

module.exports = {
    name: 'tagvkn',
    description: 'Things are getting very kinky now!',
    async execute(message, args) {
        const { channel } = message.member.voice
        if (!channel) return message.channel.send("You need to be in a voice channel for that...")
        const queue = message.client.queue.get(message.guild.id)
        const queueConstruct = {
            textChannel: message.channel,
            channel,
            connection: null,
            songs: [],
            playing: true
        }
        let song = {
            title: 'Bubbles - Bidibodi Bidibu',
            url: 'https://www.youtube.com/watch?v=O9Y1sEmyymw',
            description: 'Things are getting very kinky now! :flag_de: :police_officer:',
            thumbnailUrl: 'https://i.ytimg.com/vi/O9Y1sEmyymw/mqdefault.jpg',
            user: message.author,
            command: true,
            commandTitle: '!tagvkn',
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
    },
}
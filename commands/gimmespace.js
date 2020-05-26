const { play } = require('../system/playlist')

module.exports = {
    name: 'gimmespace',
    description: 'The jam remixed.',
    aliases: ['jamremix', 'jr'],
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
            title: 'Quad City DJ\'s - Space Jam (Mutrix Tune Squad Remix)',
            url: 'https://www.youtube.com/watch?v=gbhMCF4yr70',
            description: 'Remix the jam!? Why not! :rocket: :basketball:',
            thumbnailUrl: 'https://i.ytimg.com/vi/gbhMCF4yr70/mqdefault.jpg',
            user: message.author,
            command: true,
            commandTitle: '!gimmespace',
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
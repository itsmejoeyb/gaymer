const { play } = require('../system/playlist')

module.exports = {
    name: 'daddy',
    description: 'Where is my dad?',
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
            title: 'George Michael - Father Figure',
            url: 'https://www.youtube.com/watch?v=m_9hfHvQSNo',
            description: 'Why doesn\'t my dad love me? :family_mmb:',
            thumbnailUrl: 'https://i.ytimg.com/vi/m_9hfHvQSNo/mqdefault.jpg',
            user: message.author,
            command: true,
            commandTitle: '!daddy',
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
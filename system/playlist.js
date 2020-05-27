const ytdl = require('ytdl-core')
const Discord = require('discord.js')

module.exports = {
    async play(song, message) {
        const queue = message.client.queue.get(message.guild.id)

        if (!song) {
            message.client.queue.delete(message.guild.id)
            return queue.textChannel.send("There's no more songs to play... 😌").catch(console.error)
        }

        try {
            var stream = await ytdl(song.url, { filter: 'audioonly' })

        } catch (error) {
            if (queue) {
                queue.songs.shift()
                module.exports.play(queue.songs[0], message)
            }
        }

        const dispatcher = queue.connection
            .play(stream).on("finish", () => {
                queue.songs.shift()
                module.exports.play(queue.songs[0], message)
            }).on("error", console.error)

            if(song.embed != false) {
                const youtubeEmbed = new Discord.MessageEmbed()
                    .setColor('#9400D3')
                    .setTitle(`${song.title}`)
                    .setURL(`${song.url}`)
                    .setAuthor(song.command?`${song.commandTitle}`:'Now Playing')
                    .setDescription(`${song.description}`)
                    .setThumbnail(`${song.thumbnailUrl}`)
                    .addField('Played by:', `${song.user}`)
                    .setTimestamp()
                    .setFooter('Made with 💜 by Joey!')
                queue.textChannel.send(youtubeEmbed)
            }
    }
}
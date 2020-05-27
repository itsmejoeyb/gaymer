const axios = require('axios')
const { play } = require('../system/playlist')
const Discord = require('discord.js')

module.exports = {
    name: 'play',
    usage: '<search query>, or empty to play a paused song.',
    aliases: ['p'],
    description: "Search for a song for Gaymer to play. Or resumes music if paused.",
    async execute(message, args) {
        const { channel } = message.member.voice
        const queue = message.client.queue.get(message.guild.id)
        
        if (!channel) return message.channel.send('You\'re not in a channel little hot boy!')
        
        if(args != ''){
            const decode = str => {
                return str.replace(/&#(\d+);/g, (match, dec) => {
                    return String.fromCharCode(dec);
                })
            }
            const queueConstruct = {
                textChannel: message.channel,
                channel,
                connection: null,
                songs: [],
                playing: true
            }
            let songData, song

            axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    part: 'snippet',
                    maxResults: 1,
                    type: 'video',
                    q: args.toString().replace(/,/g, ' '),
                    key: process.env.YT_KEY,
                }
            })
            .then(res => res.data)
            .then(async data => {
                songData = data.items[0]
                song = {
                    title: decode(songData.snippet.title),
                    url: `https://www.youtube.com/watch?v=${songData.id.videoId}`,
                    description: songData.snippet.description,
                    thumbnailUrl: songData.snippet.thumbnails.medium.url,
                    user: message.author
                }

                if (queue) {
                    queue.songs.push(song)
                    const queueEmbed = new Discord.MessageEmbed()
                        .setColor('#9400D3')
                        .setTitle(`${song.title}`)
                        .setURL(`${song.url}`)
                        .setAuthor('Queued')
                        .setDescription(`Queued by: ${message.author}`)
                        .setTimestamp()
                        .setFooter('Made with 💜 by Joey!')
                    return queue.textChannel.send(queueEmbed)
                        .catch(console.error)
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
                        return message.channel.send({ embed: { "title": '😭 | Could not join the channel...', "description": `${error}`, "color": "#ff2050" } })
                            .catch(console.error)
                    }
                }
            })
            .catch(err => {
                console.log(err)
                message.reply('something went wrong... tell Joey to look into it.')
            })
        } else {
            if (!queue) return message.channel.send("There's no music... Why don't you get in the pond if you wanna act like a silly goose.")
            if (queue.playing) return message.channel.send("The music is already playing... Why don't you get in the pond if you wanna act like a silly goose.")

            if (queue && !queue.playing) {
                queue.playing = true;
                queue.connection.dispatcher.resume()

                return message.react("▶")
            }
        }
    },
}
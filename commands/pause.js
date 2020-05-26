module.exports = {
    name: 'pause',
    description: 'Pauses the current song.',
    aliases: ['hold', 'chill'],
    async execute(message, args) {
        const { channel } = message.member.voice
        if (!message.guild.me.voice.channel) return message.channel.send('I\'m not in a channel little hot boy!')
        if (!channel) return message.channel.send('You\'re not in a channel little hot boy!')
        const queue = message.client.queue.get(message.guild.id);

        if (!queue) return message.channel.send("There's no music... Why don't you get in the pond if you wanna act like a silly goose.")

        if (queue && queue.playing) {
            queue.playing = false;
            queue.connection.dispatcher.pause(true)


            return message.react("⏸")
        }  
    },
}
module.exports = {
    name: 'resume',
    description: 'Resumes the current song.',
    aliases: ['start', 'cont', 'r'],
    async execute(message, args) {
        const { channel } = message.member.voice
        if (!message.guild.me.voice.channel) return message.channel.send('I\'m not in a channel little hot boy!')
        if (!channel) return message.channel.send('You\'re not in a channel little hot boy!')
        const queue = message.client.queue.get(message.guild.id);

        if (!queue) return message.channel.send("There's no music... Why don't you get in the pond if you wanna act like a silly goose.")
        if (queue.playing) return message.channel.send("The music is already playing... Why don't you get in the pond if you wanna act like a silly goose.")

        if (queue && !queue.playing) {
            queue.playing = true;
            queue.connection.dispatcher.resume()

            return message.react("▶")
        }
    },
}
module.exports = {
    name: "skip",
    description: "Skips the current song.",
    aliases: ['next'],
    execute(message, args) {
        const { channel } = message.member.voice
        if (!message.guild.me.voice.channel) return message.channel.send('I\'m not in a channel little hot boy!')
        if (!channel) return message.channel.send('You\'re not in a channel little hot boy!')

        const queue = message.client.queue.get(message.guild.id)

        if (!queue) return message.channel.send("There's no music... Why don't you get in the pond if you wanna act like a silly goose.")

        queue.connection.dispatcher.end()
        message.react("⏭")
    }
}
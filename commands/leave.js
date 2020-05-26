module.exports = {
    name: 'leave',
    aliases: ['bye', 'l'],
    description: 'Make gaymer leave the channel if you want.',
    async execute(message, args) {
        const { channel } = message.member.voice
        const queue = message.client.queue.get(message.guild.id)
        if (!message.guild.me.voice.channel) return message.channel.send('I\'m not in a channel little hot boy!')
        if (!channel) return message.channel.send('You\'re not in a channel little hot boy!')
        if (queue) return message.channel.send('I\'m busy playing music. Ask me again when the queue is finished.')

        message.guild.me.voice.channel.leave()
    }
}
module.exports = {
    name: 'stop',
    description: 'Stops all music from Gaymer.',
    aliases: ['s', 'quit'],
    warning: 'This will clear the entire song queue. Use it carefully!',
    async execute(message, args) {
        const {channel} = message.member.voice
        if (!message.guild.me.voice.channel) return message.channel.send('I\'m not in a channel little hot boy!')
        if (!channel) return message.channel.send('You\'re not in a channel little hot boy!')
        const queue = message.client.queue.get(message.guild.id);

        if (!queue) return message.channel.send("There's no music... Why don't you get in the pond if you wanna act like a silly goose.")

        queue.songs = [];
        queue.connection.dispatcher.end();

        message.react('🛑')
    },
}
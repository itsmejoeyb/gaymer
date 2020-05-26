module.exports = {
    name: 'delete',
    args: true,
    usage: '<number 2-100>',
    aliases: ['d', 'del'],
    description: 'Trim the fat in the feed.',
    execute(message, args) {
        if(message.member.hasPermission('MANAGE_MESSAGES')) {
            const amount = parseInt(args[0]) + 1;
    
            if (isNaN(amount)) {
                return message.reply('that doesn\'t seem to be a valid number.');
            } else if (amount <= 1 || amount > 100) {
                return message.reply('you need to input a number between 2 and 100.');
            }
    
            message.channel.bulkDelete(amount, true)
        } else {
            message.reply(', you don\'t have permission to do that... Silly goose!')
        }
    },
}
module.exports = {
    name: 'isgaymer',
    args: true,
    usage: '<user>',
    description: "We're all a little gay... Find out who is the most with this!",
    execute(message, args) {
        const randomInt = max => {
            let int = Math.floor(Math.random() * Math.floor(max))

            return int
        }
        const isGay = member => {
            let number = Math.floor(Math.random() * Math.floor(10) + 2),
                amountOptions = ['a little', 'pretty', 'the gayest'],
                types = ["bbcs", "dongs", "rods", "wangs", "rigs", "cocks", "dicks"],
                amount

            if (number < 4) {
                amount = amountOptions[0]
            } else if (number > 8) {
                amount = amountOptions[2]
            } else {
                amount = amountOptions[1]
            }

            return `${member} is ${amount} gay! They sucked ${number} ${types[randomInt(7)]} today!`
        }
        if(args[0]) {
            let member = message.mentions.members.first()
            return message.channel.send(isGay(member))
        }

    },
}
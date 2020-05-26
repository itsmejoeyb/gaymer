const request = require('request')

module.exports = {
    name: 'pussy',
    description: 'Learn a little bit about pussy.',
    execute(message, args) {
        request('https://catfact.ninja/fact', { json: true }, (err, res, body) => {
            if (err) return console.log(err)
            message.channel.send(`Here is a fact about the only pussy I care about! ${body.fact}`)
        })
    },
}
const ytdl = require('ytdl-core')

module.exports = {
    name: 'ismylysolshotready',
    description: 'Get professional help with your Covid diagnosis.',
    aliases: ['lysol', 'covid'],
    async execute(message, args) {
        const connection = await message.member.voice.channel.join()
        const stream = ytdl('https://www.youtube.com/watch?v=zicGxU5MfwE?t=35', { filter: 'audioonly' })
        const dispatcher = connection.play(stream)

        let lysol = "\n'Due to recent speculation and social media activity, RB (the makers of Lysol and Dettol) has been asked whether internal administration of disinfectants may be appropriate for investigation or use as a treatment for coronavirus (SARS-CoV-2).\n\nAs a global leader in health and hygeine products, we must be clear that UNDER NO CIRCUMSTANCE should our disinfectant products be administered into the human body (through injection, ingestion or any other route). As with all products, our disinfectant and hygiene products should only be used as intended and in line with usage guidelines. Please read the label and safety information.\n\nWe have a responsibility in providing consumers with access to accurate, up-to-date information as advised by leading public health experts. For this and other myth-busting facts, please visit Covid-19facts.com.'\n"

        dispatcher.on('start', () => {
            message.channel.send(`Lysol has released this message in response:\n ${lysol}\n America had this to say:\n:man_facepalming: :person_facepalming: :woman_facepalming:`)
        })
    },
}
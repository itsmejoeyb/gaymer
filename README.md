# Gaymer
A Discord music bot built on Discord.js

## Table of Contents
* [General info](#general-info)
* [Commands](#commands)
* [Technologies](#technologies)
* [Requirements](#requirements)
* [Setup](#setup)
* [TO-DO](#to-do)

## General Info
I wanted to make a discord bot to play music using the youtube api so here we are. I used Discord.js for the project, and launched it on a free Heroku dyno. The bot has a queue system in place and allows skipping, pausing, resuming, etc. Urls are not needed, but can be used, using the play command with a search query ([YOUR_PREFIX]play despacito) will search youtube for despacito and play the best match automatically. Any play command with a query after that will add it to the queue. 

## Commands
* help - No args: sends a dm of all commands. With args: looks for command and gives specific details.
* play - No args: can be used in place of resume. With args: searches youtube for video matching and plays it.
* pause - pauses current song.
* resume - resumes music after pause, play with no args can be used as well.
* skip - skips current song and plays next in queue if there is one.
* stop - stops all music and **clears the queue entirely** so only use it if you're done with all music.
* leave - make the bot leave the voice channel when all music has stopped. I only added this because I was tired of hearing the leaving sound when the queue was finished so I disabled the bot leaving when it was done. I'm not sure if staying in the channel causes more usage on heroku so I just make him leave when I'm actually done listening, not when I forgot to queue another song.

## Technologies
Project is created with:
* Discord.js: 12.2.0
* Axios: 0.19.2
* ytdl-core: 2.1.4
* dotenv: 8.2.0

Those are the only four necessary for the bot to function. There are others in package.json but they were used for other commands that I have removed for GitHub. I'll get around to modifying dependencies some day...

## Requirements
* YouTube API V3 Key
* Discord server that you own and a discord developer account to get a token
* Proper dotenv file as shown below.

## Setup
To run this project, clone it and pick your favorite dyno to host it at (I use a free Heroku dyno, procfile for heroku included here). Then create a dotenv file in your root directory that includes:
```
PREFIX=[YOUR_PREFIX]
TOKEN=[YOUR_DISCORD_BOT_TOKEN]
YT_KEY=[YOUR_YOUTUBE_API_KEY]
```
Prefix can be whatever you choose (I use ! so an example command would be !play). Token you'll get from your discord dev account when you make a bot project. And the YouTube api key you'll get when you make a YouTube dev account. **MAKE SURE YOU KEEP THE TOKEN AND API KEY SAFE** Don't share them with anyone and keep them in your dotenv file. All items should be added without square brackets, btw.

## TO-DO
- [ ] Add support for YouTube playlists. (I'm not actually sure if this works by default haven't tried it. If it doesn't I'll add it soon.)
- [ ] Get rid of un-needed package's for github, or create example command using those packages.
- [ ] Anything else I think of as I continue to work on this project and make it better.

const dotenv = require('dotenv');
const fs = require('node:fs');
const {Client, Intents, MessageEmbed, Message} = require('discord.js');
const {token} = require('./config.json');
const {gmaptoken} = require('./config.json')
const url = require('url')
const client = new Client({ 
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES		
	]
});
const { setDefaultResultOrder } = require('node:dns');

// client.commands = new Collection();
// const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

dotenv.config();


client.on('ready', () => {
	console.log('MapIt has been successfully initialized.  What are your orders, Captain?');
});

client.on("messageCreate", (message) => {
	if (message.content === '!ping') {
		message.channel.send('pong');
	}
});

client.on("messageCreate", (message) => {
	if (message.content === '!find') {
		let findmsg = message.content[5];
		embFind = new MessageEmbed()
			.setTitle(`hello`);
		message.reply(embFind)
	}
});

client.on("messageCreate", (message) => {
	if (message.content.includes('!map')) {	
		let sliceMsg = message.content.slice(4);
		let trimMsg = sliceMsg.trim();
		let toMap = encodeURI(trimMsg);
		//URImsg = encodeURIComponent() //must separate out !map from rest of message
		let mapEmbed = {
			url: `https://maps.googleapis.com/maps/api/staticmap?center=${toMap}&zoom=8&size=640x640&key=${gmaptoken}`,
			image: {
				url: `https://maps.googleapis.com/maps/api/staticmap?center=${toMap}&zoom=8&size=640x640&key=${gmaptoken}`
			}
		};
		message.channel.send({ embeds: [mapEmbed] });
	} 
});


client.login(token);

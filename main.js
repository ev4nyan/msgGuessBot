const { Client, Intents } = require('discord.js');


const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});


const prefix = '😂 ';



client.once('ready', () => {
    console.log('JOKER ONLINE');
    activated = false;
    fetchAllMessages("824464018714263582");
});

async function fetchAllMessages(newChan) {
    let channel = client.channels.cache.get(newChan);
    messages = [];   
    // Create message pointer
    let message = await channel.messages
      .fetch({ limit: 1 })
      .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));
  
    while (message) {
      await channel.messages
        .fetch({ limit: 100, before: message.id })
        .then(messagePage => {
          messagePage.forEach(msg => {
            if (msg.content !== '') {
            messages.push(msg);}
          }
          )
  
          // Update our message pointer to be last message in page of messages
          message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
        })
    }
  
    console.log(messages);  // Print all messages
    activated = true;
    newmsg = messages[Math.floor(Math.random() * 100)];
    counts = {};

  }

client.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'setchannel') {
        activated = false;
        fetchAllMessages(message.channel.id);
        message.channel.send('setting channel to ' + message.channel.name);
        message.channel.send('this may take a while..')
        
    }
    if (command === 'start') {
        if (activated !== true) {
            return message.channel.send("please wait for the bot to start. it takes around 10-15 seconds per 1000 messages in the channel.");
        }
    
        newmsg = messages[Math.floor(Math.random() * messages.length)];
        message.channel.send("who typed the message: " + (newmsg.content).replace(/(\r\n|\n|\r)/gm, ""));
        console.log(newmsg.author.username);
        
        
    }

    if (message.content.toLowerCase().includes(newmsg.author.username.toLowerCase())) {
        message.channel.send("you got it!");
        message.channel.send("it was "+ newmsg.author.username);
    }

    if (command === 'reveal') {
        message.channel.send(newmsg.author.username + " sent the message.");
    }

    

})



client.login('OTYyNTM0MjYzNTQ5NDkzMzA4.YlI74w.Pi_kklorijlmhckm8xaUnoRJkvk');


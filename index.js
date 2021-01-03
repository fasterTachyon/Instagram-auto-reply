const ig = require('./instagram');
const {username,password} = require('./config')

const bot = (async () => {
    await ig.initialize();

    await ig.login(username, password);

    await ig.dm()

    await ig.reply();
});

bot();
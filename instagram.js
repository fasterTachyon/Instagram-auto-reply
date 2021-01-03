const puppeteer = require('puppeteer');

const BASE_URL = 'https://instagram.com/';

const instagram = {
    browser: null,
    page: null,

    initialize: async () => {

        instagram.browser = await puppeteer.launch({ headless: false });

        instagram.page = await instagram.browser.newPage();

    },

    login: async (username, password) => {

        await instagram.page.goto(BASE_URL)
            .then(console.log('Started'));

        const usernameSelector = 'input[name="username"]';
        await instagram.page.waitForSelector(usernameSelector, { visible: true, timeout: 3000 })

        const passwordSelector = 'input[name="password"]';
        await instagram.page.waitForSelector(passwordSelector, { visible: true, timeout: 3000 })

        await instagram.page.type(usernameSelector, username, { delay: 50 })
            .then(console.log('Username done'));

        await instagram.page.type(passwordSelector, password, { delay: 50 })
            .then(console.log('password done'));

        const loginButton = 'button[type="submit"]';
        await instagram.page.waitForSelector(loginButton);

        await instagram.page.click(loginButton)
            .then(console.log('Login Button Clicked'));

    },

    dm: async () => {

        const directButton = 'a[href="/direct/inbox/"]';

        await instagram.page.waitForTimeout(5000);
        await instagram.page.waitForSelector(directButton);

        await instagram.page.click(directButton)
            .then(console.log('DM Clicked'));

        await instagram.page.waitForTimeout(5000);

        const notNowButton = await instagram.page.$x('//button[contains(text(),"Not Now")]');

        await notNowButton[0].click()
            .then(console.log('Not now button Clicked'));
    },

    reply: async () => {

        const unreadMessageButton = 'div[style="height: 8px; width: 8px;"]';
        await instagram.page.waitForSelector(unreadMessageButton, { timeout: 0 });

        await instagram.page.click(unreadMessageButton)
            .then(async () => {
                const replyText = 'textarea[placeholder="Message..."]'
                await instagram.page.waitForSelector(replyText)
                await instagram.page.type(replyText, "Hello friend. I have deleted Instagram from my phone and won't be able to read your messages.\nMessage me on Whatsapp if necessary\n(This message was sent by a bot. Please do not reply)", { delay: 50 })

                const sendMessage = await instagram.page.$x('//button[contains(text(),"Send")]');

                await sendMessage[0].click()
                    .then(async () => {
                        console.log('Relpied')
                        instagram.reply();
                    })
            });
    }
}

module.exports = instagram;

//div style="height: 8px; width: 8px;"
//textarea placeholder="Message..."
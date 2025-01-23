module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`I am ${client.user.tag}. I am ready to conquer the world 👍!`);
    }
}
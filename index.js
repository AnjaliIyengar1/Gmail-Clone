const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,

    onConnect(session, callback) {
        console.log('onConnect', session.id);
        callback(); // Accept the connection
    },
    mailFrom(address, session, callback) {
        console.log('mailFrom', address.address, session.id);
        callback(); // Accept the sender
    },
    onrcptTo(address, session, callback) {
        console.log('onrcptTo', address.address, session.id);
        callback(); // Accept the recipient
    },
    onData(stream, session, callback) {
        stream.on('data', (data) => console.log('ondata', data.toString()));
        stream.on('end', callback); // Accept the message
    }
});

server.listen(25, () => console.log("SMTP server is listening on port 25"));
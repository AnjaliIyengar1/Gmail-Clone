const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,

    onConnect(session, callback) {
        console.log('onConnect', session.id);
        callback(); // Accept the connection
    },
    onMailFrom(address, session, callback) {
        console.log('onMailFrom', address.address, session.id);
        callback(); // Accept the sender
    },
    onRcptTo(address, session, callback) {
        console.log('onRcptTo', address.address, session.id);
        callback(); // Accept the recipient
    },
    onData(stream, session, callback) {
        stream.on('data', (data) => console.log('onData', data.toString()));
        stream.on('end', callback); // Accept the message
    }
});

server.listen(25, () => console.log("SMTP server is listening on port 25"));
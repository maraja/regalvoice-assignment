import amqp from 'amqplib';
import winston from 'winston';
import accessEnv from "#root/helpers/accessEnv";

let connection =  null
let channel = null

import { call, voicemail, sms } from '#root/server/contact';

const MESSAGE_QUEUE = accessEnv("MESSAGE_QUEUE");

const DELAY = 3000 // 30 seconds

module.exports = {

    // producer
    sendToQueue: async function(task) {
        console.log("Sending task...")
        await channel.sendToQueue('tasks', Buffer.from(JSON.stringify(task)), {
            contentType: 'application/json',
            persistent: true
        });
    
        winston.info(`Task ${task} sent!`);
    },

    // consumer
    listenToQueue: async function() {
        channel.consume('tasks', async (message) => {

            setTimeout(() => {
                const content = message.content.toString();
                const task = JSON.parse(content);
            
                channel.ack(message);

                call(task.user.first_name, task.user.id, task.user.phone_number)
            
                winston.info(`${task.user.first_name} ${task.user.phone_number} received!`);
            }, DELAY)
        });
    },

    connect: async function() {
        try {
            connection = await amqp.connect(MESSAGE_QUEUE);
            channel = await connection.createChannel();
    
            await channel.assertQueue('tasks', { durable: true });

            this.listenToQueue();

            // sendToQueue({ message: `Task ${y}`, test: "this is a test" })
        } catch(e) {
            console.log(e)
        }
    },

    close: function() {
        connection.close();
    }
};

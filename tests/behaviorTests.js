import assert from 'assert'
import { expect } from 'chai'
import sinon from 'sinon'
import { MailService } from '../src/mail client/mailService'
import { Account } from '../src/mail client/account'
import { Client } from '../src/mail client/client'
import { Message } from '../src/mail client/message'

// Почтовый клиент

// Я могу добавить аккаунт, с которого буду отправлять и на который буду получать письма
// Могу добавить несколько аккаунтов
// Я могу отправлять и получать письма
// Если у меня отключен интернет, письмо ставится в очередь на отправку
// Когда появляется интернет, письмо само отправляется из очереди

// Я могу добавить аккаунт
suite('Mail service should', ()=>{
    let mailService = new MailService();
    let mailServiceMock;

    test('provide account creating', ()=>{
        mailServiceMock = sinon.mock(mailService);
        let newAccount = new Account({name:""});

        mailServiceMock.expects('create').withArgs(newAccount).once();
        try{
            mailService.create(newAccount);
        }catch (err){}

        mailServiceMock.restore();
        mailServiceMock.verify();
    });

    // Могу добавить несколько аккаунтов
    test('provide account creating not only once', ()=>{
        mailServiceMock = sinon.mock(mailService);
        let newAccount = new Account({name:"newAccount"});
        let anotherAccount = new Account({name:"anotherAccount"});

        mailServiceMock.expects('create').withArgs(newAccount).once();
        mailServiceMock.expects('create').withArgs(anotherAccount).once();
        try{
            mailService.create(newAccount);
            mailService.create(anotherAccount);
        }catch (err){}

        mailServiceMock.restore();
        mailServiceMock.verify();
    });


    // Я могу отправлять письма
    suite('provide mail sending', ()=>{
        let mailServiceStub = {};
        let environmentStub = {};
        mailServiceMock = sinon.mock(mailService);

        let msg = "New message";
        let from = new Client(mailServiceStub,environmentStub);
        let to = new Client(mailServiceStub,environmentStub);

        mailServiceMock.expects('sendMessage').withArgs(from, to, msg).once();
        try{
            mailService.sendMessage(from, to, msg);
        }catch (err){}

        mailServiceMock.restore();
        mailServiceMock.verify();
    });

    // Я могу получать письма
    suite('provide receiving mail', ()=>{
        let mailServiceStub = {};
        let environmentStub = {};
        let account = new Account({name:''});
        let accountMock = sinon.mock(account);

        let msg = "New message";
        let from = new Client(mailServiceStub,environmentStub);
        let to = new Client(mailServiceStub,environmentStub);

        accountMock.expects('addMessage').withArgs(to, msg).once();
        try{
            mailService.sendMessage(from, to, msg);
        }catch (err){}

        mailServiceMock.restore();
        mailServiceMock.verify();
    });

});

// Если у меня отключен интернет, письмо ставится в очередь на отправку
suite('When I send message', ()=>{
    suite('have not got connection to the Internet', ()=> {
        test('then my message go to queue', ()=> {
            let mailServiceStub = {
                sendMessage: (from, to, msg)=> {

                }
            };
            let environmentStub = {
                checkInternet: ()=> {
                    return false;
                }
            };

            let msg = "New message";
            let to = new Client(mailServiceStub, environmentStub);

            let client = new Client(mailServiceStub, environmentStub);
            let clientMock = sinon.mock(client);

            clientMock.expects('addToQueue').withArgs(client, to, msg).once();

            try {
                client.sendMessage(to, msg);
            } catch (err) {
            }

            clientMock.restore();
            clientMock.verify();
        });
    });

    // Когда появляется интернет, письмо само отправляется из очереди
    suite('have got connection to the Internet and message in queue', ()=> {
        test('then message sent automatically', ()=>{
            let environmentStub = {
                checkInternet: ()=> {
                    return true;
                }
            };
            let msgInQueue = {message: '',recipient:'',sender:''};
            let mailService = new MailService();
            let mailServiceMock = sinon.mock(mailService);
            let client = new Client(mailService, environmentStub);
            client.messagesInQueue = [msgInQueue];

            mailServiceMock.expects('sendMessage').withArgs(msgInQueue.sender, msgInQueue.recipient, msgInQueue.message).once();

            try {
                client.availableConnectionToInternet();
            } catch (err) {
            }

            mailServiceMock.restore();
            mailServiceMock.verify();
        });
    });
});
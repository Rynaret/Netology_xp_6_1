import assert from 'assert'
import { expect } from 'chai'
import sinon from 'sinon'
import { MailService } from '../src/mail client/mailService'
import { Account } from '../src/mail client/account'

// Почтовый клиент

// Я могу добавить аккаунт, с которого буду отправлять и на который буду получать письма
// Могу добавить несколько аккаунтов
// Я могу отправлять и получать письма
// Если у меня отключен интернет, письмо ставится в очередь на отправку
// Когда появляется интернет, письмо само отправляется из очереди
// Когда отправляю письмо, могу выбрать, с какого аккаунта отправлять

// Я могу добавить аккаунт
suite('Mail service should', ()=>{
    let mailService;
    let mailServiceMock;

    setup(()=>{
        mailService = new MailService();
        mailServiceMock = sinon.mock(mailService);
    });


    test('provide account creating', ()=>{
        let newAccount = new Account();

        mailServiceMock.expects('create').withArgs(newAccount).once();
        try{
            mailService.create(newAccount);
        }catch (err){}

        mailServiceMock.restore();
        mailServiceMock.verify();
    });

    // Могу добавить несколько аккаунтов
    test('provide account creating not only once', ()=>{
        let newAccount = new Account();
        let anotherAccount = new Account();

        mailServiceMock.expects('create').withArgs(newAccount).once();
        mailServiceMock.expects('create').withArgs(anotherAccount).once();
        try{
            mailService.create(newAccount);
            mailService.create(anotherAccount);
        }catch (err){}

        mailServiceMock.restore();
        mailServiceMock.verify();
    });


});
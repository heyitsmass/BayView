import { send } from "node:process";
import { SMSNotifier } from "../lib/notifier/Sms";
import { expect, test, describe, vi } from 'vitest';


describe.skip("it should send an SMS", async () => {

    // const notifier = new SMSNotifier();
    // const numbers: string[] = ["replace with test number", "replace with test number"];
    // let sendNum: string;
    // //test for musltiple numbers
    // await Promise.all(numbers.map(async function (number) {
    //     sendNum = number;
    //     const response = await notifier.sendSMS(
    //         "This is a sample SMS",
    //         sendNum,
    //     );
    //     console.log(response);
    //     expect(response).toBeDefined();
    // }));
});

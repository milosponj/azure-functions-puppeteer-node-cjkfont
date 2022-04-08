import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as puppeteer from "puppeteer"
import * as util from "util"
import { promises as fs } from "fs"
import { exec } from "child_process"

const execAsync = util.promisify(exec);

const fontUpdate = async () => {
    const fontPath = process.env.FONT_PATH || '/home/.fonts';
    try {
        await fs.stat(fontPath);
        return
    } catch {
    }

    // ln -s /home/site/wwwroot/fonts $FONT_PATH
    await execAsync(`ln -s /home/site/wwwroot/fonts ${fontPath}`);
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const url = "https://en.wikipedia.org/wiki/Face_with_Tears_of_Joy_emoji";

    try {
        //await fontUpdate();

        const browser = await puppeteer.launch({
            args: process.env.PUPPETEER_ARGS?.split(' ')
        });
        const page = await browser.newPage();

        await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
        await page.emulateMediaType('screen');
        const body = await page.screenshot({ type: 'png' });
        browser.close();

        context.res = {
            // status: 200, /* Defaults to 200 */
            headers: {
                "Content-Type": "image/png"
            },
            body
        };
    } catch (e) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: e.toString()
        };
    }
};

export default httpTrigger;
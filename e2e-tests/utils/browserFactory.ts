import { chromium, firefox, webkit, BrowserContext } from 'playwright';

export class BrowserFactory {
    static async createBrowserContext(browserName: string): Promise<BrowserContext> {
        let browserContext: BrowserContext;

        switch (browserName.toLowerCase()) {
            case 'firefox':
                browserContext = await firefox.launch({ headless: false }).then(browser => browser.newContext());
                break;
            case 'webkit':
                browserContext = await webkit.launch({ headless: false }).then(browser => browser.newContext());
                break;
            case 'chromium':
            default:
                browserContext = await chromium.launch({ headless: false }).then(browser => browser.newContext());
                break;
        }

        return browserContext;
    }
}

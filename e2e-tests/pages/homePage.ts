import { BasePage } from './basePage';
import { Locator, Page } from 'playwright';

export class HomePage extends BasePage {
    private companyMenu: Locator;
    private careersOption: Locator;

    constructor(page: Page) {
        super(page);
        this.companyMenu = page.locator('text=Company');
        this.careersOption = page.locator('a[href*="careers"]');
    }

    async isHomePageOpened(): Promise<boolean> {
        const title = await this.getTitle();
        return title.includes('Insider');
    }

    async navigateToCareers() {
        await this.companyMenu.click();
        await this.careersOption.click();
    }
}

import { BasePage } from './basePage';
import { Locator, Page } from 'playwright';

export class CareersPage extends BasePage {
    private locationsBlock: Locator;
    private teamsBlock: Locator;
    private lifeAtInsiderBlock: Locator;

    constructor(page: Page) {
        super(page);
        this.locationsBlock = page.locator('text=Locations');
        this.teamsBlock = page.locator('text=Teams');
        this.lifeAtInsiderBlock = page.locator('text=Life at Insider');
    }

    async isCareerPageOpened(): Promise<boolean> {
        return (await this.locationsBlock.isVisible()) &&
               (await this.teamsBlock.isVisible()) &&
               (await this.lifeAtInsiderBlock.isVisible());
    }

    async goToQAPage() {
        await this.page.goto('https://useinsider.com/careers/quality-assurance/'); // URL should be stored on server
    }
}

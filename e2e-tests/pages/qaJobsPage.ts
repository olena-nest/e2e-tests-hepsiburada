import { BasePage } from './basePage';
import { Locator, Page } from 'playwright';

export class QAJobsPage extends BasePage {
    private seeAllQAJobsButton: Locator;
    private locationFilter: Locator;
    private departmentFilter: Locator;
    private jobList: Locator;

    constructor(page: Page) {
        super(page);
        this.seeAllQAJobsButton = page.locator('text=See all QA jobs');
        this.locationFilter = page.locator('span:text("Istanbul, Turkey")');
        this.departmentFilter = page.locator('span:text("Quality Assurance")');
        this.jobList = page.locator('.position-list-item');
    }

    async viewAllQAJobs() {
        await this.seeAllQAJobsButton.click();
    }

    async filterByLocationAndDepartment() {
        await this.locationFilter.click();
        await this.departmentFilter.click();
    }

    async checkJobDetails(): Promise<boolean> {
        const jobs = await this.jobList.all();
        for (const job of jobs) {
            const position = await job.locator('.position-title').innerText();
            const department = await job.locator('.position-department').innerText();
            const location = await job.locator('.position-location').innerText();

            if (!position.includes('Quality Assurance') || 
                !department.includes('Quality Assurance') ||
                !location.includes('Istanbul, Turkey')) {
                return false;
            }
        }
        return true;
    }

    async viewFirstJobRole() {
        const firstJob = this.jobList.first();
        await firstJob.locator('text=View Role').click();
    }

    async isRedirectedToLever(): Promise<boolean> {
        return this.page.url().includes('lever.co');
    }
}
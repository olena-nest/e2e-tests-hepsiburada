import { BrowserContext, Page } from 'playwright';
import { BrowserFactory } from '../utils/browserFactory';
import { HomePage } from '../pages/HomePage';
import { CareersPage } from '../pages/careersPage';
import { QAJobsPage } from '../pages/qaJobsPage';

describe('Insider Website Test Scenarios', () => {
    let context: BrowserContext;
    let page: Page;

    const runTest = async (browserName: string) => {
        try {
            // Create a new browser context
            context = await BrowserFactory.createBrowserContext(browserName);
            page = await context.newPage();

            // Step 1: Visit https://useinsider.com/ and check if Insider home page is opened
            const homePage = new HomePage(page);
            await homePage.visit('https://useinsider.com/');
            expect(await homePage.isHomePageOpened()).toBe(true);

            // Step 2: Navigate to Careers and check if page and sections are visible
            await homePage.navigateToCareers();
            const careersPage = new CareersPage(page);
            expect(await careersPage.isCareerPageOpened()).toBe(true);

            // Step 3: Go to QA Jobs page and filter by Location and Department
            await careersPage.goToQAPage();
            const qaJobsPage = new QAJobsPage(page);
            await qaJobsPage.viewAllQAJobs();
            await qaJobsPage.filterByLocationAndDepartment();

            // Step 4: Verify job listings
            expect(await qaJobsPage.checkJobDetails()).toBe(true);

            // Step 5: Click View Role and verify redirection to Lever
            await qaJobsPage.viewFirstJobRole();
            expect(await qaJobsPage.isRedirectedToLever()).toBe(true);

            console.log(`Test passed on ${browserName}`);
        } catch (error) {
            console.error(`Test failed on ${browserName}: ${error.message}`);
            await page.screenshot({ path: `failed_${browserName}.png` });
            throw error; // Rethrow to let Jest handle the error
        } finally {
            if (page) {
                await page.close();
            }
            if (context) {
                await context.close();
            }
        }
    };

    it('should run test scenarios on Chromium', async () => {
        await runTest('chromium');
    });

    it('should run test scenarios on Firefox', async () => {
        await runTest('firefox');
    });
});

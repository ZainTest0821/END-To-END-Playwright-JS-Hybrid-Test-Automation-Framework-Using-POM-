import { test, expect } from '../fixtures/baseFixture.js';
import { generatePostJobData } from '../utils/Fakerlibrary.js';
import { PostJobPage } from '../pages/PostyourjobPage.js';

test.describe('Post a Job - Full Multistep Flow', () => {

  test('Validate multistep form with validation, navigation, and submission', async ({ page }) => {

    const postJobPage = new PostJobPage(page);
    const data = generatePostJobData();

    console.log('🧪 Test Data:', data);

    // ================= PAGE LOAD & TITLE =================
    await page.goto('/got-a-job/');
    await postJobPage.verifyPageLoaded();
    await postJobPage.verifyTitle('Looking to hire?');

  

    // ================= STEP 1: VALIDATION CHECK =================
   // await postJobPage.scrollToElement(postJobPage.nextBtn);
    await postJobPage.clickNextStep1();
    await postJobPage.verifyStep1ValidationErrors(); // should see errors

    // ================= STEP 1: FILL =================
    
    //await postJobPage.scrollToElement(postJobPage.firstName);
    await postJobPage.ensureStep1Visible();
    await postJobPage.fillPersonalInfo(data);
    //await postJobPage.scrollToElement(postJobPage.nextBtn);
    await postJobPage.clickNextStep1();




    // ================= STEP 2: VALIDATION + FILL =================
   //wait postJobPage.scrollToElement(postJobPage.nextBtn);
    await postJobPage.clickNextStep2(); // empty validation (optional if step 2 has required fields)
    // No required field errors? Skip or check if needed
    await postJobPage.selectJobType(data.jobType);

  // make sure selection actually worked (you must add this method, see below)
     await postJobPage.verifyJobTypeSelected(data.jobType);

    await postJobPage.clickNextStep2();

// wait for correct Step 3 fields based on selection
    await postJobPage.waitForStep3Active();



    
    // ================= STEP 3: VALIDATION + FILL =================
   //wait postJobPage.scrollToElement(postJobPage.nextBtn);
    await postJobPage.clickSubmit(); // click Next / Submit without filling
    await postJobPage.verifyStep3ValidationErrors(); // check errors

    // Fill Step 3 fields
    await postJobPage.fillJobDetails(data);



    // ================= NAVIGATION CHECK =================
    await postJobPage.scrollToElement(postJobPage.getBackButton());
await postJobPage.getBackButton().click();  // Go to step 2

await postJobPage.scrollToElement(postJobPage.getBackButton());
await postJobPage.getBackButton().click(); //Go to step 1

    // Navigate forward to Step 3 again
    await postJobPage.scrollToElement(postJobPage.nextBtnStep1);
    await postJobPage.clickNextStep1(); // Step 1 → Step 2
    await postJobPage.scrollToElement(postJobPage.nextBtnStep2);
    await postJobPage.clickNextStep2(); // Step 2 → Step 3

    // ================= FINAL SUBMIT =================
    await postJobPage.scrollToElement(postJobPage.submitBtn);
    await postJobPage.clickSubmit();
    await postJobPage.verifySubmissionSuccess();

    await postJobPage.confirmSubmissionPopup(); // Click OK on success popup

    // ================= POST SUBMISSION RESET CHECK =================
    await postJobPage.verifyPageLoaded(); // user redirected to first step
    // optional: check that input fields are empty
    await expect(postJobPage.firstName).toHaveValue('');
    await expect(postJobPage.lastName).toHaveValue('');
    await expect(postJobPage.email).toHaveValue('');
  });

});

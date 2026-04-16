// We are using the Faker Library to generate fake data for our job postings
import { expect } from '@playwright/test';

export const JOB_CATEGORIES = [
  'UI/UX Design',
  'Project Management',
  'App Development',
  'Digital Marketing',
  'Blockchain and NFTs',
  'Business Development',
  'Google Ads and SEO',
  'Content Writing',
  'CMS',
  'Gaming',
  'AI/ML Computer Vision',
  'Web Development',
  'Graphic Design',
  'DevOps/Database'
];

export class PostJobPage {
  constructor(page) {
    this.page = page;
    this.form = page.getByRole('form', { name: 'Contact form' }).first();
    this.selectedJobType = null;

    // ================= COMMON =================
    this.pageTitle = page.locator('h1');
    this.personalInfoHeading = page.getByRole('heading', { name: 'Personal Information' });
    
    // Step Buttons
   this.nextBtnStep1 = page.locator('.multistep-job-form-step:nth-of-type(1) button:has-text("Next →")');
this.nextBtnStep2 = page.locator('.multistep-job-form-step:nth-of-type(2) button:has-text("Next →")');


   this.backBtn = page.getByRole('button', { name: '← Previous' });
    this.submitBtn = page.getByRole('button', { name: '✓ Submit' });
    this.successOkBtn = page.locator('button.swal2-confirm');  // Success popup OK button

    // ================= STEP 1 =================
    this.firstName = page.locator('input[name="FirstName"]:visible');
    this.lastName = page.locator('input[name="LastName"]:visible');
    this.company = page.locator('input[name="CompanyName"]:visible');
    this.email = page.locator('input[name="Email"]:visible');
    this.linkedin = page.locator('input[name="LinkedInURL"]:visible');
    this.phone = page.locator('input[name="phonetext-636"]:visible');

    this.step1Errors = page.locator('.multistep-job-form-error');




    // ================= STEP 2 =================
    this.jobTypeJob = page.locator('span.multistep-job-form-check-text', { hasText: 'Job' });
    this.jobTypeProject = page.locator('span.multistep-job-form-check-text', { hasText: 'Project' });



    

    // ================= STEP 3 =================
    this.step3 = page.locator('.multistep-job-form-step:visible');

    this.categoryTrigger = page.locator('.selected-tags:visible');

    // this.tags = this.step3.locator('input.tags-input:not([disabled])').first();
    this.tags = this.step3.locator('input.tags-input:visible').first();

    // this.budget = this.step3.get('Budget ($)');
    this.budget = this.step3.getByRole('textbox', { name: 'Budget ($)' });
    this.step3Errors = page.locator('.error, .text-danger');

    // ================= SUCCESS =================
    this.successMessage = page.locator('text=successfully');
  }

    // ================= SCROLL METHOD =================

async scrollToElement(locator) {
  const el = locator.first();
  await el.waitFor({ state: 'visible' });
  await el.scrollIntoViewIfNeeded();
}
 


  // ================= PAGE METHODS =================

  async verifyPageLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.pageTitle).toBeVisible();
  }

  async verifyTitle(expected) {
    await expect(this.pageTitle).toContainText(expected);
  }






  // ================= STEP 1 =================

  async fillPersonalInfo(data) {
    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.company.fill(data.company);
    await this.email.fill(data.email);
    await this.linkedin.fill(data.linkedin);
    await this.phone.fill(data.phone);
  }

    async clickNextStep1() {
  await this.nextBtnStep1.scrollIntoViewIfNeeded();
  await this.nextBtnStep1.waitFor({ state: 'visible' });
  await this.nextBtnStep1.click();
}

  async verifyStep1ValidationErrors() {
  //await this.page.waitForTimeout(1000); // small buffer (optional but practical)

  await this.page.waitForSelector('.multistep-job-form-error', {
    state: 'visible',
    //timeout: 5000
  
  });

  const errors = this.page.locator('.multistep-job-form-error:visible');
  const count = await errors.count();

  if (count === 0) {
    throw new Error('No validation errors appeared for Step 1!');
  }

  for (let i = 0; i < count; i++) {
    console.log('Validation Error:', await errors.nth(i).innerText());
  }
}

async ensureStep1Visible() {
  await expect(this.firstName).toBeVisible();
}







  // ================= STEP 2 =================

 async selectJobType(type) {
  this.selectedJobType = type;

  if (type === 'Job') {
    await this.jobTypeJob.scrollIntoViewIfNeeded();
    await this.jobTypeJob.click({ force: true }); // force in case of overlay issues
  } else {
    await this.jobTypeProject.scrollIntoViewIfNeeded();
    await this.jobTypeProject.click({ force: true });
  }
}

  async clickNextStep2() {
  await this.nextBtnStep2.scrollIntoViewIfNeeded();
  await expect(this.nextBtnStep2).toBeEnabled({ timeout: 5000 });
  await this.nextBtnStep2.click();
}

  async verifyStep2Visible() {
    await expect(this.jobTypeJob).toBeVisible();
  }

  async goBackToStep2() {
    await this.backBtn.click();
  }








  // ================= STEP 3 =================
  // Helper to get the correct title field based on the job type selection in Step 2

 getTitleField() {
  if (this.selectedJobType === 'Job') {
    return this.step3.locator('input[name="JobTitle"]');
  }

  return this.step3.locator('input[name="ProjectTitle"]');
}

// Verify that the correct title field is visible based on the job type selection in Step 2

 getDescriptionField() {
  if (this.selectedJobType === 'Job') {
    return this.step3.locator('textarea[name="JobDescription"]');
  }

  return this.step3.locator('textarea[name="ProjectDescription"]');
}


// Wait for Step 3 to be active and the correct fields to be visible based on the job type selection in Step 2
 async waitForStep3Active() {
  await expect(this.getTitleField()).toBeVisible({ timeout: 5000 });
}


// Verify that the correct job type is selected and visible in Step 3 based on the choice made in Step 2


async verifyJobTypeSelected(type) {
  const target =
    type === 'Job' ? this.jobTypeJob : this.jobTypeProject;

  await expect(target).toBeVisible(); // basic check


}


// Fill the data for Step 3 based on the selected job type (Job vs Project) and other details

  async fillJobDetails(data) {
  await this.waitForStep3Active();

  await this.getTitleField().fill(data.title);
  await this.getDescriptionField().fill(data.description);
  await this.selectCategories(data.categories);
  await this.tags.fill(data.tags);
  await this.budget.fill(data.budget);
}


// Select Categories - handles custom dropdown with multi-select and dynamic options


async selectCategories(categories) {
    if (!Array.isArray(categories) || categories.length === 0) {
      throw new Error('categories must be a non-empty array');
    }

    // ✅ Open the dropdown
    await this.categoryTrigger.waitFor({ state: 'visible' });
    await this.categoryTrigger.click();

    // ✅ Wait for dropdown menu to appear
    const dropdownMenu = this.step3.locator('div.dropdown-menu.active');
    await dropdownMenu.waitFor({ state: 'visible' });

    for (const category of categories) {
      // ✅ Match by data-value attribute — exact, stable, no position needed
      const option = dropdownMenu.locator(`div.dropdown-item[data-value="${category}"]`);
      await option.waitFor({ state: 'visible' });
      await option.click();
    }

  // ✅ After — click outside to safely close the dropdown
await this.page.mouse.click(0, 0);

// Wait until dropdown is gone
await expect (dropdownMenu).toBeHidden();
  }





// Verify that validation errors appear for required fields in Step 3 when trying to submit without filling them out

  async verifyStep3ValidationErrors() {
await this.page.waitForSelector('.multistep-job-form-error', {
    state: 'visible',
  
  });

  const errors = this.page.locator('.multistep-job-form-error:visible');
  const count = await errors.count();

  if (count === 0) {
    throw new Error('No validation errors appeared for Step 1!');
  }

  for (let i = 0; i < count; i++) {
    console.log('Validation Error:', await errors.nth(i).innerText());
  }
}

// Specific validation check for budget field if needed (example of checking for a minimum budget error message)


  async verifyBudgetError() {
    await expect(this.page.locator('text=minimum')).toBeVisible();
  }



  // ================= FINAL =================

  getBackButton() {
  return this.page
    .locator('.multistep-job-form-step:visible')
    .getByRole('button', { name: '← Previous' });
}

  async clickSubmit() {
    await this.submitBtn.click();
  }

  
  async confirmSubmissionPopup() {
  await expect(this.successOkBtn).toBeVisible({ timeout: 10000 });
  await this.successOkBtn.click();
}

  async verifySubmissionSuccess() {
    await expect(this.successMessage).toBeVisible({ timeout: 15000 });
  }
}

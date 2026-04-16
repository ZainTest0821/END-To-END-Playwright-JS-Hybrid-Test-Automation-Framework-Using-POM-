

## Project Overview

This repository is a Playwright-based end-to-end test suite for the public Ojiiz website at `https://ojiiz.com/`. Its purpose is to automate high-value user journeys and page checks so the team can quickly detect broken navigation, missing UI elements, dead calls-to-action, footer link issues, and regressions in the multi-step "Post a Job" form.

The suite focuses on:

- Core public pages such as Home, How It Works, Pricing & Plans, Contact Us, and How to Win a Client
- API-level validation of important links and call-to-action buttons
- UI visibility checks for critical elements like search and footer content
- Full workflow testing of the multi-step job/project submission form using dynamically generated data

This helps catch problems that matter to real users, including broken links, incorrect page titles, missing form validation, and failures in the hiring flow.

## Tech Stack / Dependencies

### Languages and Runtime

- JavaScript
- Node.js

### Test Framework and Automation Tools

- [Playwright](https://playwright.dev/) via `@playwright/test` for browser automation, assertions, API checks, screenshots, traces, videos, and HTML reports
- GitHub Actions for CI execution

### Data Generation

- `@faker-js/faker` for randomized test input in the "Post a Job" flow

### Type Support

- `@types/node` for Node.js type definitions

### Locked Versions in `package-lock.json`

| Package | Version |
| --- | --- |
| `@playwright/test` | `1.59.1` |
| `playwright` | `1.59.1` |
| `playwright-core` | `1.59.1` |
| `@faker-js/faker` | `10.4.0` |
| `@types/node` | `25.5.2` |
| `undici-types` | `7.18.2` |

### Minimum Runtime Requirements Implied by Dependencies

- Node.js `>= 18` is required by Playwright
- Faker `10.4.0` declares support for Node `^20.19.0 || ^22.13.0 || ^23.5.0 || >=24.0.0`
- npm `>= 10` is required by Faker `10.4.0`

For best compatibility with the lockfile as committed, use a current Node 20+ release.

## Project Structure

The repository is organized around Playwright page objects, fixtures, utilities, and test specs.

| Path | Purpose |
| --- | --- |
| [`.github/workflows/playwright.yml`](/d:/Internal%20Projects%20Automation/.github/workflows/playwright.yml) | CI workflow that installs dependencies, installs Playwright browsers, runs the test suite, and uploads the HTML report artifact. |
| [`package.json`](/d:/Internal%20Projects%20Automation/package.json) | Project metadata and top-level dependencies. No npm scripts are defined, so commands are run through `npx`. |
| [`package-lock.json`](/d:/Internal%20Projects%20Automation/package-lock.json) | Exact dependency resolution for consistent installs. |
| [`playwright.config.js`](/d:/Internal%20Projects%20Automation/playwright.config.js) | Global Playwright configuration including `baseURL`, timeouts, retries, reporting, headless behavior, and Chromium project settings. |
| [`fixtures/baseFixture.js`](/d:/Internal%20Projects%20Automation/fixtures/baseFixture.js) | Extends Playwright's base test with reusable page object fixtures such as `homePage`, `pricingPage`, and `contactUsPage`. |
| [`pages/BasePage.js`](/d:/Internal%20Projects%20Automation/pages/BasePage.js) | Shared helper methods for clicking, filling, reading text, waiting for visibility, and waiting on URL changes. |
| [`pages/HomePage.js`](/d:/Internal%20Projects%20Automation/pages/HomePage.js) | Page object for the home page, including search box checks, navigation links, scrolling, and footer visibility. |
| [`pages/HowItWorksPage.js`](/d:/Internal%20Projects%20Automation/pages/HowItWorksPage.js) | Page object for the "How Ojiiz Works" page, including title checks and API validation of CTA links. |
| [`pages/PricingPage.js`](/d:/Internal%20Projects%20Automation/pages/PricingPage.js) | Page object for the pricing page, including pricing card CTA verification and "Find Out More" API validation. |
| [`pages/FaqPage.js`](/d:/Internal%20Projects%20Automation/pages/FaqPage.js) | Page object for FAQ behavior, including expanding an accordion item and reading its answer text. |
| [`pages/HowToWinAClientPage.js`](/d:/Internal%20Projects%20Automation/pages/HowToWinAClientPage.js) | Page object for title verification on the "How to Win a Client" page. |
| [`pages/ContactUsPage.js`](/d:/Internal%20Projects%20Automation/pages/ContactUsPage.js) | Page object for title verification on the Contact Us page. |
| [`pages/Footervalidation.js`](/d:/Internal%20Projects%20Automation/pages/Footervalidation.js) | Footer-specific page object that scrolls to the footer, confirms visibility, and checks important footer links with HTTP requests. |
| [`pages/PostyourjobPage.js`](/d:/Internal%20Projects%20Automation/pages/PostyourjobPage.js) | Largest page object in the suite; models the multi-step "Post a Job / Project" form, validation, category selection, navigation, submission, and success popup handling. |
| [`utils/Fakerlibrary.js`](/d:/Internal%20Projects%20Automation/utils/Fakerlibrary.js) | Generates realistic randomized test data for the multi-step submission flow. |
| [`utils/helpers.js`](/d:/Internal%20Projects%20Automation/utils/helpers.js) | Small generic helpers for generating random strings and waiting a fixed number of milliseconds. Not currently imported by the specs in this repo. |
| [`tests/home.spec.js`](/d:/Internal%20Projects%20Automation/tests/home.spec.js) | Home page smoke test covering load, URL, search visibility, scroll, and footer visibility. |
| [`tests/Howitworks.spec.js`](/d:/Internal%20Projects%20Automation/tests/Howitworks.spec.js) | End-to-end check for the How It Works page and its CTA links. |
| [`tests/PricingandPlans.spec.js`](/d:/Internal%20Projects%20Automation/tests/PricingandPlans.spec.js) | Pricing page verification including CTA link health checks. |
| [`tests/footervalidation.spec.js`](/d:/Internal%20Projects%20Automation/tests/footervalidation.spec.js) | Footer link validation test using live HTTP requests. |
| [`tests/howtowinaclient.spec.js`](/d:/Internal%20Projects%20Automation/tests/howtowinaclient.spec.js) | Title check for the "How to Win a Client" page. |
| [`tests/ContactUs.spec.js`](/d:/Internal%20Projects%20Automation/tests/ContactUs.spec.js) | Title check for the Contact Us page. |
| [`tests/PostJob.spec.js`](/d:/Internal%20Projects%20Automation/tests/PostJob.spec.js) | Full multi-step form test including validation, randomized inputs, backward/forward navigation, and final submission. |

## Setup & Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd "Internal Projects Automation"
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Install Playwright browsers

If you are on Linux CI, the workflow uses `--with-deps`. Locally, the plain install is usually enough:

```bash
npx playwright install
```

If you want the same behavior as CI on a supported environment:

```bash
npx playwright install --with-deps
```

### 4. Confirm Node version

Use Node 20+ to stay aligned with the dependency requirements in the lockfile.

```bash
node -v
npm -v
```

## Usage

Because `package.json` does not define npm scripts, run Playwright directly with `npx`.

### Run the full test suite

```bash
npx playwright test
```

### Run a single spec file

```bash
npx playwright test tests/home.spec.js
```

```bash
npx playwright test tests/PostJob.spec.js
```

### Run tests in headless mode

The config sets:

- `headless: process.env.HEADLESS !== 'true'`

That means tests are headless by default. Setting `HEADLESS=true` actually turns headed mode on, which is useful for debugging.

Debug example:

```bash
HEADLESS=true npx playwright test tests/PostJob.spec.js
```

### Open the last HTML report

```bash
npx playwright show-report
```

### What the suite runs against

- Base URL: `https://ojiiz.com/`
- Browser project: Chromium desktop only
- Parallelism: `workers: '50%'`
- Retries: `1` in CI, `0` locally
- Screenshots: captured on failure
- Videos: retained on failure
- Traces: kept on first retry

## Tests — Detailed Explanation

This section explains each test individually so a developer can understand the test suite without opening the test files.

### 1. Home Page Smoke Test

File: [`tests/home.spec.js`](/d:/Internal%20Projects%20Automation/tests/home.spec.js)

#### Test case

`should load homepage, verify search, scroll and check footer`

#### What it does

Before the test runs, Playwright opens the site root path `/`, which resolves against the configured base URL `https://ojiiz.com/`.

The test then:

1. Confirms the home page has loaded by checking that the main search box is visible.
2. Verifies the current URL matches `ojiiz.com`.
3. Verifies the search box is visible again as an explicit UI assertion.
4. Scrolls the page to the bottom using a page-evaluated `window.scrollTo`.
5. Confirms the footer becomes visible after scrolling.

#### Why it matters

This is a basic production smoke test. It catches:

- Home page load failures
- Broken page rendering that hides the main search input
- Incorrect routing or redirects
- Footer rendering problems

#### Inputs used

- URL: `/`
- No typed form data
- No randomized inputs

#### Expected behavior

- The home page loads successfully
- The search input with placeholder `Search your relevant tech` is visible
- The URL matches the production site
- The footer exists and can be seen after scrolling

#### What would cause it to fail

- The page does not load
- The search box placeholder changes or the element disappears
- The site redirects to an unexpected URL
- The footer is missing, hidden, or never rendered

### 2. How It Works Page Test

File: [`tests/Howitworks.spec.js`](/d:/Internal%20Projects%20Automation/tests/Howitworks.spec.js)

#### Test case

`should load page, verify title, and validate CTA buttons API`

#### What it does

Before the test, the browser navigates to `/how-it-works/`.

The test then:

1. Waits for the page to finish initial DOM loading.
2. Checks that a heading matching `How Ojiiz Works` is visible.
3. Verifies the page title text contains `How Ojiiz Works`.
4. Reads the `href` of the `Get Now` CTA.
5. Sends an HTTP GET request to that URL using Playwright's request context.
6. Fails if the response status is `400` or higher.
7. Scrolls to the `explore more` CTA near the bottom of the page.
8. Reads that CTA's `href` and sends another HTTP GET request.
9. Fails if that response status is `400` or higher.

#### Why it matters

It validates both the page content and the real destinations behind key marketing CTAs. This catches broken conversion paths even when the page itself renders correctly.

#### Inputs used

- URL: `/how-it-works/`
- Expected title text: `How Ojiiz Works`
- Dynamic input: the live `href` values currently present on the page

#### Expected behavior

- The page loads and displays the expected title
- Both CTA buttons expose usable links
- Both linked destinations return successful HTTP responses below `400`

#### What would cause it to fail

- The page title changes or is not visible
- Either CTA has no `href`
- Either linked destination returns `4xx` or `5xx`
- The lower CTA never appears after scrolling

### 3. Pricing & Plans Test

File: [`tests/PricingandPlans.spec.js`](/d:/Internal%20Projects%20Automation/tests/PricingandPlans.spec.js)

#### Test case

`should load page, verify title, pricing card buttons, and Find Out More button`

#### What it does

Before the test, the browser navigates to `/pricing-plans/`.

The test then:

1. Waits for the pricing page to load.
2. Reads the first matching title element from `h1`, `.elementor-heading-title`, or `.page-title`.
3. Verifies that title text includes `Pricing & Plans`.
4. Scrolls to the pricing cards by bringing the `Get started` CTA into view.
5. Iterates through four pricing CTAs:
   - `Get started`
   - `Choose Growth`
   - `Get Pro Now`
   - `Contact Sales`
6. For each CTA, reads its `href`, resolves relative links against the current page URL, performs an HTTP GET request, and fails if the status is `400` or greater.
7. Separately checks the `Find Out More` CTA in the same way and fails if it has no link or returns an error response.

#### Why it matters

Pricing pages are high-conversion pages. This test ensures that the visible plans and supporting CTA links do not silently break.

#### Inputs used

- URL: `/pricing-plans/`
- Expected title text: `Pricing & Plans`
- Dynamic inputs: the `href` values currently rendered on all pricing CTAs

#### Expected behavior

- The page title is present and matches expectations
- All listed pricing CTAs have working links
- The `Find Out More` CTA also resolves successfully

#### What would cause it to fail

- Missing or changed title text
- A CTA with a missing `href`
- A CTA link returning `4xx` or `5xx`
- Pricing buttons not rendered on the page

### 4. Footer Link API Validation Test

File: [`tests/footervalidation.spec.js`](/d:/Internal%20Projects%20Automation/tests/footervalidation.spec.js)

#### Test case

`should validate specific footer buttons via API`

#### What it does

Before the test, the browser opens the home page `/`.

The test then:

1. Creates a dedicated `FooterValidation` page object.
2. Scrolls to the page footer.
3. Confirms the footer is visible.
4. Looks for the following footer links by text:
   - `How It Works`
   - `Blogs`
   - `Pricing`
   - `Contact Us`
   - `Frequently Asked Questions`
5. For each link found, reads the `href`, converts relative URLs into absolute URLs, and sends an HTTP request to validate the target.
6. Treats any response status `>= 400` as a broken link.
7. Logs a warning instead of failing immediately when an individual footer link cannot be located or validated because the page object wraps each link check in `try/catch`.

#### Why it matters

Footer links are site-wide navigation. If they break, users can lose access to key informational pages from every page on the site.

#### Inputs used

- URL: `/`
- Link texts listed above
- Dynamic inputs: the live `href` values found in the footer

#### Expected behavior

- The footer is visible
- Each footer link, when present, resolves to a healthy endpoint

#### What would cause it to fail

- The footer never appears
- A located link returns an HTTP status `>= 400`

#### Important nuance

Because the page object catches per-link errors and converts them to warnings, some missing or unlocatable footer links may not fail the test outright. The README should therefore treat this test as a best-effort link health check rather than a strict all-links-must-exist assertion.

### 5. How to Win a Client Page Test

File: [`tests/howtowinaclient.spec.js`](/d:/Internal%20Projects%20Automation/tests/howtowinaclient.spec.js)

#### Test case

`should load page and verify title`

#### What it does

Before the test, the browser opens `/how-to-win-a-client/`.

The test then:

1. Waits for the page to load.
2. Finds the first title-like element matching `h1`, `.elementor-heading-title`, or `.page-title`.
3. Reads the text content from that element.
4. Verifies that the text contains `How to Win a Client`, case-insensitively.

#### Why it matters

This is a focused smoke check for a content page. It ensures the route is live and the main title is still correct.

#### Inputs used

- URL: `/how-to-win-a-client/`
- Expected title text: `How to Win a Client`

#### Expected behavior

- The page loads
- The visible title contains the expected phrase

#### What would cause it to fail

- The page does not render a title
- The page title changes substantially
- The route is broken or redirected unexpectedly

### 6. Contact Us Page Test

File: [`tests/ContactUs.spec.js`](/d:/Internal%20Projects%20Automation/tests/ContactUs.spec.js)

#### Test case

`should load page and verify title`

#### What it does

Before the test, the browser opens `/contact-us/`.

The test then:

1. Waits for the page to load.
2. Finds the first title-like element matching `h1`, `.elementor-heading-title`, or `.page-title`.
3. Reads the text content.
4. Verifies that the text contains `Contact Us`, case-insensitively.

#### Why it matters

This ensures an important lead-generation page is reachable and still displays the expected identity to users.

#### Inputs used

- URL: `/contact-us/`
- Expected title text: `Contact Us`

#### Expected behavior

- The page loads successfully
- The title text includes `Contact Us`

#### What would cause it to fail

- Missing title element
- Changed title text
- Broken or redirected route

### 7. Post a Job / Project Full Multistep Flow Test

File: [`tests/PostJob.spec.js`](/d:/Internal%20Projects%20Automation/tests/PostJob.spec.js)

#### Test case

`Validate multistep form with validation, navigation, and submission`

#### What it does

This is the most complex test in the suite. It exercises the entire multi-step submission form at `/got-a-job/`.

The test performs the following sequence:

1. Generates randomized submission data using Faker.
2. Opens the page `/got-a-job/`.
3. Verifies the page title contains `Looking to hire?`.

#### Step 1: validation without input

4. Clicks the Step 1 `Next` button before filling anything.
5. Waits for `.multistep-job-form-error` elements to appear.
6. Fails if no validation errors are shown.

This confirms required personal-information validation is active.

#### Step 1: valid data entry

7. Confirms the Step 1 form is visible by checking the first-name field.
8. Fills these fields using Faker-generated values:
   - First name
   - Last name
   - Company name
   - Email
   - LinkedIn URL derived from the generated first and last name
   - Phone number as a 10-digit numeric string
9. Clicks `Next` again to move to Step 2.

#### Step 2: choose listing type

10. Clicks the Step 2 `Next` button once before selecting a type. The comment notes this is an optional validation check because Step 2 may or may not enforce a required choice.
11. Selects either `Job` or `Project` using Faker's random choice.
12. Verifies the selected type's UI element is visible.
13. Clicks the Step 2 `Next` button to move to Step 3.
14. Waits for the correct Step 3 title field to appear based on the selected type:
   - If Faker picked `Job`, it waits for `input[name="JobTitle"]`
   - If Faker picked `Project`, it waits for `input[name="ProjectTitle"]`

#### Step 3: validation without input

15. Clicks `Submit` before filling Step 3.
16. Waits for validation errors to appear.
17. Fails if no visible validation errors are shown.

This confirms Step 3 required-field validation is active.

#### Step 3: valid data entry

18. Fills the title field with `faker.lorem.words(3)`.
19. Fills the description field with `faker.lorem.sentences(2)`.
20. Selects exactly 3 categories from the predefined category list in `JOB_CATEGORIES` using `faker.helpers.arrayElements`.
21. Fills the tags input with the static string `qa,automation,test`.
22. Fills the budget field with a random integer between `50` and `1000`, converted to a string.

The category options are drawn from this fixed list:

- `UI/UX Design`
- `Project Management`
- `App Development`
- `Digital Marketing`
- `Blockchain and NFTs`
- `Business Development`
- `Google Ads and SEO`
- `Content Writing`
- `CMS`
- `Gaming`
- `AI/ML Computer Vision`
- `Web Development`
- `Graphic Design`
- `DevOps/Database`

#### Navigation persistence check

23. Scrolls to the visible `Previous` button and clicks it once to return to Step 2.
24. Clicks `Previous` again to return to Step 1.
25. Navigates forward again using the Step 1 and Step 2 `Next` buttons to reach Step 3.

This checks that navigation between steps remains functional after the form has already been partially completed.

#### Final submission and reset check

26. Scrolls to the submit button.
27. Clicks `Submit`.
28. Verifies a success message containing `successfully` becomes visible.
29. Clicks the success popup confirmation button (`button.swal2-confirm`).
30. Verifies the form is back on the initial page state.
31. Asserts that at least these fields are empty again:
   - First name
   - Last name
   - Email

#### Why it matters

This test covers the highest-risk flow in the repository because it exercises:

- Required field validation
- Randomized form input generation
- Conditional form structure based on `Job` versus `Project`
- Multi-select category handling
- Backward and forward navigation
- Successful final submission
- Post-submit reset behavior

#### Inputs used

Generated in [`utils/Fakerlibrary.js`](/d:/Internal%20Projects%20Automation/utils/Fakerlibrary.js):

| Field | Source |
| --- | --- |
| `firstName` | `faker.person.firstName()` |
| `lastName` | `faker.person.lastName()` |
| `company` | `faker.company.name()` |
| `email` | `faker.internet.email()` |
| `linkedin` | `https://linkedin.com/in/<firstName><lastName>` in lowercase |
| `phone` | `faker.string.numeric(10)` |
| `jobType` | Randomly `Job` or `Project` |
| `title` | `faker.lorem.words(3)` |
| `description` | `faker.lorem.sentences(2)` |
| `categories` | 3 random values from `JOB_CATEGORIES` |
| `tags` | Static string `qa,automation,test` |
| `budget` | Random integer between `50` and `1000` as a string |

#### Expected behavior

- Step 1 and Step 3 validation trigger when submitting empty required fields
- Step 2 accepts one of the two supported listing types
- Step 3 shows the correct field set for the selected type
- The randomized valid data is accepted
- Submission succeeds
- The success confirmation popup appears
- The form returns to a clean state afterward

#### What would cause it to fail

- Missing validation errors when expected
- Any required field failing to accept generated data
- `Job`/`Project` selection not switching Step 3 to the corresponding fields
- Category dropdown not opening or options not matching the generated values
- Submission errors or missing success message
- Form reset not clearing the checked fields

#### Important operational note

This test submits data to the live site configured in `playwright.config.js`. That means running it may create real entries or trigger real workflows unless the production form suppresses or sanitizes test submissions.

## Environment Variables / Configuration

The codebase does not use a `.env` file and does not import `dotenv`.

The following runtime configuration is present:

| Setting | Source | Effect |
| --- | --- | --- |
| `baseURL` | [`playwright.config.js`](/d:/Internal%20Projects%20Automation/playwright.config.js) | All relative `page.goto()` calls resolve against `https://ojiiz.com/`. |
| `timeout` | [`playwright.config.js`](/d:/Internal%20Projects%20Automation/playwright.config.js) | Each test has a 60-second maximum runtime. |
| `expect.timeout` | [`playwright.config.js`](/d:/Internal%20Projects%20Automation/playwright.config.js) | Assertions wait up to 20 seconds by default. |
| `actionTimeout` | [`playwright.config.js`](/d:/Internal%20Projects%20Automation/playwright.config.js) | Individual Playwright actions wait up to 20 seconds. |
| `retries` | [`playwright.config.js`](/d:/Internal%20Projects%20Automation/playwright.config.js) | Retries once in CI, not locally. |
| `workers` | [`playwright.config.js`](/d:/Internal%20Projects%20Automation/playwright.config.js) | Uses 50% of available workers. |
| `HEADLESS` | [`playwright.config.js`](/d:/Internal%20Projects%20Automation/playwright.config.js) | If set to `true`, the expression `process.env.HEADLESS !== 'true'` makes Playwright run in headed mode. If unset, tests run headless. |
| `CI` | [`playwright.config.js`](/d:/Internal%20Projects%20Automation/playwright.config.js) | Enables one retry when present in CI environments. |

### Report and debug artifacts

The suite is configured to generate:

- HTML reports
- Failure screenshots
- Failure videos
- First-retry traces

Generated output folders such as `playwright-report/` and `test-results/` are runtime artifacts, not source files.

## Contributing Guidelines

This repository does not currently include a dedicated contributing policy, but the code structure suggests the following workflow:

1. Add or update page behavior in `pages/` first.
2. Reuse fixtures from [`fixtures/baseFixture.js`](/d:/Internal%20Projects%20Automation/fixtures/baseFixture.js) when a page object already exists.
3. Keep test assertions in `tests/` focused on user-visible behavior and link health.
4. Put reusable generated data or helpers in `utils/` instead of duplicating logic across specs.
5. Run the affected spec locally before opening a pull request.
6. Be cautious with the live submission test in [`tests/PostJob.spec.js`](/d:/Internal%20Projects%20Automation/tests/PostJob.spec.js), because it targets the production base URL.
7. If you add a new page object, consider exposing it through the shared fixture so other tests can consume it consistently.

## CI Workflow

GitHub Actions is already configured in [`playwright.yml`](/d:/Internal%20Projects%20Automation/.github/workflows/playwright.yml).

On every push or pull request to `main` or `master`, the workflow:

1. Checks out the repository
2. Sets up Node using the latest LTS line
3. Runs `npm ci`
4. Installs Playwright browsers with dependencies
5. Runs `npx playwright test`
6. Uploads the generated HTML report as an artifact when the workflow is not cancelled

## Notes for Maintainers

- There is currently no project-level README other than this file.
- There are no npm scripts in `package.json`, so developer ergonomics can be improved by adding scripts such as `test`, `test:headed`, and `report`.
- The FAQ page object exists but is not currently exercised by any spec file.

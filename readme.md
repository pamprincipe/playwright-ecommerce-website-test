# Playwright Automation Tests

Automated end-to-end tests for the saucedemo website using Playwright.  
This project validates core functionalities like login, adding items to cart, and logout.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Test Scenarios](#test-scenarios)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

1. Clone the repository:

````bash
git clone https://github.com/pamprincipe/playwright-ecommerce-website-test.git
```

2. Navigate into the project folder:

```bash
cd e2e/example.test.ts
```

3. Install dependencies:

```bash
npm install
```

4. Install Playwright browsers:

```bash
npx playwright install
```

## Usage

1. Run all tests:

```bash
npx playwright test
```

2. Run a specific test file:

```bash
npx playwright test e2e/login.test.ts
```

3. Generate a test report:

```bash
npx playwright show-report
```

## Test Scenarios

The automated tests cover the following scenarios:

1. **Login Functionality**
   - Verify login with valid credentials.
   - Verify login fails with invalid credentials.

2. **Shopping Cart**
   - Add items to the cart.
   - Verify cart updates correctly.

3. **Logout Functionality**
   - Verify user can logout successfully.

4. **Input Field Validation**
   - Check that required input fields are empty by default.
````

# Playwright API Testing Framework (JavaScript)

An **API automation framework** built with **Playwright Test** in JavaScript.  
It uses a layered design (**UseApi → UseApiSteps → Tests**), pretty-colored **console logging**, and **Allure reports**.

---

## 🚀 Features

- **Playwright Test** with APIRequestContext
- **UseApi** low-level CRUD + **UseApiSteps** high-level flows
- **Colorized logger** (single combined log per test + Allure attachment)
- **Allure reporting**
- **ESLint** for code quality
- **GitHub Actions** CI workflow (optional Pages publish for Allure)

---

## 📂 Project Structure

```
playwright-api-js-crud/
├── .github/
│   └── workflows/
│       └── ci-js.yml              # GitHub Actions workflow
├── src/
│   ├── api/
│   │   └── useApi.js              # CRUD methods (GET/POST/PUT/PATCH/DELETE) + logging
│   ├── steps/
│   │   └── useApiSteps.js         # Business flows using UseApi
│   ├── fixtures/
│   │   └── steps.fixtures.js      # Injects { logger, api, steps } into tests
│   ├── utils/
│   │   ├── logger.js              # Pretty console + combined log file
│   │   └── httpRequest.js         # Thin HTTP wrapper over Playwright request (Allure attachments)
│   └── paths/
│       └── workPath.js            # Endpoint definitions (ReqRes)
├── tests/
│   ├── smoke/
│   │   ├── authRegister.spec.js
│   │   └── authLogin.spec.js
│   ├── user/
│   │   └── usersFlow.spec.js
│   └── resources/
│       └── resources.spec.js
├── allure-results/                # (generated) raw allure results
├── allure-report/                 # (generated) HTML allure report
├── package.json
├── playwright.config.js
└── README.md
```

---

## 🔧 Requirements

- Node.js **18+** (recommended 20)
- (Optional) Allure CLI to open reports locally  
  - macOS: `brew install allure`  
  - Windows (Scoop): `scoop install allure`

---

## ⚙️ Install

```bash
npm install
```

---

## ▶️ Run Tests

All tests:
```bash
npm test
```

Only smoke:
```bash
npm run test:smoke
```

Only resources:
```bash
npm run test:resources
```

Only user flow:
```bash
npm run test:user
```

Open Allure report:
```bash
npm run allure:report
```

---

## 🧪 Environment Variables

| Variable         | Default         | Purpose                              |
|------------------|-----------------|--------------------------------------|
| `BASE_URL`       | `https://reqres.in` | API host                          |
| `ACCEPT_LANGUAGE`| `en-US`         | Default header                       |
| `API_TOKEN`      | `reqres-free-v1`| Adds `x-api-key: ...`     |
| `RETRY_MAX`      | `2`             | Retry count for retryable statuses   |
| `LOG_LEVEL`      | `info`          | `debug` \| `info` \| `warn` \| `error` |

Example:
```bash
BASE_URL=https://reqres.in LOG_LEVEL=debug npm test
```

---

## 🧭 CI (GitHub Actions)

Workflow at `.github/workflows/ci-js.yml`:

- Installs Node + Playwright
- Runs `npm test`
- Uploads `allure-results` artifact
- (Optional) Publishes Allure HTML to **GitHub Pages**

---

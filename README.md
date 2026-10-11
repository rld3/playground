# Earnings Desk

A PayPal-focused institutional equity sales preparation prototype. Choose a growth, value, or long/short client lens, import public earnings text, inspect exact evidence passages, and export a source-linked conversation draft.

## Run

Requires Node.js 20 or newer. From `/workspace/playground`:

```sh
npm ci --cache /tmp/npm-cache
npm start
```

The server listens on port 3000; override with `PORT`. There are no production package dependencies, API keys, or build steps. Nothing is deployed automatically.

## Test

```sh
npm test
```

Browser tests use `/usr/bin/chromium` via Playwright. On another machine, install Chromium or adjust `playwright.config.js` to use your installed browser. Tests cover client lenses, evidence import, exact excerpts, source-linked export, unsafe URL rejection, and mobile layout. Synthetic values exist only in tests and are explicitly labeled.

## Demo flow

1. Explore the three client lenses. Editorial questions and hypotheses change with the selected style.
2. Choose **New brief**. Enter the reporting period, document title, public HTTPS URL, and source text; or load a UTF-8 `.txt` file. Confirm usage rights.
3. Inspect the imported document in **Evidence**. The app finds relevant numeric passages for revenue, transaction economics, payment volume, and earnings per share.
4. Return to **The brief**, open a passage citation, and inspect the exact imported text and original document URL.
5. Export a plain-text draft including the client lens, evidence passages, research agenda, risks, questions, source URLs, and verification limitations.

Imported documents are held in page memory and cleared on refresh. This prototype supports one PayPal period per page session. Multiple documents for that period can be added. No text is sent to a model or backend.

## Scope and remaining work

This is an interaction and evidence-workflow prototype, not a completed current-earnings example. As of the build, the environment proxy returns 403 for PayPal investor/newsroom and SEC sites. No latest quarter or current financial data is asserted. The environment draft includes the required network destinations; saving the draft does not activate access.

The extraction is deterministic passage matching, not AI synthesis. Source URLs are linked but not fetched or verified. Numeric deltas, statement reconciliation, current-quarter verification, document-derived catalysts/risks, PDF parsing, and live AI generation are not implemented. Editorial conversation framing is clearly separated from reported facts. No consensus beat/miss is inferred.

To finish the requested example, restore public-source network access or supply the latest official PayPal earnings release and filing, then populate a dated, verified brief. A subsequent AI integration should require claim-level citations, explicit comparison periods and accounting bases, abstention on unsupported claims, and checks against the original documents.

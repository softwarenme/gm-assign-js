### Implementation details

Implmeneted the `./js/gumroad.js` to scan the Gumroad links and process it as mentioned in the problem statement.

A user just need to include the single JS file webpage. For the test purpose, the JS file is included in the `index.html` for the test. It has multiple links along with Gumroad links.

### How to test the changes?

Run following command from the repository root folder.

```
python3 -m http.server 1234
```

The `index.html` will be served at `localhost:1234`

### What to check?

On the sample HMTL page, the Gumroad link is scanned and opens in the popup. And Gumroad button link is scanned and turned into a button.

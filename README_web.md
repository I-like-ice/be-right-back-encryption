# Caesar Cipher Web Demo

This is a simple static website that demonstrates a multi-level Caesar cipher.

Features
- Login with username & password to access the site (demo credentials stored client-side).
- Three levels of encryption:
  - Level 1: single Caesar shift (one key)
  - Level 2: double Caesar (two keys) — requires an extra level password
  - Level 3: triple Caesar (three keys) — requires an extra level password

Demo credentials (change inside `script.js` if you want different values):
- Username: `user`
- Password: `pass123`
- Level 2 password: `level2pass`
- Level 3 password: `level3pass`

Run locally (recommended via a local server):

```powershell
cd "C:\Users\samar\OneDrive\Documents\Pyhton files VS\ceaser_cipher"
python -m http.server 8000
# then open http://localhost:8000/index.html
```

Security note: This is a client-side demo only. Credentials and passwords are stored in the page JS and are not secure. Do not publish this to a public server without proper server-side authentication and secure storage.

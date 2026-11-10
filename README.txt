NEXADATA GH - PROJECT PACKAGE

Files included:
- index.html: website home page
- style.css: not currently separate; styling is included in index.html
- script.js: front-end interactions
- login.html: login/register page preview
- firebase.js: Firebase app, Authentication and Firestore initialization
- admin-dashboard.html: static admin dashboard preview

IMPORTANT
1. Open this folder in your code editor.
2. Keep all files in the same folder.
3. firebase.js uses JavaScript modules. Pages that import it must use <script type="module">.
4. Login/register and dashboard are not yet fully connected to Firebase.
5. Do not put supplier API tokens, payment secret keys, or service-account keys in browser files.
6. Do not accept or deliver paid orders until payment verification and supplier API calls run through a secure backend.

Next development step: connect login.html to Firebase Authentication and create customer records in Firestore.

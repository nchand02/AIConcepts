# 🚀 Quick Deployment Checklist

Use this checklist to deploy your AI Tutorial website to GitHub Pages.

---

## Pre-Deployment ✅

- [x] Build succeeds without errors
- [x] All pages render correctly in preview
- [x] Code blocks display properly
- [x] Mermaid diagrams work
- [x] Dark mode toggle functions

---

## Deployment Steps

### Step 1: Initialize Git Repository

```bash
cd /Users/navdeepsinghchander/ws-IntelliJ/AI_Tutorial_For_Everyone
git init
```

**Expected output:** `Initialized empty Git repository`

---

### Step 2: Create .gitignore (if needed)

The project should already have proper .gitignore, but verify it includes:
```
node_modules/
dist/
.DS_Store
```

---

### Step 3: Initial Commit

```bash
git add .
git commit -m "Initial commit: Complete AI Tutorial website with 5 chapters"
```

**Expected output:** `6 files changed...`

---

### Step 4: Create GitHub Repository

1. Go to https://github.com/new
2. **Repository name:** `AI_Tutorial_For_Everyone`
3. **Description:** "Comprehensive AI tutorial covering foundations to LLMs"
4. **Visibility:** Public
5. **DO NOT** initialize with README, .gitignore, or license (already exists)
6. Click **"Create repository"**

---

### Step 5: Link and Push to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/AI_Tutorial_For_Everyone.git
git branch -M main
git push -u origin main
```

**Expected output:** 
```
Enumerating objects...
Writing objects: 100%...
```

---

### Step 6: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select: **"GitHub Actions"**
5. Save (if prompted)

---

### Step 7: Trigger Deployment

The GitHub Actions workflow will automatically trigger on your first push to `main`. 

To monitor:
1. Go to **Actions** tab in your repository
2. Watch the **"Deploy to GitHub Pages"** workflow
3. Should complete in 2-3 minutes

---

### Step 8: Verify Deployment

Once Actions shows ✅ green checkmark:

**Your site will be live at:**
```
https://YOUR_USERNAME.github.io/AI_Tutorial_For_Everyone
```

---

## Troubleshooting

### Build Fails on GitHub Actions

**Check:**
- Node version compatibility (should be 18+)
- Look at Actions logs for specific error
- Verify all dependencies are in `package.json`

**Fix:**
```bash
# Update dependencies
npm update
npm run build  # test locally first
git add package-lock.json
git commit -m "Update dependencies"
git push
```

---

### 404 Page Not Found

**Possible causes:**
1. Base path incorrect in `astro.config.mjs`
2. GitHub Pages not enabled
3. Deployment still in progress

**Fix:**
- Verify base path matches repository name exactly
- Wait a few more minutes for deployment
- Check Actions tab for deployment status

---

### Mermaid Diagrams Not Rendering

**Check:** Browser console for JavaScript errors

**Fix:** Verify the Mermaid CDN script is loading:
```html
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true });
</script>
```

This is already in `BaseLayout.astro` ✅

---

### Styles Not Loading

**Check:** Browser DevTools → Network tab

**Fix:** Ensure CSS file path is correct:
- Should be `/AI_Tutorial_For_Everyone/styles/global.css`
- Check `astro.config.mjs` base path

---

## Post-Deployment Tasks

### Immediate
- [ ] Visit your live site
- [ ] Test all chapter links
- [ ] Toggle dark/light mode
- [ ] Check on mobile device

### Next Steps
1. **Share the link** with others for feedback
2. **Add more content** to chapters 6-15
3. **Monitor GitHub Issues** for bug reports
4. **Update regularly** by pushing to main branch

---

## Making Updates

After deployment, any changes pushed to `main` will automatically rebuild and deploy:

```bash
# 1. Make your changes to files

# 2. Commit and push
git add .
git commit -m "Add chapter 6 content"
git push

# 3. Wait 2-3 minutes
# Changes will be live automatically
```

---

## Custom Domain (Optional)

To use a custom domain like `aitutorial.com`:

1. Buy domain from registrar
2. Add `CNAME` file to `public/` folder:
   ```
   aitutorial.com
   ```
3. Configure DNS records at your registrar:
   ```
   Type: CNAME
   Name: @
   Value: YOUR_USERNAME.github.io
   ```
4. In GitHub repo → Settings → Pages → Custom domain
5. Enter your domain and save

---

## Resources

- **Astro Docs:** https://docs.astro.build
- **GitHub Pages Docs:** https://docs.github.com/pages
- **Mermaid Docs:** https://mermaid.js.org

---

## Support

If you encounter issues:
1. Check `TEST_REPORT.md` for known issues
2. Review `README.md` for detailed instructions
3. Check GitHub Actions logs
4. Verify in local preview first: `npm run preview`

---

**Your site is ready to go live! 🎉**

**Estimated deployment time:** 5 minutes from git init to live site

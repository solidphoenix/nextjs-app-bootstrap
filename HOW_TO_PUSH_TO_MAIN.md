# How to Push Code to Main Branch

## Quick Answer

To push your code to the main branch on GitHub, follow these steps:

```bash
# Step 1: Make sure you're in the repository directory
cd /home/runner/work/nextjs-app-bootstrap/nextjs-app-bootstrap

# Step 2: Create/checkout main branch from the remote
git checkout -b main origin/main

# Step 3: Merge your feature branch into main
git merge copilot/build-multilingual-survey-site --no-ff -m "Merge survey application to main"

# Step 4: Push to GitHub
git push origin main
```

---

## Detailed Step-by-Step Guide

### Understanding the Situation

You currently have:
- ✅ **Feature Branch**: `copilot/build-multilingual-survey-site` with all the survey code
- ✅ **Remote Main Branch**: `origin/main` exists on GitHub
- ⏳ **Local Main Branch**: Needs to be created/updated

### Step 1: Navigate to Repository

```bash
cd /home/runner/work/nextjs-app-bootstrap/nextjs-app-bootstrap
```

**What this does**: Changes to your repository directory

### Step 2: Check Current Branch

```bash
git branch
```

**What this does**: Shows you which branch you're on (should show `copilot/build-multilingual-survey-site`)

### Step 3: Create/Checkout Main Branch

```bash
git checkout -b main origin/main
```

**What this does**: 
- Creates a local `main` branch
- Sets it to track `origin/main` (GitHub's main branch)
- Switches you to the main branch

**Alternative** (if main already exists locally):
```bash
git checkout main
git pull origin main
```

### Step 4: Merge Feature Branch into Main

```bash
git merge copilot/build-multilingual-survey-site --no-ff -m "Merge survey application to main"
```

**What this does**:
- Merges all your survey application code from the feature branch into main
- `--no-ff` creates a merge commit (keeps history clean)
- `-m "..."` adds a commit message

**If you see conflicts**:
```bash
# View conflicted files
git status

# Resolve conflicts in the files, then:
git add .
git commit -m "Merge survey application to main"
```

### Step 5: Push to GitHub

```bash
git push origin main
```

**What this does**:
- Pushes your local main branch to GitHub's main branch
- Makes your code visible on GitHub
- Triggers GitHub Actions deployment workflow

---

## Alternative: Simple One-Command Approach

If you want to skip the merge and just push the feature branch to main:

```bash
# Push feature branch directly to main on remote
git push origin copilot/build-multilingual-survey-site:main
```

**What this does**: 
- Pushes your feature branch to the main branch on GitHub
- Skips creating a local main branch

---

## After Pushing

### What Happens Next?

1. **GitHub Actions Triggers**: The deployment workflow starts automatically
2. **Build Process**: Takes about 60 seconds
3. **Deployment**: Takes about 30 seconds
4. **Site Live**: Your site will be at `https://solidphoenix.github.io/nextjs-app-bootstrap/`

### Verify the Push

Check on GitHub:
```
https://github.com/solidphoenix/nextjs-app-bootstrap
```

You should see:
- ✅ Main branch updated with your code
- ✅ All files visible (src/, .github/, etc.)
- ✅ GitHub Actions workflow running

### Monitor Deployment

Check the workflow:
```
https://github.com/solidphoenix/nextjs-app-bootstrap/actions
```

Look for:
- Workflow: "Deploy to GitHub Pages"
- Status: 🟡 Running → ✅ Complete

---

## Troubleshooting

### Error: "Permission denied"

**Problem**: You don't have push access
**Solution**: Make sure you're authenticated with GitHub

### Error: "Updates were rejected"

**Problem**: Remote has changes you don't have locally
**Solution**: 
```bash
git pull origin main --rebase
git push origin main
```

### Error: "Merge conflicts"

**Problem**: Files conflict between branches
**Solution**:
1. View conflicts: `git status`
2. Edit conflicted files
3. Mark as resolved: `git add <file>`
4. Complete merge: `git commit`
5. Push: `git push origin main`

### Error: "fatal: refusing to merge unrelated histories"

**Problem**: Branches have no common ancestor
**Solution**:
```bash
git merge copilot/build-multilingual-survey-site --allow-unrelated-histories -m "Merge survey application to main"
```

---

## Verification Commands

After pushing, verify everything worked:

```bash
# Check GitHub's main branch
git ls-remote origin main

# Check your local branch
git branch -vv

# View recent commits
git log --oneline -5
```

---

## Quick Reference

| Command | What it does |
|---------|--------------|
| `git checkout main` | Switch to main branch |
| `git pull origin main` | Get latest from GitHub |
| `git merge <branch>` | Merge another branch into current |
| `git push origin main` | Push main branch to GitHub |
| `git status` | Check current state |
| `git branch` | List branches |

---

## Summary

**Simplest approach**:
```bash
git push origin copilot/build-multilingual-survey-site:main
```

**Recommended approach**:
```bash
git checkout -b main origin/main
git merge copilot/build-multilingual-survey-site --no-ff -m "Merge survey application"
git push origin main
```

**Result**: Your survey application will be live at `https://solidphoenix.github.io/nextjs-app-bootstrap/` in about 2 minutes!

---

## Need Help?

If you encounter any issues:
1. Check `git status` to see current state
2. Check `git branch` to see which branch you're on
3. Check `git log --oneline -3` to see recent commits
4. Check GitHub Actions for deployment errors

**The key command you asked about**: `git push origin main` will push the main branch to GitHub, but you need to be on the main branch with your code in it first!

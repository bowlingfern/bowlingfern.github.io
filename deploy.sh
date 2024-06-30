#!/bin/bash
echo -e "Deploying updates..."

if [[ -n $(git status -s) ]]; then
    git add .
    git commit -m "Auto-commit $(date)"
    git pull origin main
    git push origin main

    echo -e "Deployed successfully!"
else
    echo "No changes to commit. Deployment skipped."
fi

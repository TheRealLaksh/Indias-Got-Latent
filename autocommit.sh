#!/bin/bash

while true
do
    # Check if there are changes
    if [[ -n $(git status --porcelain) ]]; then
        
        # Generate AI commit message using Copilot
        msg=$(gh copilot suggest -t "git commit message" 2>/dev/null | head -n 1)

        # Fallback if Copilot fails
        if [[ -z "$msg" ]]; then
            msg="Auto: update $(date '+%Y-%m-%d %H:%M:%S')"
        fi

        git add .
        git commit -m "$msg"
    fi

    sleep 600
done

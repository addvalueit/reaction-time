#!/bin/bash

# Check if CODESPACE_NAME is set
if [ -z "$CODESPACE_NAME" ]; then
  echo "Error: CODESPACE_NAME environment variable is not set."
  exit 1
fi

# Define the files to be modified
FILES=("frontend/reaction-time/src/environments/environment.development.ts")  # Replace with actual file names

# Loop through each file and perform the replacement
for FILE in "${FILES[@]}"; 
do
  if [ -f "$FILE" ]; then
    sed -i "s|http://localhost:4566|https://$CODESPACE_NAME-4566.app.github.dev|g" "$FILE"
    echo "Updated $FILE"
  else
    echo "Warning: $FILE not found."
  fi
done

echo "Replacement complete."

#!/bin/bash

# AenzbiStudio Build and Publish Script

# Exit immediately if a command exits with a non-zero status
set -e

# Function to display script usage
usage() {
    echo "Usage: $0 [-v version] [-m \"commit message\"]"
    echo "  -v: Specify the version number for the release"
    echo "  -m: Specify the commit message"
    exit 1
}

# Parse command line options
while getopts ":v:m:" opt; do
    case $opt in
        v) VERSION="$OPTARG"
        ;;
        m) COMMIT_MESSAGE="$OPTARG"
        ;;
        \?) echo "Invalid option -$OPTARG" >&2
        usage
        ;;
    esac
done

# Check if version and commit message are provided
if [ -z "$VERSION" ] || [ -z "$COMMIT_MESSAGE" ]; then
    usage
fi

# Update version in package.json
npm version $VERSION --no-git-tag-version

# Install dependencies
echo "Installing dependencies..."
npm install

# Run tests
echo "Running tests..."
npm test

# Build the project
echo "Building the project..."
npm run build

# Commit changes
git add .
git commit -m "$COMMIT_MESSAGE"

# Create a new tag
git tag -a v$VERSION -m "Version $VERSION"

# Push changes and tags to remote repository
git push origin main
git push origin v$VERSION

# Publish to npm
echo "Publishing to npm..."
npm publish

# Build Electron app for different platforms
echo "Building Electron apps..."
npm run electron:build:win
npm run electron:build:mac
npm run electron:build:linux

# Create GitHub release
echo "Creating GitHub release..."
gh release create v$VERSION --title "Version $VERSION" --notes "$COMMIT_MESSAGE"

# Upload Electron builds to GitHub release
gh release upload v$VERSION dist/AenzbiStudio-$VERSION.exe
gh release upload v$VERSION dist/AenzbiStudio-$VERSION.dmg
gh release upload v$VERSION dist/AenzbiStudio-$VERSION.AppImage

echo "Build and publish process completed successfully!"

#!/usr/bin/env bash
# Upload musical-cubes samples to R2 bucket.
# Usage: R2_ACCOUNT_ID=... R2_ACCESS_KEY_ID=... R2_SECRET_ACCESS_KEY=... ./scripts/uploadToR2.sh
set -euo pipefail

: "${R2_ACCOUNT_ID:?R2_ACCOUNT_ID required}"
: "${R2_ACCESS_KEY_ID:?R2_ACCESS_KEY_ID required}"
: "${R2_SECRET_ACCESS_KEY:?R2_SECRET_ACCESS_KEY required}"
: "${R2_BUCKET_NAME:=musical-cubes}"

SOUNDS_DIR="public/assets/sounds/musicalCube"
ENDPOINT="https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com"

export AWS_ACCESS_KEY_ID="$R2_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="$R2_SECRET_ACCESS_KEY"
export AWS_REGION=auto

echo "Uploading ${SOUNDS_DIR} -> s3://${R2_BUCKET_NAME}/sounds/"
aws s3 sync "$SOUNDS_DIR" "s3://${R2_BUCKET_NAME}/sounds/" \
  --endpoint-url "$ENDPOINT" \
  --exclude ".DS_Store" \
  --no-progress

echo "---"
echo "Uploaded $(find "$SOUNDS_DIR" -type f ! -name '.DS_Store' | wc -l | tr -d ' ') files"
echo "Listing remote objects:"
aws s3 ls "s3://${R2_BUCKET_NAME}/sounds/" --endpoint-url "$ENDPOINT" --recursive --summarize | tail -5
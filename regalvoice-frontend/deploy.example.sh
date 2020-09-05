#!/bin/sh
aws s3 sync dist s3://<bucket_name> --delete --profile <profile_name>
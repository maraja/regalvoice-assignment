#!/bin/sh
deployment_dir=/opt/regalvoice/regalvoice-backend
if [ -d "$deployment_dir" ] && [ -x "$deployment_dir" ]; then
  cd /opt/regalvoice/regalvoice-backend

  # we have to do this because it throws an error if it can't find the process... and then the whole build breaks
  pm2 stop regalvoice-backend || true
fi

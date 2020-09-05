#!/bin/sh
deployment_dir=/opt/regalvoice/regalvoice-backend
if [ -d "$deployment_dir" ] && [ -x "$deployment_dir" ]; then
  cd /opt/regalvoice/regalvoice-backend

  rm -rf *
fi
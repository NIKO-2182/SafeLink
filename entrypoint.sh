#!/bin/sh
# Start Python backend from /app inside container
python Prediction_model.py &

# Start Nginx in foreground
exec nginx -g 'daemon off;'

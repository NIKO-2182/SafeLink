FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

WORKDIR /app

RUN DEBIAN_FRONTEND=noninteractive apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements from app folder and install dependencies
COPY app/Requirements.txt ./
RUN pip install --no-cache-dir -r Requirements.txt

# Copy all python files from app/ directory into /app
COPY . .


EXPOSE 6007

CMD ["python", "main.py"]
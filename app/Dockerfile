FROM python:3.11-slim
WORKDIR /app


RUN DEBIAN_FRONTEND=noninteractive apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY Requirements.txt ./
RUN pip install --no-cache-dir -r Requirements.txt

COPY . .

EXPOSE 6007

CMD [ "python", "Prediciton_model.py" ]
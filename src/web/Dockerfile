FROM python:3.9-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /home/appuser

COPY --chown=appuser:appgroup . .

RUN pip install -r requirements.txt

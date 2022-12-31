FROM python:3.10.0-alpine

RUN apk add bash py3-virtualenv sed

RUN mkdir -p /app/
WORKDIR /app/
COPY . /app
WORKDIR /app/
RUN rm -rf .venv
RUN pip install --no-cache-dir -r requirements.txt

RUN sed -i "s|from collections import Mapping|from collections.abc import Mapping |g" /usr/local/lib/python3.10/site-packages/markupsafe/__init__.py

CMD ["python3", "app.py", "--host=127.0.0.1"]

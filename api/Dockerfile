FROM tiangolo/uwsgi-nginx:python3.8
WORKDIR /usr/app
COPY requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt
COPY . .
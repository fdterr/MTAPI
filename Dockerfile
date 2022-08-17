FROM nikolaik/python-nodejs:python3.9-nodejs18

MAINTAINER Rick Terry

# RUN curl https://pyenv.run | bash
# RUN echo 'export PATH="$HOME/.pyenv/bin:$PATH" eval "$(pyenv init -)" eval "$(pyenv virtualenv-init -) > ~/.bash_profile'
# RUN exec "$SHELL"
# RUN pyenv install 3.8.9
# RUN pyenv global 3.8.9

RUN mkdir -p /app/python
WORKDIR /app/python
COPY python .
RUN python3 -m venv .venv 
RUN .venv/bin/pip install -r requirements.txt


RUN mkdir -p /app/node
WORKDIR /app/node
COPY node .
RUN npm install

WORKDIR /app
COPY autostart.sh .


CMD ["/bin/bash", "autostart.sh"]

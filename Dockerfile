# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.12-slim

# Warning: A port below 1024 has been exposed. This requires the image to run as a root user which is not a best practice.
# For more information, please refer to https://aka.ms/vscode-docker-python-user-rights`
EXPOSE 80
# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1
# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Install pip requirements
COPY requirements.txt .
RUN python -m pip install --no-cache-dir -r requirements.txt

WORKDIR /app
COPY src/ /app/src/
COPY startup.sh /app/
RUN chmod +x startup.sh

# Create the non-root user
ARG USERNAME=appuser
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupadd --gid ${USER_GID} $USERNAME \
    && useradd --uid ${USER_UID} --gid ${USER_GID} -m $USERNAME
USER ${USERNAME}
# Create non-root user
#RUN adduser -u 5678 --disable-password --gecos "" appuser && chown -R appuser /app
#USER appuser

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
CMD ["./startup.sh"]

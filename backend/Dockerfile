# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set environment variables
# 1. Prevents python from writing .pyc files to disc
# 2. Prevents python from buffering stdout and stderr
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies if needed (e.g., for postgresql-client)
# RUN apt-get update && apt-get install -y postgresql-client

# Install Python dependencies
# Upgrade pip and install gunicorn for the server
RUN pip install --upgrade pip
RUN pip install gunicorn

# Copy the requirements file into the container at /app
# IMPORTANT: You need to create a requirements.txt file in your 'backend' directory.
# Run 'pip freeze > requirements.txt' in your local virtual environment to create it.
# Make sure 'django' and 'gunicorn' are in this file.
COPY requirements.txt .

# Install the dependencies from the requirements file
RUN pip install -r requirements.txt

# Copy the rest of the backend application code into the container at /app
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Run the application
# The command starts Gunicorn, binding it to all network interfaces on port 8000.
# It specifies 4 worker processes.
# 'backend.wsgi:application' points Gunicorn to your project's WSGI file.
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4"]

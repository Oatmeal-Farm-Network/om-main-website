.PHONY: help build build-dev run run-dev stop clean install test

# Default target
help: ## Show this help message
	@echo "Available commands:"
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

# Development commands
install: ## Install npm dependencies
	npm install

dev: ## Start development server
	npm start

test: ## Run tests
	npm test

build-local: ## Build for production locally
	npm run build

# Docker commands
build: ## Build production Docker image
	docker build -t dashboard-react .

build-dev: ## Build development Docker image
	docker build -f Dockerfile.dev -t dashboard-react-dev .

run: ## Run production Docker container on port 3000
	docker run -d -p 3000:80 --name dashboard-react-app dashboard-react

run-dev: ## Run development Docker container with hot reload on port 3001
	docker run -d -p 3001:3000 -v $(PWD):/app -v /app/node_modules --name dashboard-react-dev dashboard-react-dev

# Docker Compose commands
up: ## Start production service with docker-compose
	docker-compose up -d dashboard-app

up-dev: ## Start development service with docker-compose
	docker-compose --profile dev up -d dashboard-dev

down: ## Stop and remove docker-compose services
	docker-compose down

# Cleanup commands
stop: ## Stop and remove Docker containers
	-docker stop dashboard-react-app dashboard-react-dev
	-docker rm dashboard-react-app dashboard-react-dev

clean: ## Remove Docker images and containers
	make stop
	-docker rmi dashboard-react dashboard-react-dev
	docker system prune -f

logs: ## Show Docker container logs
	docker logs dashboard-react-app

logs-dev: ## Show development Docker container logs
	docker logs dashboard-react-dev

# Combined commands
docker-dev: build-dev run-dev ## Build and run development Docker container
	@echo "Development server running at http://localhost:3001"

docker-prod: build run ## Build and run production Docker container
	@echo "Production server running at http://localhost:3000" 
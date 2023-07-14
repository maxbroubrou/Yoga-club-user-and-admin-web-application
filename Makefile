run:
	make backend & make frontend

install:
	bash -c "cd src/backend && npm install"
	bash -c "cd src/frontend && npm install"

backend:
	bash -c "cd src/backend && npm run start"

frontend:
	bash -c "cd src/frontend && npm run serve"

build-frontend:
	bash -c "cd src/frontend && docker build . -t broubrou/yoga-club-app-frontend"

build-backend:
	bash -c "cd src/backend && docker build . -t broubrou/yoga-club-app-backend"

build:
	bash -c "make build-frontend & make build-backend"

launch:
	docker-compose up

launch-frontend:
	docker run -d -p 8080:80 broubrou/yoga-club-app-frontend

launch-backend:
	docker run -d -p 3000:3000 broubrou/yoga-club-app-backend
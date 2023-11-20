# Makefile - Only for local development

BACKEND_CONTAINER=web_backend
TARGET=$(target)
# make start
#             Start containers 
# 
# make build_p
#             Build and start containers 
# 
# make log
#             Display logs 
# 
# make log <CONTAINER>
#             Display logs for specific <CONTAINER>
# 
# make stop
#             Stop all containers
# 
# make backend-format
# 			  Format python code with isort and black
# 

start: 
	@docker compose -f ./docker.local/docker-compose.yml up -d

build_p: 
	@docker compose -f ./docker.local/docker-compose.yml up -d --build

logs:
	@docker compose -f ./docker.local/docker-compose.yml logs -f $(TARGET)

stop:
	@docker compose -f ./docker.local/docker-compose.yml stop

backend-format:
	@poetry run isort . && poetry run black *.py

migrations:
	@docker exec $(BACKEND_CONTAINER) python manage.py makemigrations
	@docker exec $(BACKEND_CONTAINER) python manage.py migrate

shell:
	@docker exec -it $(BACKEND_CONTAINER) python manage.py shell

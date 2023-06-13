# Makefile

BACKEND_CONTAINER=web_backend
TARGET=$(target)
# make start
#             Start containers 
# 
# make build
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
	@docker compose up -d 

build_p: 
	@docker compose up -d --build

logs:
	@docker compose logs -f $(TARGET)

stop:
	@docker compose stop

backend-format:
	@poetry run isort . && poetry run black *.py

makemigrations:
	@docker exec $(BACKEND_CONTAINER) python manage.py makemigrations

migrate:
	@docker exec $(BACKEND_CONTAINER) python manage.py migrate

shell:
	@docker exec -it $(BACKEND_CONTAINER) python manage.py shell

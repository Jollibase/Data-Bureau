# Makefile

# make start
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
	@docker compose up -d --build

log:
	@docker logs -f

stop:
	@docker compose stop

backend-format:
	@poetry run isort . && poetry run black *.py

echo "--1/6-- Pulling changes..."
git pull origin review

echo "--2/6-- Taging last image to old..."
docker tag apollo-panel:latest apollo-panel:old  >/dev/null | true 

echo "--3/6-- Building new image..."
docker build . -t apollo-panel:latest

echo "--4/6-- Replacing running container..."
docker stop frontend-apollo >/dev/null | true
docker rm frontend-apollo >/dev/null | true

echo "--5/6-- Deleting old image..."
docker rmi apollo-panel:old >/dev/null | true

echo "--6/6-- Running new image..."
docker compose down -v    # remove containers + volumes
docker compose up --build -d

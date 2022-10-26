gcloud container clusters create orimtest --cluster-version=1.23 \
  --tags=game-server \
  --scopes=gke-default \
  --num-nodes=1 \
  --no-enable-autoupgrade \
  --machine-type=e2-standard-4 --region=europe-west4
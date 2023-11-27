# Authenticate with Google Cloud
gcloud auth login

# Ensure that the Google Cloud SDK is up to date
gcloud components install gke-gcloud-auth-plugin

# Set project ID
PROJECT_ID=$1

# Check if project ID is set
if [ -z "$PROJECT_ID" ]; then
    echo "Error: PROJECT_ID is not set. Please provide the project id as the first argument to this script"
    exit 1
fi

gcloud config set project $PROJECT_ID

# Set region (default: europe-west4)
REGION=${2:-europe-west4}
ZONE=${REGION}-a
# Set cluster name (default: orimboard-test-cluster)
CLUSTER_NAME=${2:-orimboard-test-cluster}

# Enable required APIs
gcloud services enable container.googleapis.com

# Create firewall rule to allow game server traffic
gcloud compute firewall-rules create game-server-firewall \
    --allow tcp:7000-8000 \
    --target-tags game-server \
    --description "firewall to allow game server tcp traffic"

# Create a GKE cluster
gcloud container clusters create $CLUSTER_NAME \
  --zone $ZONE \
  --project $PROJECT_ID \
  --release-channel regular \
  --tags game-server \
  --scopes gke-default \
  --num-nodes 2 \
  --enable-image-streaming \
  --machine-type c3-highcpu-4

# Create a node pool for the Agones system
gcloud container node-pools create agones-system \
  --cluster $CLUSTER_NAME \
  --zone $ZONE \
  --project $PROJECT_ID \
  --node-taints agones.dev/agones-system=true:NoExecute \
  --node-labels agones.dev/agones-system=true \
  --num-nodes 1 \
  --machine-type e2-standard-2

# Get cluster credentials
gcloud container clusters get-credentials $CLUSTER_NAME \
    --project $PROJECT_ID \
    --region $REGION

# Verify cluster creation
kubectl get nodes

# Provision Artifact Registry
ARTIFACT_REGISTRY_NAME="orimboard-artifact-registry"
gcloud artifacts repositories create $ARTIFACT_REGISTRY_NAME \
    --repository-format docker \
    --location $REGION \
    --project $PROJECT_ID

# Configure Docker to use Artifact Registry
gcloud auth configure-docker $REGION-docker.pkg.dev
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

# Set cluster name (default: orimboard-test-cluster)
CLUSTER_NAME=${2:-orimboard-test-cluster}

# Enable required APIs
gcloud services enable container.googleapis.com

# Create a GKE Autopilot cluster
gcloud container clusters create-auto $CLUSTER_NAME \
    --region $REGION \
    --project $PROJECT_ID \
    --release-channel regular \
    --autoprovisioning-network-tags game-server

# Create firewall rule to allow game server traffic
gcloud compute firewall-rules create game-server-firewall \
    --allow udp:7000-8000 \
    --target-tags game-server \
    --description "firewall to allow game server udp traffic"

# Get cluster credentials
gcloud container clusters get-credentials $CLUSTER_NAME \
    --project $PROJECT_ID \
    --region $REGION

# Verify cluster creation
kubectl get nodes

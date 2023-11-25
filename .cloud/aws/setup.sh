# NOTE - DO NOT USE!
# this script is not tested and may not work as expected - this is here for reference only
# for more information, see https://agones.dev/site/docs/installation/creating-cluster/eks/

# Provision EKS cluster
eksctl create cluster --name my-cluster --region us-west-2

# Get the security group ID of the provisioned node pool
security_group_id=$(aws eks describe-nodegroup --cluster-name my-cluster --nodegroup-name my-nodegroup --query "nodegroup.nodeGroupStatus.nodeSecurityGroups[0]" --output text)

# Modify the security group to allow custom UDP rule
aws ec2 authorize-security-group-ingress --group-id $security_group_id --protocol udp --port 7000-8000 --cidr YOUR_SOURCE_CIDR_RANGE

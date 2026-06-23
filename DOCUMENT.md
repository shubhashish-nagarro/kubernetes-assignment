## Project Overview
The assignment requires designing, containerizing, and deploying a multi-tier Kubernetes solution consisting of:
- Express.js Service API tier
- Database tier with persistent storage
- Docker containerization
- Kubernetes deployment and networking
- Ingress-based external exposure
- HPA-based autoscaling
- Resource optimization and FinOps practices

## GitHub Repository:
https://github.com/shubhashish-nagarro/kubernetes-assignment

## Docker Image:
https://hub.docker.com/repository/docker/shubhashishdas/express-assignment/general

## Architecture Design
The application follows a two-tier microservice pattern.

Client
  |
  v
Ingress Controller
  |
  v
Service API Deployment (4 replicas)
  |
  v
Internal Kubernetes Service
  |
  v
Database Deployment + Persistent Volume

The API tier communicates with the database through Kubernetes Service DNS, not pod IP addresses.

## Service API Tier Implementation
**Technology:**
- Node.js
- Express.js
- MySQL Client

**Responsibilities:**
- Exposes REST API endpoints
- Reads application configuration from ConfigMap
- Reads database password from Kubernetes Secret
- Uses database connection pooling
- Runs with health checks
- Supports rolling updates

**Deployment characteristics:**
- Replica count: 4
- External access through Ingress
- Horizontal Pod Autoscaler enabled
- CPU and memory requests/limits configured

## Database Tier Implementation
Database requirements implemented:
- Single database table
- 5-10 sample records
- Persistent storage using PersistentVolumeClaim
- Internal-only access through ClusterIP service
- Credentials stored using Kubernetes Secret
- Automatic recovery after pod deletion through Deployment/Stateful management

## Kubernetes Configuration
**Configuration management:**
- ConfigMap stores database host, port, database name and non-sensitive configuration
- Secret stores database password
- Application pods consume these values as environment variables

**Benefits:**
- Configuration changes do not require rebuilding images
- Secrets are separated from application manifests
- Environment-specific deployment is supported

## Deployment Features Demonstrated
**Rolling Updates:**
Kubernetes Deployment strategy ensures gradual replacement of pods.

**Self Healing:**
If an API or database pod fails, Kubernetes recreates it automatically.

**High Availability:**
Four API replicas provide redundancy and availability.

**Scaling:**
Horizontal Pod Autoscaler adjusts API replicas based on observed resource utilization.

## FinOps and Cost Optimization
Implemented optimizations:
1. Resource requests and limits prevent over-provisioning.
2. HPA scales API replicas based on demand instead of running unnecessary capacity.
3. Lightweight container images reduce compute and storage usage.
4. Database runs internally without unnecessary external load balancer costs.

Monitoring metrics can be used to tune CPU and memory allocations over time.

## Deployment and Verifying Steps
1. Build application image and push on docker hub account
```bash
docker build -t shubhashishdas/express-assignment:2.0 .
```

2. Push image to Docker Hub
```bash
docker push shubhashishdas/express-assignment:2.0
```

3. Create Kubernetes cluster on GKE

4. Deploy ConfigMaps, Secrets, database with persistent storage
```bash
kubectl apply -f k8s/db.yaml
```

6. Deploy API service
```bash
kubectl apply -f k8s/api.yaml
```

7. Configure hpa and Ingress
```bash
kubectl apply -f k8s/hpa.yaml
kubectl apply -f k8s/ingress.yaml
```

8. Validate scaling, recovery and rolling updates
```bash
kubectl get all
kubectl delete pod <api-pod-name>
kubectl get pods
```

## Validation Checklist
API:
✓ External endpoint available
✓ Four replicas running
✓ Rolling update supported
✓ HPA configured

Database:
✓ Persistent data
✓ Internal access only
✓ Secret-based credentials
✓ Pod recovery

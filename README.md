# Kubernetes Assignment - Multi Tier Microservice Deployment

## Overview

Create service tier that fetches data using nodejs express and mysql. Use Kubernetes and GKE platform to deploy and expose the API.

The solution contains:

- Service/API Tier (Node.js Microservice)
- Database Tier (MySQL 8.0 StatefulSet)
- Dockerized application images hosted on Docker Hub
- Kubernetes Deployment
- Ingress Exposure
- Persistent Storage
- Secrets and ConfigMaps
- HPA autoscaling

## Repository Information

**GitHub Repository**

https://github.com/shubhashish-nagarro/kubernetes-assignment

**Docker Images**
https://hub.docker.com/repository/docker/shubhashishdas/express-assignment/general

## Architecture

```
User
 |
 v
Ingress
 |
 v
API Service
 |
 v
API Pods (4 replicas)
 |
 v
Database Service
 |
 v
Database Pod + Persistent Volume
```

## Features Implemented

### API Tier

- Express.js REST API
- External access through Ingress
- Four replicas
- Rolling updates
- Self healing
- Horizontal Pod Autoscaler
- ConfigMap based configuration
- Secret based credentials

### Database Tier

- Persistent storage
- Cluster internal access only
- Sample records populated
- Automatic pod recovery
- Secret-based Password

## Kubernetes Best Practices

- Kubernetes Service discovery used
- Configuration separated from code
- Passwords stored in Secrets
- Resource requests and limits configured

## FinOps Optimization

Implemented:

1. CPU and memory limits to avoid over-allocation
2. HPA scaling to match workload demand
3. Optimized container resource usage
4. Internal database networking to reduce unnecessary exposure

## Deployment

Typical deployment flow:

```bash
kubectl apply -f k8s/db.yaml
kubectl apply -f k8s/api.yaml
kubectl apply -f k8s/hpa.yaml
kubectl apply -f k8s/ingress.yaml
```

## Testing Commands

```bash
kubectl get all
```

Verify API:

```bash
curl http://<ingress-host>/
curl http://<ingress-host>/users
curl http://<ingress-host>/health-check
```

Verify scaling:

```bash
kubectl get hpa
```

Verify recovery:

```bash
kubectl delete pod <api-pod-name>
kubectl get pods
```

## FinOps Considerations

This repository demonstrates:

- Resource Requests and Limits defined.
- Horizontal Pod Autoscaler enabled.
- Stateful workloads isolated from stateless workloads.

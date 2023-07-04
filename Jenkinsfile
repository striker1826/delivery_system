pipeline {
  agent any
  
  environment {
    AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
    AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
    AWS_DEFAULT_REGION = 'ap-northeast-1'
    ECR_REPOSITORY = 'delivery_system'
    ECR_URI = "347562501614.dkr.ecr.ap-northeast-1.amazonaws.com/${env.ECR_REPOSITORY}"
  }
  
  stages {
    stage('Build and Push Image') {
      steps {
        withAWS(region: env.AWS_DEFAULT_REGION, credentials: 'AWS_CREDIT') {
          sh 'docker-compose build'
          sh 'docker-compose push'
        }
      }
    }
  }
}

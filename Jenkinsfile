pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                // Docker Compose 빌드
                script {
                    def dockerImage = docker.build("deliverysystem", "-f docker-compose.yml .")
                }
            }
        }
        
        stage('Publish to ECR') {
            environment {
                AWS_REGION = 'ap-northeast-1'
                AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
                AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
                ECR_REPO = 'delivery_system'
            }
            
            steps {
                // Docker 이미지 태그
                script {
                    dockerImage.tag("${env.ECR_REPO}:latest")
                }
                
                // ECR에 로그인
                script {
                    docker.withRegistry('https://ap-northeast-1.amazonaws.com', 'ecr:ap-northeast-1:aws-ecr-credentials') {
                        // ECR에 이미지 푸시
                        dockerImage.push("${env.ECR_REPO}:latest")
                    }
                }
            }
        }
    }
}

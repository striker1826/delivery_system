pipeline {
    agent any 
    stages {
        stage('Build') {
            steps {
                sh 'printenv'
            }
        }
        stage('publish ECR') {
            steps {
                withEnv(["AWS_ACCESS_KEY_ID=${env.AWS_ACCESS_KEY_ID}", "AWS_SECRET_ACCESS_KEY=${env.AWS_SECRET_ACCESS_KEY}", "AWS_DEFAULT_REGION=${env.AWS_DEFAULT_REGION}"]) {
                    sh 'aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 347562501614.dkr.ecr.ap-northeast-1.amazonaws.com'
                    sh 'docker build -t delivery_system .'
                    sh 'docker tag delivery_system:latest 347562501614.dkr.ecr.ap-northeast-1.amazonaws.com/delivery_system:latest'
                    sh 'docker push 347562501614.dkr.ecr.ap-northeast-1.amazonaws.com/delivery_system:latest'
                }
            }
        }
    }
}
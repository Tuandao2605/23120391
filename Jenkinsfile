pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/Tuandao2605/23120391_23120395.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t simple-node-app .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                docker stop simple-node || true
                docker rm simple-node || true
                docker run -d -p 3000:3000 --name simple-node simple-node-app
                '''
            }
        }
    }
}

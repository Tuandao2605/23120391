pipeline {
    agent any

    environment {
        DOCKER_USER = '23120391'
        APP_IMAGE = 'app-23120391'
        APP_CONTAINER = 'container-2312091'
        DOCKER_CREDENTIAL = 'dockerhub-id'
        PUBLIC_PORT = '8081'
    }

    stages {

        stage('0. Prepare Workspace') {
            steps {
                cleanWs()
                echo 'Workspace cleaned!'
            }
        }

        stage('1. Fetch Source Code') {
            steps {
                checkout scm
                echo 'Repository fetched from GitHub'
            }
        }

        stage('2. Build & Publish Image') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CREDENTIAL) {
                        echo 'Start building Docker image...'

                        def image = docker.build(
                            "${DOCKER_USER}/${APP_IMAGE}:${env.BUILD_ID}"
                        )

                        echo 'Publishing image to Docker Hub...'
                        image.push()
                        image.push('stable')
                    }
                }
            }
        }

        stage('3. Deploy Application') {
            steps {
                sh '''
                echo "Deploying new container version..."

                docker stop ${APP_CONTAINER} || true
                docker rm ${APP_CONTAINER} || true

                docker run -d \
                --restart unless-stopped \
                -p ${PUBLIC_PORT}:3000 \
                --name ${APP_CONTAINER} \
                ${DOCKER_USER}/${APP_IMAGE}:stable
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
        }
        success {
            echo 'Deployment successful!'
            echo 'App URL: http://<VM_IP>:8081'
        }
        failure {
            echo 'Deployment failed. Please check logs.'
        }
    }
}
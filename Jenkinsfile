pipeline {
    agent any

    environment {
        DOCKER_USER = 'holycore1'
        APP_IMAGE = 'app-23120391'
        APP_CONTAINER = 'container-2312091'
        DOCKER_CREDENTIAL = 'dockerhub-id'
        PUBLIC_PORT = '8081'
    }

    stages {

        stage('Prepare Workspace') {
            steps {
                cleanWs()
                checkout scm
            }
        }

        stage('Build & Push Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: DOCKER_CREDENTIAL,
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

                    docker build -t $DOCKER_USER/$APP_IMAGE:$BUILD_ID .
                    docker tag $DOCKER_USER/$APP_IMAGE:$BUILD_ID $DOCKER_USER/$APP_IMAGE:latest

                    docker push $DOCKER_USER/$APP_IMAGE:$BUILD_ID
                    docker push $DOCKER_USER/$APP_IMAGE:latest
                    '''
                }
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                docker stop $APP_CONTAINER || true
                docker rm $APP_CONTAINER || true

                docker run -d \
                --restart unless-stopped \
                -p $PUBLIC_PORT:3000 \
                --name $APP_CONTAINER \
                $DOCKER_USER/$APP_IMAGE:latest
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}

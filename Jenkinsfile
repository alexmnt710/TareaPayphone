pipeline {
    agent any

    triggers {
        pollSCM '* * * * *'
    }

    tools {
        nodejs "node 22"
        // Ensure this matches your Jenkins Global Tool Configuration
        dockerTool "Dockertool" 
    }

    environment {
        IMAGE_NAME = "payphone-app"
        CONTAINER_NAME = "payphone-container"
        PORT = "3000"
    }

    stages {
        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }

        stage('Ejecutar tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Construir Imagen Docker') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Desplegar Contenedor') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                sh """
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                    docker run -d --restart unless-stopped --name ${CONTAINER_NAME} -p ${PORT}:${PORT} ${IMAGE_NAME}:latest
                """
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline ejecutado exitosamente.'
        }
        failure {
            echo 'Fallo en la ejecución del pipeline.'
        }
    }
}

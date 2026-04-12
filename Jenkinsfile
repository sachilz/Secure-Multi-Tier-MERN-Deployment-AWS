pipeline {
    agent any

    environment {
        GITLEAKS_PATH = "C:\\DevSecOps\\gitleaks\\gitleaks.exe"
        SONAR_SCANNER = "C:\\DevSecOps\\sonar-scanner\\bin\\sonar-scanner.bat"
        TRIVY_PATH = "C:\\DevSecOps\\trivy\\trivy.exe"
        HADOLINT_PATH = "C:\\DevSecOps\\hadolint\\hadolint.exe"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/sachilz/CI-CD-Enabled-MERN-Stack-Todo-Application.git'
            }
        }

        stage('List Files') {
            steps {
                bat 'dir'
            }
        }

        stage('Gitleaks Secret Scan') {
            steps {
                bat "\"${GITLEAKS_PATH}\" detect --source . --verbose"
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('sonarqube') {
                withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                    bat """
                    \"${SONAR_SCANNER}\" ^
                    -Dsonar.projectKey=CI-CD-Enabled-MERN-Stack-Todo-Application ^
                    -Dsonar.sources=. ^
                    -Dsonar.host.url=http://localhost:9000 ^
                    -Dsonar.token=%SONAR_TOKEN%
                    """
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Hadolint Scan') {
            steps {
                bat "\"${HADOLINT_PATH}\" client/Dockerfile"
                bat "\"${HADOLINT_PATH}\" server/Dockerfile"
            }
        }

        stage('Inject Env File') {
            steps {
                withCredentials([
                    file(credentialsId: 'todo-app-root-env', variable: 'ROOT_ENV'),
                    file(credentialsId: 'todo-app-server-env', variable: 'SERVER_ENV')
                    ]) {
                    bat "copy \"%ROOT_ENV%\" .env"
                    bat "copy \"%SERVER_ENV%\" server\\.env"
                }
            }
        }

        stage('Docker Compose Build') {
            steps {
                bat 'docker compose build'
            }
        }

        stage('Trivy Container Scan') {
            steps {
                bat "\"${TRIVY_PATH}\" image --severity HIGH,CRITICAL todo-app-server"
                bat "\"${TRIVY_PATH}\" image --severity HIGH,CRITICAL todo-app-client"
            }
        }

        stage('Run Containers') {
            steps {
                bat 'docker compose up -d'
            }
        }
    }
}
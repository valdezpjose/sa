pipeline {
    agent any
    stages {
        stage('gcloud') {
            steps {
                sh 'sudo gcloud auth activate-service-account --key-file /var/lib/jenkins/sa-private-key.json'
            }
        }
        stage('skaffold') {
            steps {
                sh 'skaffold dev'
            }
        }
    }
}
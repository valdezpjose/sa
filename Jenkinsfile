pipeline {
    agent any
    stages {
        stage('Deploy to k8s') {
            steps {
                script {

                        sh "gcloud auth activate-service-account --key-file /var/lib/jenkins/sa/sa-private-key.json"
                        sh "skaffold dev --filename='/var/lib/jenkins/sa/skaffold.yaml'" 
                        

                        

                        
                        

                }
            }
        }
    }
}
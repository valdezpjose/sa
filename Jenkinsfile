pipeline {
    agent any
    stages {
        stage('Deploy to k8s') {
            steps {
                script {
			


                        sh "cat Jenkinsfile"
			sh "echo $PWD"
                        sh "gcloud auth activate-service-account --key-file sa-private-key.json"
                        sh "skaffold dev"                         
                
}
            }
        }
    }
}

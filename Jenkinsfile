pipeline {
    agent any
    stages {
        stage('Deploy to k8s') {
            steps {
                script {
                        sh "cat Jenkinsfile"
			            sh "echo $PWD"
                        sh "kubectl get nodes"              
                }
            }
        }
    }
}

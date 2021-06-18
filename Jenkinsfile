pipeline {

  agent any

  stages {

    stage('Checkout Source') {
      steps {
        git 'https://github.com/valdezpjose/sa.git'
      }
    }

    stage('Deploy App') {
      steps {
        sshagent(['JenkinsUser']) {
            sh "sudo chmod 777 /var/lib/jenkins/workspace/Kubernetes_Test/test.yaml"
            sh "sudo scp -i /var/lib/jenkins/workspace/Kubernetes_Test/jenkinsGCP.pem test.yaml asterionmorrigan@162.222.181.223:/var/lib/jenkins/workspace/Kubernetes_Test"
                  }
          script{
                  try{
                      sh "sudo ssh -i /var/lib/jenkins/workspace/Kubernetes_Test/jenkinsGCP.pem asterionmorrigan@162.222.181.223 cd /var/lib/jenkins/workspace/Kubernetes_Test/; sudo gcloud auth activate-service-account --key-file /var/lib/jenkins/workspace/Kubernetes_Test/sa-private-key.json; skaffold dev"
                  }
                  catch(error){
                      sh "echo error "
                  }
          }
      }
    }

  }

}

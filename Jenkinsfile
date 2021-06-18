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
            sh "sudo scp -i /var/lib/jenkins/workspace/Kubernetes_Test/jenkinsGCP.pem test.yaml asterionmorrigan@162.222.181.223:/var/lib/jenkins/workspace/Kubernetes_Test"
                  }
          script{
                  try{
                      sh "sudo ssh -i /var/lib/jenkins/workspace/Kubernetes_Test/jenkinsGCP.pem asterionmorrigan@162.222.181.223 kubectl apply -f test.yaml"
                  }
                  catch(error){
                      sh "echo error "
                  }
          }
      }
    }

  }

}

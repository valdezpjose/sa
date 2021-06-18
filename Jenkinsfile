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
            sh "sudo chmod 777 /var/lib/jenkins/workspace/Kubernetes_Test/book/Dockerfile"
            sh "sudo scp -i /var/lib/jenkins/workspace/Kubernetes_Test/jenkinsGCP.pem /var/lib/jenkins/workspace/Kubernetes_Test/book/Dockerfile asterionmorrigan@162.222.181.223:/var/lib/jenkins/workspace/Kubernetes_Test/book/"
                  }
          script{
                  try{
                      sh "sudo ssh -i /var/lib/jenkins/workspace/Kubernetes_Test/jenkinsGCP.pem asterionmorrigan@162.222.181.223 cd /var/lib/jenkins/workspace/Kubernetes_Test/book; sudo docker build .; sudo docker push us.gcr.io/biblioteca-dev-316501/book;"
                  }
                  catch(error){
                      sh "echo error "
                  }
          }
      }
    }

  }

}

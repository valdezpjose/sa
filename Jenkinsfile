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
            sh "sudo chmod 777 /var/lib/jenkins/workspace/Kubernetes_Test/user/Dockerfile"
            sh "sudo chmod 777 /var/lib/jenkins/workspace/Kubernetes_Test/auth/Dockerfile"

            sh "sudo chmod 777 /var/lib/jenkins/workspace/Kubernetes_Test/infra/k8s/book-depl.yaml"
            sh "sudo chmod 777 /var/lib/jenkins/workspace/Kubernetes_Test/infra/k8s/ingress-srv.yaml"

            sh "sudo scp -i /var/lib/jenkins/workspace/Kubernetes_Test/jenkinsGCP.pem /var/lib/jenkins/workspace/Kubernetes_Test/user/Dockerfile asterionmorrigan@162.222.181.223:/var/lib/jenkins/workspace/Kubernetes_Test/user/"
                  }
          

              }
          script{
                  try{
                      sh "sudo ssh -i /var/lib/jenkins/workspace/Kubernetes_Test/jenkinsGCP.pem asterionmorrigan@162.222.181.223 sudo docker build -t /var/lib/jenkins/workspace/Kubernetes_Test/user/ ."
                  }
                  catch(error){
                      sh "echo error "
                  }
          }

        withDockerRegistry(credentialsId: 'gcr:biblioteca-dev-316501', url: 'https://us.gcr.io') {
        sh "docker push us.gcr.io/biblioteca-dev-316501/user"
      }

                script{
                  try{
                      sh "sudo ssh -i /var/lib/jenkins/workspace/Kubernetes_Test/jenkinsGCP.pem asterionmorrigan@162.222.181.223 kubectl apply -f /var/lib/jenkins/workspace/Kubernetes_Test/infra/k8s/book-depl.yaml"
                  }
                  catch(error){
                      sh "echo error "
                  }
          }


    }

  }

}

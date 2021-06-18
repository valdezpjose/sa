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
          script{
                                kubernetesDeploy(
                                credentialsType: 'KubeConfig',
                                kubeConfig: [path: '/var/lib/jenkins/workspace/Kubernetes Test/.kube/config'],
                                configs: 'test.yml')

          }
      }
    }

  }

}
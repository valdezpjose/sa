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
kubernetesDeploy configs: 'test.yaml', kubeconfigId: 'mykubeconfig'

          }
      }
    }

  }

}

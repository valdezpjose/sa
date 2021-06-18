pipeline {

  agent any

  stages {

    stage('Checkout Source') {
      steps {
        git 'https://github.com/justmeandopensource/playjenkins.git'
      }
    }

    stage('Deploy App') {
      steps {
          script {
          dir("auth"){

          kubernetesDeploy(configs: "test.yaml", kubeconfigId: "mykubeconfig")

          }

          }


      }
    }

  }

}
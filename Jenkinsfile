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
          script {
          dir("auth"){

          kubernetesDeploy(configs: "test.yaml", kubeconfigId: "mykubeconfig")

          }

          }


      }
    }

  }

}
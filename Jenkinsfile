pipeline {

  agent {label 'kubepod'}

  stages {

    stage('Checkout Source') {
      steps {
        git 'https://github.com/valdezpjose/sa.git'
      }
    }

    stage('Deploy App') {
      steps {
          script{
          kubernetesDeploy(configs: "test.yaml", kubeconfig:"mykubeconfig")

          }
      }
    }

  }

}
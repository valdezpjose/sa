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
            sh "scp -o StrictHostKeyChecking=no test.yaml asterionmorrigan@162.222.181.223:/var/lib/jenkins/Kubernetes_Test/"
                  }
          // script{
          //         try{
          //             sh "kubectl apply -f test.yaml"
          //         }
          //         catch(error){
          //             sh "kubectl create -f test.yaml"
          //         }
          // }
      }
    }

  }

}

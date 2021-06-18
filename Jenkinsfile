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
            sh "scp -o StrickHostKeyChecking=no test.yaml asterionmorrigan@162.222.181.223:/home/asterionmorrigan/prueba/"
                  }
          script{
                  try{
                      sh "ssh asterionmorrigan@162.222.181.223 kubectl apply -f test.yaml"
                  }
                  catch(error){
                      sh "ssh asterionmorrigan@162.222.181.223 kubectl create -f test.yaml"
                  }
          }
      }
    }

  }

}

pipeline {

  agent any

  stages {

    stage('Checkout Source') {
      steps {
        git 'https://github.com/valdezpjose/sa.git'
      }
    }

    //STAGE DE PRUEBAS
    stage('Test') {
      steps {
        sh "echo $PWD"
        sh "node -v"
        dir("book"){
        sh "sudo chmod 0777 node_modules/.bin/mocha"
        sh "npm test"
        }

        dir("user"){
        sh "sudo chmod 0777 node_modules/.bin/mocha"
        sh "npm test"
        }
        
      }
    }


    stage('Deploy App') {
      steps {
        sshagent(['JenkinsUser']) {
            //PERMISOS EN ARCHIVOS DOCKERFILE
            sh "sudo chmod 777 /var/lib/jenkins/workspace/Kubernetes_Test/book/Dockerfile"
            sh "sudo chmod 777 /var/lib/jenkins/workspace/Kubernetes_Test/user/Dockerfile"
            sh "sudo chmod 777 /var/lib/jenkins/workspace/Kubernetes_Test/auth/Dockerfile"

            //PERMISOS EN ARCHIVOS YAML DE KUBERNETES
            sh "sudo chmod 777 /var/lib/jenkins/workspace/Kubernetes_Test/infra/k8s/book-depl.yaml"
            sh "sudo chmod 777 /var/lib/jenkins/workspace/Kubernetes_Test/infra/k8s/user-depl.yaml"
            sh "sudo chmod 777 /var/lib/jenkins/workspace/Kubernetes_Test/infra/k8s/auth-depl.yaml"
            sh "sudo chmod 777 /var/lib/jenkins/workspace/Kubernetes_Test/infra/k8s/ingress-srv.yaml"

            //VERIFICACION SCP
            sh "sudo scp -i /var/lib/jenkins/workspace/Kubernetes_Test/jenkinsGCP.pem /var/lib/jenkins/workspace/Kubernetes_Test/user/Dockerfile asterionmorrigan@162.222.181.223:/var/lib/jenkins/workspace/Kubernetes_Test/user/"
                  }
            //BUILDS DE LAS IMAGENES
            script{
                    try{
                        sh "sudo ssh -i /var/lib/jenkins/workspace/Kubernetes_Test/jenkinsGCP.pem asterionmorrigan@162.222.181.223 docker build -t us.gcr.io/biblioteca-dev-316501/book /var/lib/jenkins/workspace/Kubernetes_Test/book/."
                        sh "sudo ssh -i /var/lib/jenkins/workspace/Kubernetes_Test/jenkinsGCP.pem asterionmorrigan@162.222.181.223 docker build -t us.gcr.io/biblioteca-dev-316501/user /var/lib/jenkins/workspace/Kubernetes_Test/user/."
                        sh "sudo ssh -i /var/lib/jenkins/workspace/Kubernetes_Test/jenkinsGCP.pem asterionmorrigan@162.222.181.223 docker build -t us.gcr.io/biblioteca-dev-316501/auth /var/lib/jenkins/workspace/Kubernetes_Test/auth/."
                    }
                    catch(error){
                        sh "echo error "
                    }
                  }
        //PUSH A GOOGLE CLOUD REGISTRY DE LAS IMAGENES
        withDockerRegistry(credentialsId: 'gcr:biblioteca-dev-316501', url: 'https://us.gcr.io') 
        {
        sh "docker push us.gcr.io/biblioteca-dev-316501/book"
        sh "docker push us.gcr.io/biblioteca-dev-316501/user"
        sh "docker push us.gcr.io/biblioteca-dev-316501/auth"
        }

        //CREACIÓN DE SERVICIOS CON KUBECTL
        script{
          try{
              sh "sudo ssh -i /var/lib/jenkins/workspace/Kubernetes_Test/jenkinsGCP.pem asterionmorrigan@162.222.181.223 kubectl apply -f /var/lib/jenkins/workspace/Kubernetes_Test/infra/k8s/book-depl.yaml"
              sh "sudo ssh -i /var/lib/jenkins/workspace/Kubernetes_Test/jenkinsGCP.pem asterionmorrigan@162.222.181.223 kubectl apply -f /var/lib/jenkins/workspace/Kubernetes_Test/infra/k8s/user-depl.yaml"
              sh "sudo ssh -i /var/lib/jenkins/workspace/Kubernetes_Test/jenkinsGCP.pem asterionmorrigan@162.222.181.223 kubectl apply -f /var/lib/jenkins/workspace/Kubernetes_Test/infra/k8s/auth-depl.yaml"
              sh "sudo ssh -i /var/lib/jenkins/workspace/Kubernetes_Test/jenkinsGCP.pem asterionmorrigan@162.222.181.223 kubectl apply -f /var/lib/jenkins/workspace/Kubernetes_Test/infra/k8s/ingress-srv.yaml"
          }
          catch(error){
              sh "echo error "
          }
        }


      }



    }


  }

}

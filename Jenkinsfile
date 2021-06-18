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
          kubernetesDeploy configs: 'test.yaml', kubeConfig: [path: ''], kubeconfigId: 'mykubeconfig', secretName: '', ssh: [sshCredentialsId: '*', sshServer: ''], textCredentials: [certificateAuthorityData: '', clientCertificateData: '', clientKeyData: '', serverUrl: 'https://']
      }
    }

  }

}
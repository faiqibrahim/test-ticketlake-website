/* groovylint-disable LineLength */
node {
    app = null
    properties([disableConcurrentBuilds()])

    stage('Set NodeJs') {
        env.NODEJS_HOME = "${tool 'node-14'}"
        env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
        sh 'npm --version'
    }

    stage('Checkout Repository') {
        checkout scm
        sh 'git rev-parse --short HEAD > .git/commit-id'

        env.COMMIT_ID = readFile('.git/commit-id').trim()
        env.PROJECT_NAME = (env.JOB_NAME.tokenize('/') as String[])[0]
        env.SONAR_KEY = (env.WORKSPACE.tokenize('/') as String[]).last()
        env.IMAGE_TAG = "synavoshub/${env.PROJECT_NAME}:${commit_id}"
        env.BUILD_TAG = "${env.PROJECT_NAME}-${commit_id}"

        sh 'rm package-lock.json'
    }

    stage('Pulling latest react server'){
        docker.image('synavoshub/react-server:latest').pull()
    }

    sh 'printenv'

    stage('Installing dependencies') {
        node_cmd("yarn-i.sh")
    }

    stage('Running Tests') {
       // node_cmd("yarn-test.sh")
    }

    // stage('Code Analysis') {
    //   if(env.BRANCH_NAME != 'staging'){
    //     def sonarqubeScannerHome = tool name: 'sonar', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
    //     withCredentials([string(credentialsId: 'sonar', variable: 'sonarLogin')]) {
    //         sh "${sonarqubeScannerHome}/bin/sonar-scanner -e -Dsonar.host.url=http://sonarqube:9000 -Dsonar.login=${sonarLogin} -Dsonar.projectName=${env.SONAR_KEY} -Dsonar.projectVersion=${env.BUILD_TAG} -Dsonar.projectKey=${env.SONAR_KEY} -Dsonar.sources=${env.WORKSPACE} -Dsonar.exclusions=**/*.test.js -Dsonar.tests=${env.WORKSPACE} -Dsonar.test.inclusions=**/*.test.js -Dsonar.coverage.exclusions=**/*.boundary.* -Dsonar.cpd.exclusions=**/*.svg.js -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info"
    //         checkSonarStatus(currentBuild, env)
    //     }
    //   }
    // }

    stage('Creating optimized build') {
        if (env.BRANCH_NAME == 'develop') {
            dockerize('build-qa', 'develop');
            dockerize('build-qa', "develop-${env.COMMIT_ID}");
        }

        if (env.BRANCH_NAME == 'staging') {
            dockerize('build-staging', 'staging');
            dockerize('build-staging', "staging-${env.COMMIT_ID}");
        }
    }
}

String planName(String jobName) {
    tokens = jobName.tokenize('/') as String[]
    return tokens[0]
}

void node_cmd(command){
    sh "docker run --rm -v ${env.WORKSPACE}:/app synavoshub/react-build-maker /scripts/${command}"
}

void dockerize(build, tag) {
    node_cmd("yarn-run.sh ${build}")
    app = docker.build(env.IMAGE_TAG, '-f Dockerfile ./')

    docker.withRegistry('https://index.docker.io/v1/', 'synavoshub') {
        app.push(tag)
    }

}

String checkSonarStatus(currentBuild, env){
    sh "sleep 20"
    sh "curl -X GET -H 'Accept: application/json' http://sonarqube:9000/api/qualitygates/project_status?projectKey=${env.SONAR_KEY} > status.json"
    def json = readJSON file:'status.json'
    echo "${json.projectStatus.status}"
    if ("${json.projectStatus.status}" == "ERROR") {
        currentBuild.result = 'FAILURE'
        error('SonarQube quality gate failed, please see sonar for details.')
    }
}

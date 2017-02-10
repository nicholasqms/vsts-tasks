import ma = require('vsts-task-lib/mock-answer');
import tmrm = require('vsts-task-lib/mock-run');
import path = require('path');
import util = require('./NpmMockHelper');

let taskPath = path.join(__dirname, '..', 'npmtask.js');
let taskMockRunner = new tmrm.TaskMockRunner(taskPath);
let npmMockHelper = new util.NpmMockHelper(taskMockRunner, "fake\\wd", "root", "");

let mock = require('vsts-task-lib/mock-toolrunner');
mock.exec = () => {
    throw "tool failure";
};

if (process.argv.length == 3) {
    if (process.argv[2] === "useDeprecated") {
        npmMockHelper.useDeprecatedTask();
    }
} 

npmMockHelper.setDebugState(true);
npmMockHelper.mockAuthHelper();
npmMockHelper.mockNpmConfigList();

npmMockHelper.useDeprecatedTask();

var execResult: ma.TaskLibAnswerExecResult = {
    code: 1,
    stdout: "",
    stderr: "some error"
};

npmMockHelper.run(execResult);

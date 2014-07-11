var chalk = require('chalk');

var Log = function(type, obj) {
	switch(type) {
		case 'error':
			console.error(chalk.red('CODE: ')+chalk.red.bold(obj.code)+chalk.red('\nMESSAGE: ')+chalk.red.bold(obj.msg)+'\n', obj.obj);
			break;
		case 'info':
			console.info(chalk.green('CODE: ')+chalk.green.bold(obj.code)+chalk.green('\nMESSAGE: ')+chalk.green.bold(obj.msg)+'\n', obj.obj);
			break;
		case 'warn':
			console.warn(chalk.yellow('CODE: ')+chalk.yellow.bold(obj.code)+chalk.yellow('\nMESSAGE: ')+chalk.yellow.bold(obj.msg)+'\n', obj.obj);
			break;
		case 'exception':
			console.exception(chalk.magenta('CODE: ')+chalk.magenta.bold(obj.code)+chalk.magenta('\nMESSAGE: ')+chalk.magenta.bold(obj.msg)+'\n', obj.obj);
			break;
		default:
			if(obj.code && obj.msg) {
				console.log(chalk.cyan('CODE: ')+chalk.cyan.bold(obj.code)+chalk.cyan('\nMESSAGE: ')+chalk.cyan.bold(obj.msg) + '\n', obj.obj);
			} else {
				console.log(chalk.cyan(obj));
			}
			break;
	}
}

module.exports = Log;
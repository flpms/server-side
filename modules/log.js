var chalk = require('chalk');

var Log = function() {
	var padronizeMsg = function (msg) {
		if(!msg) {
			return;
		}
		if(msg.length < 25) {
			for (var i = msg.length; i <= 25; i++) {
				msg += '\u0020';
			};
			return msg;
		} else if(msg.legth > 30) {
			return 'Message to long';
		}
	};
	this.info = function(obj) {
		var message = obj.msg;
		message = padronizeMsg(message);
		console.info(chalk.green('CODE: ')+chalk.green.bold(obj.code)+chalk.green('\t|  MESSAGE: ')+chalk.green.bold(message)+'\t| ', obj.obj);
	};

	this.error = function(obj) {
		var message = obj.msg;
		message = padronizeMsg(message);
		console.error(chalk.red('CODE: ')+chalk.red.bold(obj.code)+chalk.red('\t|  MESSAGE: ')+chalk.red.bold(message)+'\t| ', obj.obj);
	};
	this.warn = function (obj) {
		var message = obj.msg;
		message = padronizeMsg(message);
		console.warn(chalk.yellow('CODE: ')+chalk.yellow.bold(obj.code)+chalk.yellow('\t|  MESSAGE: ')+chalk.yellow.bold(message)+'\t| ', obj.obj);
	};
	this.exception = function(obj) {
		var message = obj.msg;
		message = padronizeMsg(message);
		console.exception(chalk.magenta('CODE: ')+chalk.magenta.bold(obj.code)+chalk.magenta('\t|  MESSAGE: ')+chalk.magenta.bold(message)+'\t| ', obj.obj);
	};
	this.log = function(obj) {
		var message = obj.msg;
		message = padronizeMsg(message);
		if(obj.code && obj.msg) {
			console.log(chalk.cyan('CODE: ')+chalk.cyan.bold(obj.code)+chalk.cyan('\t|  MESSAGE: ')+chalk.cyan.bold(message) + '\t| ', obj.obj);
		} else {
			console.log(chalk.cyan(obj));
		}
	}
}

module.exports = new Log();
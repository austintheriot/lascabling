const PROTECTED_FILES = {
	'robots.txt': true,
	'.htaccess': true,
	'favicon.ico': true,
};

var fs = require('fs');
function deleteFiles(path) {
	//check if anything exists at path && check if it is a directory
	if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
		//get array of file names in directory
		fs.readdirSync(path).forEach(function (file) {
			//do not delete any protected files
			if (PROTECTED_FILES[file]) {
				console.log('NOT DELETING: ', file);
			} else {
				// delete file
				const currentPath = path + '/' + file;
				console.log('DELETING: ', file);
				fs.unlinkSync(currentPath);
			}
		});
	}
}

console.log('Cleaning build/ directory');
deleteFiles('build');
console.log('Successfully cleaned build/ directory');

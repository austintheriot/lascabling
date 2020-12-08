var fs = require('fs');
const DIRECTORIES_TO_CLEAN = ['build', 'serve'];
const STATIC_ASSETS_FOLDER = 'src/static';

function deleteFolder(path) {
	//check if anything exists at path && check if it is a directory
	if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
		//get array of file names in directory
		fs.readdirSync(path).forEach(function (file) {
			const currentPath = path + '/' + file;
			//recursively delete all subdirectories
			if (fs.lstatSync(currentPath).isDirectory()) {
				deleteFolder(currentPath);
			} else {
				// delete file
				console.log('DELETING: ', file);
				fs.unlinkSync(currentPath);
			}
		});

		//delete directory itself (once all files are deleted)
		console.log(`Deleting directory ${path}...`);
		fs.rmdirSync(path);
	}
}

function copyStaticAssets(path) {
	//Check that static asset directory exists
	if (
		fs.existsSync(STATIC_ASSETS_FOLDER) &&
		fs.lstatSync(STATIC_ASSETS_FOLDER).isDirectory()
	) {
		//get array of file names in directory
		fs.readdirSync(STATIC_ASSETS_FOLDER).forEach(function (file) {
			//create destination folder if it doesn't already exist
			if (!fs.existsSync(path)) {
				fs.mkdirSync(path);
			}

			//copy files into destination directory
			const currentPath = STATIC_ASSETS_FOLDER + '/' + file;
			const destinationPath = path + '/' + file;
			console.log(`Copying ${STATIC_ASSETS_FOLDER}/${file} to ${path}/${file}`);
			fs.copyFileSync(currentPath, destinationPath);
		});
	} else {
		console.log(`No directory found at ${path}`);
	}
}

//Delete folders
DIRECTORIES_TO_CLEAN.forEach((directory) => {
	console.log(`Deleting directory "${directory}"...`);
	deleteFolder(directory);
	console.log(`Successfully deleted directory "${directory}"!\n\n`);
});

//Create folders and copy static assets into them
DIRECTORIES_TO_CLEAN.forEach((directory) => {
	console.log(`Copying static assets into "${directory}" directory...`);
	copyStaticAssets(directory);
	console.log(
		`Successfuly copied static assets into "${directory}" directory!\n\n`
	);
});

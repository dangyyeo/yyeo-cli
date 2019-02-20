const join = require('path').join;
const Metalsmith = require('metalsmith');
const chalk = require('chalk');
const ora = require('ora');
const fs = require('fs');
const renderTemplateFiles = require('./renderTemplate');
const deleteDir = require('./deleteDF').deleteDir;
const deleteFile = require('./deleteDF').deleteFile;

function generate(name, source, destination) {
    const metalsmith = Metalsmith(source)

    let newName = name;
    let pathName = '';

    if (name.includes('/')) {
        const pathArr = name.split('/');
        newName = pathArr.pop();
        pathName = pathArr.join('/');
    }
    const dest = join(destination, 'src/pages', pathName);
    const serviceDest = join(destination, 'src/services', pathName);
    const spinner = ora(`Generating ${newName} ...`).start();

    //加入新的全局变量
    const otherMetadata = { generateName: newName.toLocaleLowerCase(), servicePath: name.toLocaleLowerCase() };
    Object.assign(metalsmith.metadata(), otherMetadata);
    //使用中间件
    metalsmith.use(renderTemplateFiles());

    metalsmith.source('.')
        .destination(dest)
        .clean(false)
        .build(function(err) {
            spinner.stop();
            if (err) throw err;
            Promise.resolve().then(fs.renameSync(join(dest, 'pageDemo'), join(dest, newName.toLocaleLowerCase())))
                .then(() => fs.renameSync(join(dest, `${newName.toLocaleLowerCase()}/models/modelName.js`), join(dest, `${newName.toLocaleLowerCase()}/models/${newName.toLocaleLowerCase()}.js`)))
                .then(() => fs.renameSync(join(dest, `${newName.toLocaleLowerCase()}/service.js`), join(dest, `${newName.toLocaleLowerCase()}/${newName.toLocaleLowerCase()}.js`)))
                .then(() => {
                    // 创建相应目录
                    const pathToCreate = !!pathName ? `src/services/${pathName}` : 'src/services';
                    pathToCreate
                        .split('/')
                        .reduce((prevPath, folder) => {
                            const currentPath = join(prevPath, folder, '/');
                            if (!fs.existsSync(join(destination, currentPath))) {
                                fs.mkdirSync(join(destination, currentPath));
                            }
                            return currentPath;
                        }, '');
                })
                .then(() => fs.copyFileSync(join(dest, `${newName.toLocaleLowerCase()}/${newName.toLocaleLowerCase()}.js`), join(serviceDest, `${newName.toLocaleLowerCase()}.js`)))
                .then(() => fs.unlink(join(dest, `${newName.toLocaleLowerCase()}/${newName.toLocaleLowerCase()}.js`), (err) => {
                    if (err) throw err;
                    }))
                .then(() => {
                    console.log();
                    console.log(chalk.green(`  Generate dir 'src/pages/${name}' and file 'src/services/${name}.js' Successfully!`));
                    console.log();
                })
                .catch(err => {
                    deleteDir(join(dest, newName.toLocaleLowerCase()));
                    deleteFile(serviceDest, `${newName.toLocaleLowerCase()}.js`)
                    throw err;
                });
        });
}

module.exports = generate;

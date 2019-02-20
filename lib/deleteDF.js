const fs = require('fs');
const join = require('path').join;

/**
 * 删除文件夹功能
 * @param  {String} url  文件路径，绝对路径
 * @return {Null}
 */
function deleteDir(url){
    var files = [];

    if( fs.existsSync(url) ) {  //判断给定的路径是否存在

        files = fs.readdirSync(url);   //返回文件和子目录的数组
        files.forEach(function(file, index){
            var curPath = join(url, file);

            if(fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
                deleteDir(curPath);
            } else {
                fs.unlinkSync(curPath);    //是指定文件，则删除
            }
        });
        fs.rmdirSync(url); //清除文件夹
    }
}

/**
 * 删除某一个包下面的需要符合格式的文件。
 * @param  {String} url  文件路径，绝对路径
 * @param  {String} name 需要删除的文件名称
 * @return {Null}
 */
function deleteFile(url, name){
    var files = [];

    if( fs.existsSync(url) ) {    //判断给定的路径是否存在

        files = fs.readdirSync(url);    //返回文件和子目录的数组

        files.forEach(function(file, index){

            var curPath = join(url, file);

            if(fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
                deleteFile(curPath, name);
            } else {
                if(file.indexOf(name)>-1){    //是指定文件，则删除
                    fs.unlinkSync(curPath);
                }
            }
        });
    }
}

module.exports = { deleteDir, deleteFile };

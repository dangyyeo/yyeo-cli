/**
 * GitHub - github:owner or simply owner
 * GitLab - gitlab:owner
 * Bitbucket - bitbucket:owner
 */
const GITPATH = 'https://github.com:dangyyeo'; // GitHub username

// list your personal project name
const TEMPLATES = [
    {
        name: 'react-admin-pro',
        description: '一个 React 前端初始化应用',
    },
    {
        name: 'misdp-service',
        description: '一个相对应的 java 后台数据 restful api 服务初始化应用',
    },
    {
        name: 'yyeo-cli',
        description: 'A Demo',
    },
];

module.exports = { GITPATH, TEMPLATES };

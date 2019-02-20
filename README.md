# yyeo-cli
A Cli Demo for Yourself.

## Getting Started

Install, create and start.

```bash
# Install
$ npm install yyeo-cli -g
```
## Commands

We have 3 commands: `list`, `init`, `generate`.

### Display available templates -- list

```bash
$ yyeo-cli list
```

### Create app in current directory, using your template -- init
```bash
$ yyeo-cli init templateName proName
```

### Generate new module, using template -- generate

```bash
$ yyeo-cli generate moduleName
$ yyeo-cli generate pathname/moduleName
```

## Configuration

```bash
lib/config.js

# GITPATH:  config githup username
# TEMPLATES:  config your personal project name and description
```

## License

[MIT](https://tldrlegal.com/license/mit-license)

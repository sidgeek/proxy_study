### pnpm create Monorepo project

+ 1. pnpm init
+ 2. create pnpm-workspace.yaml
```
packages:
  # all packages in subdirs of packages/ and components/
  - 'packages/**'
```
+ 3. 安装全局公用的包，举例比如(react react-dom)
```
pnpm install react react-dom -w
``` 
  - -w 表示把包安装在 root 下，该包会放置在 <root>/node_modules 
  - -r 把包把安装在所有 packages 中 
  - -r --filter @test/web 把包把安装在所有 @test/web 中 

+ 4.  新建packages目录，存放每个package的父目录
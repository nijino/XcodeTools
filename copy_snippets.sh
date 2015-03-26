#!/bin/bash

#检查是否下载了code snippets
if [[ ! -e "`pwd`/CodeSnippets" ]]; then
	echo "need download snippet!"
	exit 1
fi

#如果Xcode的CodeSnippets不存在，则新建
if [[ ! -d "$HOME/Library/Developer/Xcode/UserData/CodeSnippets/" ]]; then
	mkdir ~/Library/Developer/Xcode/UserData/CodeSnippets/
fi

LIST=`ls ~/Library/Developer/Xcode/UserData/CodeSnippets/`

if [ -z "$LIST" ]
then
#如果CodeSnippets文件夹为空，则直接拷贝全部文件
	mv `pwd`/CodeSnippets/* ~/Library/Developer/Xcode/UserData/CodeSnippets/
	rm -r `pwd`/CodeSnippets/
else
#如果CodeSnippets文件夹里有内容，则备份到old文件夹后再拷贝
	mv ~/Library/Developer/Xcode/UserData/CodeSnippets/ ~/Library/Developer/Xcode/UserData/CodeSnippetsOld/
	mv `pwd`/CodeSnippets/ ~/Library/Developer/Xcode/UserData/
fi

echo "done!"
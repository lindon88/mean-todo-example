@echo off

where npm >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
	echo Node JS is not installed, install Node JS first manually
	goto END
) ELSE (
	echo Node JS is installed
)

where mongo >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
	echo MongoDB is not installed, install MongoDB manually and configure it.
	goto END
) ELSE (
	echo MongoDB is installed
)

where git >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
	echo GIT is not installed, install GIT first manually
	goto END
) ELSE (
	echo GIT is installed
)

where bower >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
	echo Bower is not installed, installing bower
	call npm install bower -g
) ELSE (
	echo Bower is installed
)

where grunt >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
	echo Grunt CLI is not installed, installing Grunt CLI
	call npm install grunt-cli -g 
) ELSE (
	echo Grunt CLI is installed
)

where mm >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
	echo MongoDB migrations is not installed, installing MongoDB migrations
	call npm install mongodb-migrations -g 
) ELSE (
	echo MongoDB migrations is installed
)

:: Install and run Express server
cd  todo-server
start cmd /k "call run.bat"

:: Install and run Todo application
cd ../todo-application
start cmd /k "call run.bat"

:END
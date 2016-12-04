@echo off

where npm >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
	echo Node JS is not installed, install Node JS first manually
	goto END
) ELSE (
	echo Node JS is installed 
)

call npm start

:END
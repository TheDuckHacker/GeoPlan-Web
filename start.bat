@echo off
echo Iniciando GeoPlan Ciudad Viva...
echo.

echo Instalando dependencias...
call npm install

echo.
echo Iniciando servidor y cliente...
call npm run dev

pause

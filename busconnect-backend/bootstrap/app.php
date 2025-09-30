<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\AdminMiddleware;
use Tymon\JWTAuth\Http\Middleware\Authenticate as JwtAuthenticate;
use Tymon\JWTAuth\Http\Middleware\RefreshToken as JwtRefresh;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php', 
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Register middleware aliases
        $middleware->alias([
            'admin'       => AdminMiddleware::class,
            'jwt.auth'    => JwtAuthenticate::class,
            'jwt.refresh' => JwtRefresh::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // You can customize exception handling here if needed
    })
    ->create();

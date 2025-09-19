<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Foundation\Configuration\Exceptions;

use App\Http\Middleware\AdminMiddleware;

// tymon/jwt-auth (aliases for convenience)
use Tymon\JWTAuth\Http\Middleware\Authenticate as JwtAuthenticate;
use Tymon\JWTAuth\Http\Middleware\RefreshToken as JwtRefresh;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Register middleware aliases (Laravel 11 way)
        $middleware->alias([
            'admin'        => AdminMiddleware::class,
            'jwt.auth'     => JwtAuthenticate::class,
            'jwt.refresh'  => JwtRefresh::class,
        ]);

        // If you need to edit API/web middleware stacks, you can:
        // $middleware->api(append: [...]);
        // $middleware->web(append: [...]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

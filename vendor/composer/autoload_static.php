<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitf1e8793858681cf0ed6a31b742c579d6
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitf1e8793858681cf0ed6a31b742c579d6::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitf1e8793858681cf0ed6a31b742c579d6::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}

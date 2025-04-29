(module
    (import "console" "log" (func $log (param $message i32) (result i32)))
    (func $x (export "x") (param $a i32) (param $b i32) (result i32)
        (i32.add (local.get $a) (local.get $b))
        (call $log)
    )
)

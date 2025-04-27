(module
    (func $x (export "x") (param $a i32) (param $b i32) (result i32)
        (i32.mul (local.get $a) (local.get $b))
    )
)

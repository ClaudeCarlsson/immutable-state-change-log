pragma circom 2.0.0;

template Hash() {
    signal input preimage;
    signal output hash;
    hash <== preimage;
}

component main = Hash();
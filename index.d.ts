/*! noble-secp256k1 - MIT License (c) Paul Miller (paulmillr.com) */
declare const CURVE: {
    a: bigint;
    b: bigint;
    P: bigint;
    n: bigint;
    h: bigint;
    Gx: bigint;
    Gy: bigint;
    beta: bigint;
};
export { CURVE };
declare type Hex = Uint8Array | string;
declare type PrivKey = Hex | bigint | number;
declare type PubKey = Hex | Point;
declare type Sig = Hex | Signature;
export declare class Point {
    x: bigint;
    y: bigint;
    static BASE: Point;
    static ZERO: Point;
    _WINDOW_SIZE?: number;
    constructor(x: bigint, y: bigint);
    _setWindowSize(windowSize: number): void;
    private static fromCompressedHex;
    private static fromUncompressedHex;
    static fromHex(hex: Hex): Point;
    static fromPrivateKey(privateKey: PrivKey): Point;
    static fromSignature(msgHash: Hex, signature: Sig, recovery: number): Point;
    toRawBytes(isCompressed?: boolean): Uint8Array;
    toHex(isCompressed?: boolean): string;
    toHexX(): string;
    toRawX(): Uint8Array;
    assertValidity(): void;
    equals(other: Point): boolean;
    negate(): Point;
    double(): Point;
    add(other: Point): Point;
    subtract(other: Point): Point;
    multiply(scalar: number | bigint): Point;
}
export declare class Signature {
    r: bigint;
    s: bigint;
    constructor(r: bigint, s: bigint);
    static fromHex(hex: Hex): Signature;
    assertValidity(): void;
    toRawBytes(isCompressed?: boolean): Uint8Array;
    toHex(isCompressed?: boolean): string;
}
export declare const SignResult: typeof Signature;
export declare function getPublicKey(privateKey: Uint8Array | number | bigint, isCompressed?: boolean): Uint8Array;
export declare function getPublicKey(privateKey: string, isCompressed?: boolean): string;
export declare function recoverPublicKey(msgHash: string, signature: string, recovery: number): string | undefined;
export declare function recoverPublicKey(msgHash: Uint8Array, signature: Uint8Array, recovery: number): Uint8Array | undefined;
export declare function getSharedSecret(privateA: PrivKey, publicB: PubKey, isCompressed?: boolean): Hex;
declare type OptsRecovered = {
    recovered: true;
    canonical?: true;
};
declare type OptsNoRecovered = {
    recovered?: false;
    canonical?: true;
};
export declare function sign(msgHash: Uint8Array, privateKey: PrivKey, opts: OptsRecovered): Promise<[Uint8Array, number]>;
export declare function sign(msgHash: string, privateKey: PrivKey, opts: OptsRecovered): Promise<[string, number]>;
export declare function sign(msgHash: Uint8Array, privateKey: PrivKey, opts?: OptsNoRecovered): Promise<Uint8Array>;
export declare function sign(msgHash: string, privateKey: PrivKey, opts?: OptsNoRecovered): Promise<string>;
export declare function sign(msgHash: string, privateKey: PrivKey, opts?: OptsNoRecovered): Promise<string>;
export declare function verify(signature: Sig, msgHash: Hex, publicKey: PubKey): boolean;
declare class SchnorrSignature {
    readonly r: bigint;
    readonly s: bigint;
    constructor(r: bigint, s: bigint);
    static fromHex(hex: Hex): SchnorrSignature;
    toHex(): string;
    toRawBytes(): Uint8Array;
}
declare function schnorrGetPublicKey(privateKey: Uint8Array): Uint8Array;
declare function schnorrGetPublicKey(privateKey: string): string;
declare function schnorrSign(msgHash: string, privateKey: string, auxRand?: Hex): Promise<string>;
declare function schnorrSign(msgHash: Uint8Array, privateKey: Uint8Array, auxRand?: Hex): Promise<Uint8Array>;
declare function schnorrVerify(signature: Hex, msgHash: Hex, publicKey: Hex): Promise<boolean>;
export declare const schnorr: {
    Signature: typeof SchnorrSignature;
    getPublicKey: typeof schnorrGetPublicKey;
    sign: typeof schnorrSign;
    verify: typeof schnorrVerify;
};
export declare const utils: {
    isValidPrivateKey(privateKey: PrivKey): boolean;
    randomPrivateKey: (bytesLength?: number) => Uint8Array;
    sha256: (message: Uint8Array) => Promise<Uint8Array>;
    hmacSha256: (key: Uint8Array, ...messages: Uint8Array[]) => Promise<Uint8Array>;
    precompute(windowSize?: number, point?: Point): Point;
};

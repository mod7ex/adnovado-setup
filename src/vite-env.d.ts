/// <reference types="vite/client" />

/* ************************** Utilities ************************** */
// type ValueOrGenerator<T> = T extends Function ? never : T | (() => T);
type ValueOrGenerator<T> = T | (() => T);

// type ValueOrConcluder<T> = T extends Function ? never : T | ((v: T) => T);
type ValueOrConcluder<T> = T | ((v: T) => T);

/* ************************** ********* ************************** */
type Tfunction = (...args: any[]) => any;

type Numberish = string | number;

type TEmpty = undefined | null;

/* ************************** ********* ************************** */

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

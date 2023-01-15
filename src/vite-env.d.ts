/// <reference types="vite/client" />

/* ***************************************** Utilities ***************************************** */
// type ValueOrGenerator<T> = T extends Function ? never : T | (() => T);
type ValueOrGenerator<T> = T | (() => T);

// type ValueOrConcluder<T> = T extends Function ? never : T | ((v: T) => T);
type ValueOrConcluder<T> = T | ((v: T) => T);

type TRequired<T extends object, K extends keyof T> = { [P in Exclude<keyof T, K>]?: T[P] } & { [P in K]-?: T[P] };

/* ************************************** *************** ************************************** */
type Tfunction = (...args: any[]) => any;

type AsyncFunction = (...args: any[]) => Promise<any>;

type PromiseType<P extends Promise<any>> = P extends Promise<infer T> ? T : never;

type Numberish = string | number;

type TEmpty = undefined | null;

/* ************************************** *************** ************************************** */

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_HOSTNAME: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

/* ************************************** i18n ************************************** */

type ObjectOfNested<T, Key = string> = { [K in Key]?: T | ObjectOfNested<T, Key> };

type SetFallback<T, F = string, Key = "_"> = T extends object ? { [K in keyof T | Key]: K extends Key ? F : SetFallback<T[K], F> } : T;

// type SetFallback<T, F = string, Key extends string | number | symbol = "_"> = T extends object ? { [P in keyof T]: SetFallback<T[P], F, Key> } & { [P in Key]: F } : T;

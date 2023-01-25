import { type ApiPayload, trimChar } from "~/utils";

// ------------------------------------------------------------------------------------------------------------ AppURL

export interface IUriPayload {
    protocol?: string; // "https:" | "http:" | ""
    username?: string;
    password?: string;
    hostname?: string; // "www.foo.com"
    port?: number;
    pathname?: string; // "/some/path"
    search?: ApiPayload;
    hash?: string;

    // host --> "www.foo.com:500"
    // href --> "https://www.foo.com:5000/"
    // origin --> "https://www.foo.com:5000"
}

export const payloadToHostString = ({ hostname, port }: Pick<IUriPayload, "hostname" | "port">) => {
    if (hostname) {
        // @ts-ignore
        if (port) hostname = +`:${port}`;

        return hostname;
    }
};

export const payloadToQueryString = (search?: IUriPayload["search"]) => {
    // @ts-ignore
    return new URLSearchParams(search ?? undefined).toString();
};

export const payloadToOriginString = ({ hostname, port, protocol }: Pick<IUriPayload, "hostname" | "port" | "protocol">) => {
    const host = payloadToHostString({ hostname, port });

    if (host) {
        let _origin = host;

        if (protocol) _origin = `${protocol}//${_origin}`;

        return _origin;
    }
};

export const payloadToUrlString = (args?: IUriPayload) => {
    if (!args) return;

    let _url = payloadToHostString(args);

    if (!_url) return;

    let _username = args.username;
    let _password = args.password;

    if (_password || _username) {
        const user_info = `${_username}:${_password}`;

        _url = `${user_info}@${_url}`;
    }

    let _protocol = args.protocol;
    if (_protocol) _url = `${_protocol}//${_url}`;

    let _pathname = args.pathname;
    if (_pathname) _url += `/${trimChar(_pathname, "/")}`;

    // @ts-ignore
    let _search = payloadToQueryString(args.search);
    if (_search) _url += `?${_search}`;

    let _hash = args.hash;
    if (_hash) _url += `#${_hash}`;

    return _url;
};

export class AppURL {
    private _protocol?: IUriPayload["protocol"];
    private _username?: IUriPayload["username"];
    private _password?: IUriPayload["password"];
    private _hostname?: IUriPayload["hostname"];
    private _port?: IUriPayload["port"];
    private _pathname?: IUriPayload["pathname"];
    private _search?: IUriPayload["search"];
    private _hash?: IUriPayload["hash"];

    constructor(init?: IUriPayload) {
        if (init) {
            Object.entries(init).forEach(([key, val]) => {
                Reflect.set(this, `_${key}`, val);
            });
        }
    }

    get protocol() {
        return this._protocol;
    }
    get username() {
        return this._username;
    }
    get password() {
        return this._password;
    }
    get hostname() {
        return this._hostname;
    }
    get port() {
        return this._port;
    }
    get pathname() {
        return this._pathname;
    }
    get search() {
        return this._search;
    }
    get hash() {
        return this._hash;
    }

    get host() {
        return payloadToHostString(this);
    }
    get origin() {
        return payloadToOriginString(this);
    }
    get href() {
        return this[Symbol.toPrimitive]();
    }
    get queryString() {
        return payloadToQueryString(this._search);
    }

    toString() {
        return this[Symbol.toPrimitive]() ?? "";
    }

    [Symbol.toPrimitive]() {
        return payloadToUrlString(this);
    }
}

// ------------------------------------------------------------------------------------------------------------ Request Abortion

interface AbortionOptions {
    timeout: number;
    auto?: boolean;
    reason?: any;
}

export const createAbortion = ({ timeout, auto = true, reason }: AbortionOptions) => {
    const controller = new AbortController();

    let timerId: NodeJS.Timeout | undefined;

    const abort = (_reason?: any) => controller.abort(_reason ?? reason);

    const schedule = (_timeout?: number, _reason?: any) => {
        timerId = setTimeout(() => abort(_reason ?? reason), _timeout ?? timeout);
    };

    if (auto) schedule();

    const signal = controller.signal;

    const clear = () => {
        timerId && clearTimeout(timerId);
    };

    return { signal, clear, schedule, abort };
};

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
        const _hostname = this._hostname;

        if (_hostname) {
            let _port = this._port ?? "";

            if (_port) _port = `:${_port}`;

            return _hostname + _port;
        }
    }
    get origin() {
        const _hostname = this._hostname;
        const _protocol = this._protocol;
        let _port = this._port ?? "";

        let _origin;

        if (_hostname) {
            _origin = _hostname;

            if (_protocol) _origin = `${_protocol}://${_origin}`;

            if (_port) _port = `:${_port}`;

            return _origin + _port;
        }
    }
    get href() {
        return this[Symbol.toPrimitive]();
    }
    get queryString() {
        // @ts-ignore
        return new URLSearchParams(this._search ?? undefined);
    }

    toString() {
        return this[Symbol.toPrimitive]() ?? "";
    }

    [Symbol.toPrimitive]() {
        let _host = this.host;

        if (!_host) return;

        let _url = _host;

        let _username = this._username;
        let _password = this._password;

        if (_password || _username) {
            const user_info = `${_username ?? ""}:${_password ?? ""}`; // to check

            _url = `${user_info}@${_url}`;
        }

        let _protocol = this._protocol;
        if (_protocol) _url = `${_protocol}://${_url}`;

        let _pathname = this._pathname;
        if (_pathname) _url += `/${trimChar(_pathname, "/")}`;

        let _search = this.queryString.toString();
        if (_search) _url += `?${_search}`;

        let _hash = this._hash;
        if (_hash) _url += `#${_hash}`;

        return _url;
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

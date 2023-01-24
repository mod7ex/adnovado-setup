import API from "~/config/api.json";
import { API_HOSTNAME } from "~/constants";
import { app_join, replaceParams, trimChar, queryToString, type ApiPayload } from "~/utils";
import { AppURL, createAbortion } from "~/modules/fetch/utils";

type ResponseData = object;

const REQUEST_TIMEOUT = 1000;

const ABORTION_REASON = "Timeout exceeded";

enum HttpMethod {
    GET = "GET",
    PUT = "PUT",
    POST = "POST",
    DELETE = "DELETE",
}

enum MutationHttpMethod {
    PUT = "PUT",
    POST = "POST",
    DELETE = "DELETE",
}

interface IRequestInit {
    timeout?: number;
    params: ApiPayload;
    raw: RequestInit;
}

interface MutationInit extends IRequestInit {
    raw: Omit<RequestInit, "method"> & { method: MutationHttpMethod };
}

interface QueryInit extends IRequestInit {
    raw: Omit<RequestInit, "method" | "body">;
}

type Result<T extends ResponseData, E = unknown> =
    | { success: false; error?: E; message: string }
    | {
          data: T;
          success: true;
          response: Response;
      };

type ExeProps = {
    abortion?: Pick<ReturnType<typeof createAbortion>, "signal" | "clear">;
    timeout?: number;
};

type ExtractProps = {
    timeout?: number;
    reason?: any;
};

type HeadersPayload = Record<string, string>;

abstract class IRequest {
    constructor(protected _end_point: AppURL | RequestInfo | URL, protected _state?: IRequestInit) {}

    static headers = (options?: HeadersPayload) => {
        return new Headers({
            "Content-Type": "application/json",
            ...options,
        });
    };

    static check_response(response: Response) {
        // the PHP be-like

        if (response.ok) return;

        if (response.status === 404) throw new TypeError("Page not found");

        throw new TypeError("Network response was not OK");
    }

    request({ signal, headers }: { signal?: AbortSignal; headers?: HeadersPayload }) {
        let _end_point = this._end_point;

        if (_end_point instanceof AppURL) {
            const _href = _end_point.href;
            if (_href) _end_point = _href;
            else throw Error("Invalid end-point");
        }

        return new Request(_end_point, {
            method: HttpMethod.GET,
            headers: Query.headers(headers),
            signal,
            ...this._state?.raw,
        });
    }

    exe = async <T extends ResponseData, E = unknown>({ abortion, timeout }: ExeProps = {}): Promise<Result<T, E>> => {
        if (!abortion) abortion = createAbortion({ timeout: timeout ?? REQUEST_TIMEOUT, reason: ABORTION_REASON });

        const signal = abortion.signal;
        const clear = abortion.clear;

        try {
            const response = await fetch(this.request({ signal }));

            Query.check_response(response);

            const data = <T>await response.json(); // ...

            return {
                data,
                success: true,
                response,
            };
        } catch (e) {
            let error = e as E;

            return {
                error,
                success: false,
                message: (e as Error)?.message ?? "Something went wrong",
            };
        } finally {
            clear();
        }
    };

    extract(args: ExtractProps = {}) {
        let timeout = args.timeout ?? REQUEST_TIMEOUT;
        let reason = args.reason ?? ABORTION_REASON;

        const { abort, clear, schedule, signal } = createAbortion({ timeout, reason, auto: false });

        let isStarted = false;

        return {
            exe: <T extends ResponseData, E = unknown>(_args: ExtractProps = {}) => {
                isStarted = true;

                schedule(_args.timeout, _args.reason);

                return this.exe<T, E>({ abortion: { signal, clear } });
            },
            cancel: (reason?: any) => {
                isStarted && abort(reason);
            },
        };
    }
}

export class Query extends IRequest {
    constructor(_end_point: AppURL | RequestInfo | URL, _state?: QueryInit) {
        super(_end_point, _state);
    }
}

export class Mutation extends IRequest {
    constructor(_end_point: AppURL | RequestInfo | URL, _state?: MutationInit) {
        super(_end_point, _state);
    }
}

export * from "~/modules/fetch/utils";

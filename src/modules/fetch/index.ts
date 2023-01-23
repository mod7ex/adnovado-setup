import API from "~/config/api.json";
import { API_HOSTNAME } from "~/constants";
import { app_join, replaceParams, trimChar, queryToString, type ApiPayload } from "~/utils";
import { AppURL, createAbortion } from "~/modules/fetch/utils";

type Data = object;

const REQUEST_TIMEOUT = 1000;

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

type RequestIdentifier = string;

interface IRequestInit {
    key?: RequestIdentifier; // none-existence means no-cahce
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

type Result<T extends Data, E = unknown> =
    | { success: false; error?: E; message: string; key?: RequestIdentifier }
    | {
          data: T;
          success: true;
          response: Response;
          key?: RequestIdentifier;
      };

export const headers = (options?: object) => {
    return new Headers({
        "Content-Type": "application/json",
        // 'Content-Length': options?.body?.toString().length,
    });
};

abstract class IRequest {
    constructor(protected _end_point: AppURL | RequestInfo | URL, protected _state?: IRequestInit) {}

    static headers = (options?: Record<string, string>) => {
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
}

export class Query extends IRequest {
    constructor(_end_point: AppURL | RequestInfo | URL, _state?: QueryInit) {
        super(_end_point, _state);
    }

    request({ signal }: { signal?: AbortSignal }) {
        let _end_point = this._end_point;

        if (_end_point instanceof AppURL) {
            const _href = _end_point.href;
            if (_href) _end_point = _href;
            else throw Error("Invalid end-point");
        }

        const _options: RequestInit = {
            method: HttpMethod.GET,
            headers: Query.headers(),
            signal,
            ...this._state?.raw,
        };

        return new Request(_end_point, _options);
    }

    extract() {
        return {
            exe: () => this.exe(),
            cancel: () => {},
        };
    }

    exe = async <T extends Data, E = unknown>(): Promise<Result<T, E>> => {
        const key = this._state?.key;

        const { clear, signal } = createAbortion({ timeout: REQUEST_TIMEOUT, reason: "Timeout exceeded" });

        try {
            const response = await fetch(this.request({ signal }));

            Query.check_response(response);

            // handel cache

            const data = <T>await response.json();

            return {
                data,
                success: true,
                response,
                key,
            };
        } catch (e: unknown) {
            let error = e as E;

            return {
                error,
                success: false,
                message: (e as Error)?.message ?? "Something went wrong",
                key,
            };
        } finally {
            clear();
        }
    };
}

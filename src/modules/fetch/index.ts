import { MODE } from "~/constants";
import { type ApiPayload } from "~/utils";
import { AppURL, createAbortion } from "~/modules/fetch/utils";

type ResponseData = object;

const REQUEST_TIMEOUT = 2000;

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
    raw: Omit<RequestInit, "timeout" | "method"> & { method: MutationHttpMethod };
}

interface QueryInit extends IRequestInit {
    raw: Omit<RequestInit, "timeout" | "method" | "body">;
}

type Result<T extends ResponseData, E = unknown> =
    | { success: false; error?: E; message: string }
    | {
          data: T | undefined;
          success: true;
          response: Response;
      };

type ExeProps<T = QueryInit["raw"]> = {
    timeout?: number;
    exploit?: <T>(v: Response) => Promise<T>;
    data?: Record<string, any>;
    raw?: T;
};

type HeadersPayload = Record<string, string>;

abstract class IRequest {
    private _default_method = HttpMethod.GET;

    constructor(protected _end_point: AppURL | string, protected _state?: IRequestInit) {}

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

    get end_point() {
        let _end_point = this._end_point;

        if (_end_point instanceof AppURL) {
            const _href = _end_point.href;
            if (_href) _end_point = _href;
            else throw Error("Invalid end-point");
        }

        return _end_point;
    }

    init(args?: RequestInit) {
        return {
            method: this._default_method,
            headers: IRequest.headers(),
            ...this._state?.raw,
            ...args,
        };
    }

    // prettier-ignore
    protected static async run<T extends ResponseData, E = unknown>(
        {end_point, init, exploit , clear }:
        {end_point: string;init: RequestInit; exploit: ExeProps["exploit"], clear: ()=> void }
    ): Promise<Result<T, E>> {
        try {
            let response: Response;

            if (MODE.TEST) {
                response = await fetch(end_point, init);
            } else {
                response = await fetch(new Request(end_point, init));
            }

            IRequest.check_response(response);

            let data: T | undefined = undefined;

            exploit && (data = await exploit<T>(response));

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
    }
}

export class Query extends IRequest {
    constructor(_end_point: AppURL | string, _state?: QueryInit) {
        super(_end_point, _state);
    }

    // prettier-ignore
    exe = <T extends ResponseData, E = unknown>(
        {
            timeout,
            exploit,
            raw
        }: Omit<ExeProps, 'data'>= {}
    ): Promise<Result<T, E>> => {
        const { clear, signal } = createAbortion({ timeout: timeout ?? REQUEST_TIMEOUT, reason: ABORTION_REASON });

        const init = this.init({ signal, ...raw });

        const end_point = this.end_point

        return IRequest.run<T, E>({ end_point, init, clear, exploit })
    };

    extract() {
        let timeout = REQUEST_TIMEOUT;
        let reason = ABORTION_REASON;

        const { abort, clear, schedule, signal } = createAbortion({ timeout, reason, auto: false });

        let isStarted = false;

        return {
            exe: <T extends ResponseData, E = unknown>(args: Omit<ExeProps, "data"> = {}) => {
                isStarted = true;

                schedule(args.timeout);

                return this.exe<T, E>({ ...args, raw: { signal, ...args.raw } });
            },

            cancel: (reason?: any) => {
                isStarted && abort(reason);
            },
        };
    }
}

export class Mutation extends IRequest {
    constructor(_end_point: AppURL | string, _state?: MutationInit) {
        super(_end_point, _state);
    }

    // prettier-ignore
    exe = <T extends ResponseData, E = unknown>(
        {
            timeout,
            exploit,
            raw,
            data
        }: ExeProps= {}
    ): Promise<Result<T, E>> => {
        const { clear, signal } = createAbortion({ timeout: timeout ?? REQUEST_TIMEOUT, reason: ABORTION_REASON });

        const body = data ? JSON.stringify(data) : null;

        const init = this.init({ signal, body, ...raw });

        const end_point = this.end_point

        return IRequest.run<T, E>({ end_point, init, clear, exploit })
    };

    extract() {
        let timeout = REQUEST_TIMEOUT;
        let reason = ABORTION_REASON;

        const { abort, clear, schedule, signal } = createAbortion({ timeout, reason, auto: false });

        let isStarted = false;

        return {
            exe: <T extends ResponseData, E = unknown>(args: Omit<ExeProps, "data"> & { reason?: any } = {}) => {
                isStarted = true;

                schedule(args.timeout, args.reason);

                return this.exe<T, E>({ ...args });
            },

            cancel: (reason?: any) => {
                isStarted && abort(reason);
            },
        };
    }
}

export * from "~/modules/fetch/utils";

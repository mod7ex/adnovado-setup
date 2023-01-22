import API from "~/config/api.json";
import { app_join, replaceParams, trimChar, queryToString, type ApiPayload } from "~/utils";
import { API_HOSTNAME } from "~/constants";

type RequestIdentifier = string;

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

const createRequest = (input: RequestInfo | URL, options?: RequestInit) => {
    return new Request(input, options);
};

export const createQuery = (input: RequestInfo | URL, options?: Omit<RequestInit, "method">) => {
    return createRequest(input, {
        method: HttpMethod.GET,
        ...options,
    });
};

interface MutationInit extends RequestInit {
    method: MutationHttpMethod;
}

export const createMutation = (input: RequestInfo | URL, options?: MutationInit) => {
    return createRequest(input, {
        method: HttpMethod.GET,
        ...options,
    });
};

interface IRawRequestOptions<M extends HttpMethod> {
    base_url?: string;
    path?: string;
    timeout?: number;
    params?: Record<string, Numberish | boolean>;
    key?: RequestIdentifier;
    raw_options?: RequestInit;
    method?: M;
    remember?: boolean;
}

type Result<T extends Data, E = unknown> =
    | { success: false; error: E; message: string; key?: RequestIdentifier }
    | {
          data: T;
          success: true;
          response: Response;
          key?: RequestIdentifier;
      };

type Data = object;

const prepare_request = <M extends HttpMethod>(options?: IRawRequestOptions<M>) => {
    return options;
};

// https://www.google.com/search?sxsrf=AJOqlzUWU7oqSsFKfcjCNz6EXYDCDFSM-A:1674332382846&q=uri+format+example&tbm=isch&source=univ&fir=RyZ11vGDmqtY2M%252Cu6wBM4mGe1lJQM%252C_%253BDPbLSSiMeKKWkM%252C20coLy3_SgiVnM%252C_%253BhUiy4tPWjzNqTM%252C_bXtxhhE4cXo8M%252C_%253BO1d3rqFW2TY1mM%252C5_K13DA-ZKUHtM%252C_%253BQkBeBY6YzC1f8M%252C7RjzEqqnH82qYM%252C_%253BMymrGoTvY-R-OM%252CGz-mY1fb5b8OOM%252C_%253BRqwFsy2VjT7itM%252CfcsxM8eaHtSUtM%252C_%253BBdtEisE-ir0L0M%252C_d73A76x20RuKM%252C_%253B9ljIrzuAQJBE5M%252C_bXtxhhE4cXo8M%252C_%253BRtnudQtks2gRoM%252CeXv9z51oUqFKfM%252C_&usg=AI4_-kTna6-VgCGhojFEkqSvJUIQIALWIQ&sa=X&ved=2ahUKEwjQi6mXvtn8AhX5RfEDHSzFBv0Q7Al6BAgIEFQ&biw=1866&bih=948&dpr=1

// const end_point = ({ base, params, path, search }: IEndPoint) => {
//     // still have to add protocol, port ...,

//     const _base = base ?? API_HOSTNAME;

//     let _path = path ?? "/";
//     _path = params ? replaceParams(_path, params) : _path;

//     // let _end_point = app_join([_base, _path]);

//     if (search) _path += `?${queryToString(search)}`;

//     return new URL(_path, _base);
// };

// export const $query = async <T extends Data, E = unknown>(options?: IRawRequestOptions<HttpMethod.GET>) => {
//     const { base_url, key, params, path, raw_options, remember, timeout } = options!;

//     const _request = createQuery("");
// };

export const raw_request = async <M extends HttpMethod, T extends Data, E = unknown>(options?: IRawRequestOptions<M>) /* : Promise<Result<T, E>> */ => {
    // if (_key) {
    //     const cached_response = getCachedResponse(_key);
    //     if (cached_response) {
    //         if (Date.now() - cached_response.timestamp < DEFAULTS.CACHE_TTL)
    //             // cache is still valide
    //             return responseToSuccessResult<T>(cached_response.response, _key);
    //         else {
    //             clearCachedResponse(_key); // the key existed for more than an hour
    //         }
    //     }
    // }
    // // generate a random key in case of a none-provided key beside the wish of remembering the request or caching the response
    // const key = (cache || remember) && !_key ? uuid() : _key;
    // if (remember) store_request(payload!, key);
    // const end_point = path_join(base_url!, path!);
    // const query = params ? payload_to_query(params) : "";
    // const { controller, clear } = createAbortion({
    //     timeout: timeout!,
    //     reason: "Request timeout exceeded",
    // });
    // const headers = {
    //     ...default_headers(options),
    //     ...options?.headers,
    // };
    // const _options: RequestInit = {
    //     // keep same order !
    //     signal: controller.signal,
    //     method: method,
    //     // @ts-ignore
    //     body: payload?.data,
    //     ...options,
    //     headers,
    // };
    // try {
    //     const response = await fetch(end_point + query, _options);
    //     checkResponse(response);
    //     // cache only on a success response
    //     if (cache) cacheResponse(key!, response);
    //     return responseToSuccessResult<T>(response, key);
    // } catch (error: any) {
    //     console.error("[request error]: ", error);
    //     return { error, message: errMsg(error), success: false, key };
    // } finally {
    //     clear();
    // }
};

import { RequestError } from "../http-error";
import logger from "../logger";
import handleError from "./error";

interface FetchOption extends RequestInit {
  timeout?: number;
}

export const fetchHandler = async <T>(
  url: string,
  options: FetchOption = {}
): Promise<ActionResponse<T>> => {
  const {
    timeout = 5000,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeader: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers = {
    ...defaultHeader,
    ...customHeaders,
  };

  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(id);

    if (!response.ok) {
      throw new RequestError(
        response.status,
        `HTTP error: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (err) {
    const error = isError(err) ? err : new Error("Unknown error");

    if (error.name === "AbortError") {
      logger.warn(`Request to ${url} timed out`);
    } else {
      logger.error(`Error fetching ${url}: ${error.message}`);
    }

    return handleError(error) as ActionResponse<T>;
  }
};

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

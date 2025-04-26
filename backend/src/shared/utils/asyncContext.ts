import { AsyncLocalStorage } from "async_hooks";

interface RequestContext {
  correlationId: string;
}

export const asyncLocalStorage = new AsyncLocalStorage<RequestContext>();

export const getContext = (): RequestContext | undefined => {
  return asyncLocalStorage.getStore();
};

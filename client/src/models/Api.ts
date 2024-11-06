/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Customer {
  /** @format int32 */
  id?: number;
  name?: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  orders?: Order[];
}

export interface Order {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  orderDate?: string;
  /** @format date */
  deliveryDate?: string | null;
  status?: string;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number | null;
  customer?: Customer | null;
  orderEntries?: OrderEntry[];
}

export interface OrderEntry {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  productId?: number | null;
  /** @format int32 */
  orderId?: number | null;
  order?: Order | null;
  product?: Paper | null;
}

export interface Paper {
  /** @format int32 */
  id?: number;
  name?: string;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
  picture?: string;
  description?: string;
  orderEntries?: OrderEntry[];
  properties?: Property[];
}

export interface Property {
  /** @format int32 */
  id?: number;
  propertyName?: string;
  papers?: Paper[];
}

export interface CreateCustomerDto {
  name?: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface UpdateCustomerDto {
  /** @format int32 */
  id?: number;
  name?: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
}

export interface OrderDto {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  orderDate?: string;
  /** @format date */
  deliveryDate?: string | null;
  status?: string;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number | null;
  orderEntries?: OrderEntryDto[];
}

export interface OrderEntryDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  productId?: number | null;
  /** @format int32 */
  orderId?: number | null;
}

export interface CreateOrderDto {
  /** @format int32 */
  customerId?: number | null;
  orderEntries?: CreateOrderEntryDto[];
}

export interface CreateOrderEntryDto {
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  productId?: number | null;
}

export interface UpdateOrderDto {
  /** @format int32 */
  id?: number;
  /** @format date-time */
  orderDate?: string;
  /** @format date */
  deliveryDate?: string | null;
  status?: string;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number | null;
}

export interface CreatePaperDto {
  name?: string;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
  picture?: string;
  description?: string;
}

export interface UpdatePaperDto {
  /** @format int32 */
  id?: number;
  name?: string;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
  picture?: string;
  description?: string;
}

export interface PaperDto {
  /** @format int32 */
  id?: number;
  name?: string;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  /** @format double */
  price?: number;
  picture?: string;
  description?: string;
  property?: PropertyDto[];
}

export interface PropertyDto {
  /** @format int32 */
  id?: number;
  name?: string;
}

export interface CreatePropertyDto {
  name?: string;
}

export interface UpdatePropertyDto {
  /** @format int32 */
  id?: number;
  name?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:5000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title My Title
 * @version 1.0.0
 * @baseUrl http://localhost:5000
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Customer
     * @name CustomerCreateCustomer
     * @request POST:/api/Customer
     */
    customerCreateCustomer: (data: CreateCustomerDto, params: RequestParams = {}) =>
      this.request<Customer, any>({
        path: `/api/Customer`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customer
     * @name CustomerUpdateCustomer
     * @request PUT:/api/Customer
     */
    customerUpdateCustomer: (data: UpdateCustomerDto, params: RequestParams = {}) =>
      this.request<Customer, any>({
        path: `/api/Customer`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Customer
     * @name CustomerGetAllCustomers
     * @request GET:/api/Customer
     */
    customerGetAllCustomers: (params: RequestParams = {}) =>
      this.request<Customer[], any>({
        path: `/api/Customer`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderCreateOrder
     * @request POST:/api/Order
     */
    orderCreateOrder: (data: CreateOrderDto, params: RequestParams = {}) =>
      this.request<OrderDto, any>({
        path: `/api/Order`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderGetAllOrders
     * @request GET:/api/Order
     */
    orderGetAllOrders: (params: RequestParams = {}) =>
      this.request<OrderDto[], any>({
        path: `/api/Order`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderUpdateOrder
     * @request PUT:/api/Order
     */
    orderUpdateOrder: (data: UpdateOrderDto, params: RequestParams = {}) =>
      this.request<OrderDto, any>({
        path: `/api/Order`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Order
     * @name OrderGetOrdersByCustomerId
     * @request GET:/api/Order/customer/{customerId}
     */
    orderGetOrdersByCustomerId: (customerId: number, params: RequestParams = {}) =>
      this.request<OrderDto[], any>({
        path: `/api/Order/customer/${customerId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags OrderEntry
     * @name OrderEntryCreateOrderEntry
     * @request POST:/api/OrderEntry
     */
    orderEntryCreateOrderEntry: (data: CreateOrderEntryDto, params: RequestParams = {}) =>
      this.request<OrderEntryDto, any>({
        path: `/api/OrderEntry`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperCreatePaper
     * @request POST:/api/Paper
     */
    paperCreatePaper: (data: CreatePaperDto, params: RequestParams = {}) =>
      this.request<Paper, any>({
        path: `/api/Paper`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperUpdatePaper
     * @request PUT:/api/Paper
     */
    paperUpdatePaper: (data: UpdatePaperDto, params: RequestParams = {}) =>
      this.request<Paper, any>({
        path: `/api/Paper`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperGetAllPapers
     * @request GET:/api/Paper
     */
    paperGetAllPapers: (params: RequestParams = {}) =>
      this.request<PaperDto[], any>({
        path: `/api/Paper`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperDeletePaper
     * @request DELETE:/api/Paper/{id}
     */
    paperDeletePaper: (id: number, params: RequestParams = {}) =>
      this.request<Paper, any>({
        path: `/api/Paper/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperGetPaperById
     * @request GET:/api/Paper/{id}
     */
    paperGetPaperById: (id: number, params: RequestParams = {}) =>
      this.request<Paper, any>({
        path: `/api/Paper/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperAddPropertyToPaper
     * @request POST:/api/Paper/addPropertyToPaper
     */
    paperAddPropertyToPaper: (
      query?: {
        /** @format int32 */
        paperId?: number;
        /** @format int32 */
        propertyId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Paper, any>({
        path: `/api/Paper/addPropertyToPaper`,
        method: "POST",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperRemovePropertyFromPaper
     * @request DELETE:/api/Paper/removePropertyFromPaper
     */
    paperRemovePropertyFromPaper: (
      query?: {
        /** @format int32 */
        paperId?: number;
        /** @format int32 */
        propertyId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Paper, any>({
        path: `/api/Paper/removePropertyFromPaper`,
        method: "DELETE",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperGetPaperProperties
     * @request GET:/api/Paper/getPaperProperties
     */
    paperGetPaperProperties: (
      query?: {
        /** @format int32 */
        paperId?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Property[], any>({
        path: `/api/Paper/getPaperProperties`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperGetPaperByPrice
     * @request GET:/api/Paper/getPaperByPrice
     */
    paperGetPaperByPrice: (params: RequestParams = {}) =>
      this.request<PaperDto[], any>({
        path: `/api/Paper/getPaperByPrice`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperGetPaperByName
     * @request GET:/api/Paper/getPaperByName
     */
    paperGetPaperByName: (params: RequestParams = {}) =>
      this.request<PaperDto[], any>({
        path: `/api/Paper/getPaperByName`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name PropertyCreateProperty
     * @request POST:/api/Property
     */
    propertyCreateProperty: (data: CreatePropertyDto, params: RequestParams = {}) =>
      this.request<Property, any>({
        path: `/api/Property`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name PropertyUpdateProperty
     * @request PUT:/api/Property
     */
    propertyUpdateProperty: (data: UpdatePropertyDto, params: RequestParams = {}) =>
      this.request<Property, any>({
        path: `/api/Property`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name PropertyGetAllProperties
     * @request GET:/api/Property
     */
    propertyGetAllProperties: (params: RequestParams = {}) =>
      this.request<Property[], any>({
        path: `/api/Property`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name PropertyDeleteProperty
     * @request DELETE:/api/Property/{id}
     */
    propertyDeleteProperty: (id: number, params: RequestParams = {}) =>
      this.request<Property, any>({
        path: `/api/Property/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Property
     * @name PropertyGetPropertyById
     * @request GET:/api/Property/{id}
     */
    propertyGetPropertyById: (id: number, params: RequestParams = {}) =>
      this.request<Property, any>({
        path: `/api/Property/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
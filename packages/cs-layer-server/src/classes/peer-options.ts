export interface IPeerOptions {
    readonly port?: number;
    readonly expire_timeout?: number;
    readonly alive_timeout?: number;
    readonly key?: string;
    readonly path?: string;
    readonly concurrent_limit?: number;
    readonly allow_discovery?: boolean;
    readonly proxied?: boolean | string;
    readonly cleanup_out_msgs?: number;
    readonly ssl?: {
      key: string;
      cert: string;
    };
    readonly generateClientId?: () => string;
  }
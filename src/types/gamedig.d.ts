declare module "gamedig" {
  export type GameDigQueryOptions = {
    type: string;
    host: string;
    port?: number;
    maxRetries?: number;
    socketTimeout?: number;
    attemptTimeout?: number;
    givenPortOnly?: boolean;
    requestPlayers?: boolean;
    requestRules?: boolean;
    ipFamily?: number;
  };

  export type GameDigQueryResult = {
    name?: string;
    map?: string;
    numplayers?: number;
    maxplayers?: number;
    ping?: number;
    connect?: string;
    raw?: Record<string, unknown>;
  };

  export class GameDig {
    static query(options: GameDigQueryOptions): Promise<GameDigQueryResult>;
  }
}

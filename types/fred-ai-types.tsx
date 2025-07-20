
import { NumberInputSlots } from "@heroui/theme";
import { Timestamp } from "firebase/firestore";

interface AlpacaAccount {
    id: string;
    account_number: string;
    status: 'ACTIVE' | 'INACTIVE';
    currency: string;
    buying_power: string;
    regt_buying_power: string;
    daytrading_buying_power: string;
    non_marginable_buying_power: string;
    cash: string;
    accrued_fees: string;
    portfolio_value: number;
    pattern_day_trader: boolean;
    trading_blocked: boolean;
    transfers_blocked: boolean;
    account_blocked: boolean;
    created_at: string;
    trade_suspended_by_user: boolean;
    multiplier: string;
    shorting_enabled: boolean;
    equity: string;
    last_equity: string;
    long_market_value: string;
    short_market_value: string;
    initial_margin: string;
    maintenance_margin: string;
    last_maintenance_margin: string;
    sma: string;
    daytrade_count: number;
}

interface AlpacaPosition {
    asset_id: string;
    symbol: string;
    exchange: string;
    asset_class: string;
    qty: string;
    avg_entry_price: string;
    side: 'long' | 'short';
    market_value: string;
    cost_basis: string;
    unrealized_pl: number;
    unrealized_plpc: number;
    current_price: string;
    change_today: string;
    lastday_price: string;
}

interface AlpacaOrder {
    id: string;
    client_order_id: string;
    created_at: Timestamp;
    updated_at: Timestamp;
    submitted_at: Timestamp;
    filled_at: Timestamp | null;
    expired_at: string | null;
    canceled_at: string | null;
    failed_at: string | null;
    replaced_at: string | null;
    replaced_by: string | null;
    replaces: string | null;
    asset_id: string;
    symbol: string;
    asset_class: 'us_equity' | string;
    notional: string | null;
    qty: string;
    filled_qty: string;
    filled_avg_price: string | null;
    order_class: '' | 'simple' | 'bracket' | 'oco' | 'oto';
    order_type: 'limit' | 'market' | 'stop' | 'stop_limit';
    type: 'limit' | 'market' | 'stop' | 'stop_limit';
    side: 'buy' | 'sell';
    time_in_force: 'gtc' | 'day' | 'ioc' | 'fok';
    limit_price: string | null;
    stop_price: string | null;
    status: 'accepted' | 'new' | 'filled' | 'canceled' | 'expired';
    extended_hours: boolean;
    legs: AlpacaOrder[] | null;
    trail_percent: string | null;
    trail_price: string | null;
    hwm: string | null;
    subtag: string | null;
    source: string | null;
}

interface Stock {
    exchange: string;
    industry: string;
    live_stance: string;
    logo: string;
    market_cap: number;
    name: string;
    symbol: string;
    timestamp: Timestamp;
    updates: string[];
}

interface Price {
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
}

interface FirebaseTimestamp {
    seconds: number;
    nanoseconds: number;
}

interface Update {
    id: string;
    defense: string;
    name: string;
    price: Price;
    sources: string[];
    prev_stance: string;
    stance: string;
    summary: string;
    symbol: string;
    timestamp: Timestamp;
}

export type {
    AlpacaAccount,
    AlpacaPosition,
    AlpacaOrder,
    Stock,
    Update
}

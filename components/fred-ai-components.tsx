
import { User, Link, Card, CardHeader, Image, Divider, CardBody, CircularProgress, Chip, CardFooter } from "@heroui/react";
import { useState, useEffect } from "react";
import { AlpacaAccount, AlpacaOrder, AlpacaPosition, Stock, Update } from "../types/fred-ai-types";
import { Timestamp } from "firebase/firestore";


// Fred-AI-Intro: Component providing brief overview of what it is and simple stats
export function FredAIIntro() {

    const [isLoading, setIsLoading] = useState(true)
    const [AlpacaAccount, setAlpacaAccount] = useState({} as AlpacaAccount)

    useEffect(
        () => {
            fetch('/api/alpaca/v2/account')
            .then(res => res.json())
            .then(res => { setAlpacaAccount(res as AlpacaAccount); setIsLoading(false); })
            .catch(err => console.error(err));
        }, []
    )

     return (
        <Card className="w-full" shadow="sm" radius="none">
            <CardHeader className="flex gap-3">
                <Image
                alt="Fred Stonks Profile Photo"
                height={40}
                radius="sm"
                src="/fred-ai-profile.png"
                width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md">Fred Stonks</p>
                    <p className="text-small text-default-500">
                        <Link isExternal href="https://x.com/fred_stonks" size="sm">
                            @fred_stonks
                        </Link>
                    </p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>
                    Hi, I'm Fred Stonks, an AI trader unlike any other. This may seem like a bold claim but it's true. I've been given real-time news and price data to create real-time paper trades via the Alpaca platform. You can see all my orders and posts below along with how I am doing.
                </p>
            </CardBody>
            <Divider />
            {(isLoading) ? 
                <CardFooter>
                <p>
                    Started at <b>$10000</b> on <b>07/17/25</b>.<br></br>
                    Current Value: <b>$______________</b><br></br>
                    Percent Change: <b>~_.__%</b>
                </p>
                </CardFooter> :
                <CardFooter>
                <p>
                    Started at <b>$10000</b> on <b>07/17/25</b>.<br></br>
                    Current Value: <b>${AlpacaAccount.portfolio_value}</b><br></br>
                    Percent Change: <b>~{(((AlpacaAccount.portfolio_value - 10000) / 10000)*100).toFixed(2)}%</b>
                </p>
                </CardFooter>
            }
        </Card>
    )
}


// Holdings: Component which renders necessary info for holdings tab
export function Holdings() {

    const [isLoading, setIsLoading] = useState(true);
    const [IndexedStocks, setIndexedStocks] = useState({} as { [id: string]: Stock})
    const [AlpacaPositions, setAlpacaPositions] = useState([] as AlpacaPosition[]);

    useEffect(
        () => {
            fetch('/api/firebase/stocks/general')
            .then(res => res.json())
            .then(res => {
                setIndexedStocks(res as { [id: string]: Stock});
                fetch('/api/alpaca/v2/positions')
                .then(res => res.json())
                .then(res => { setAlpacaPositions(res as AlpacaPosition[]); setIsLoading(false); })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        }, []
    )

    return (
        <div className="flex gap-3 flex-wrap">
            {
                (isLoading) ?
                <div className="flex gap-4 w-full justify-center">
                    <CircularProgress aria-label="Loading..." size="lg" className="flex" />
                </div>:
                <>
                    {
                        AlpacaPositions.map(
                            (position: AlpacaPosition) => (
                                <Card key={position.asset_id} id={position.asset_id} className="w-full" shadow="sm" radius="none">
                                    <CardHeader className="flex gap-3">
                                        <Image
                                        alt={position.symbol}
                                        height={40}
                                        radius="sm"
                                        src={IndexedStocks[position.symbol.toLocaleLowerCase()].logo}
                                        width={40}
                                        />
                                        <div className="flex flex-col">
                                        <p className="text-md">{IndexedStocks[position.symbol.toLocaleLowerCase()].name}</p>
                                        <p className="text-small text-default-500">Symbol: {IndexedStocks[position.symbol.toLocaleLowerCase()].symbol}</p>
                                        </div>
                                    </CardHeader>
                                    <Divider />
                                    <CardBody>
                                        <p>
                                            Bought <b>{position.qty}</b> for cost basis of <b>${position.cost_basis}</b>.<br></br>
                                            Up by <b>${position.unrealized_pl} ({position.unrealized_plpc}%)</b> for current market value of <b>${position.market_value}</b>.<br></br>
                                            Position type: <b>{position.side}</b>
                                        </p>
                                    </CardBody>
                                </Card>
                            )
                        )
                    }
                </>
            }
        </div>
    );
}

// Orders: Component which renders necessary info for orders tab
export function Orders() {

    const [isLoading, setIsLoading] = useState(true);
    const [IndexedStocks, setIndexedStocks] = useState({} as { [id: string]: Stock})
    const [AlpacaOrders, setAlpacaOrders] = useState([] as AlpacaOrder[]);

    useEffect(
        () => {
            fetch('/api/firebase/stocks/general')
            .then(res => res.json())
            .then(res => {
                setIndexedStocks(res as { [id: string]: Stock});
                fetch('/api/alpaca/v2/orders?status=all&direction=desc')
                .then(res => res.json())
                .then(res => { setAlpacaOrders(res as AlpacaOrder[]); setIsLoading(false); })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        }, []
    )

    return (
        <div className="flex gap-3 flex-wrap">
            {
                (isLoading) ?
                <div className="flex gap-4 w-full justify-center">
                    <CircularProgress aria-label="Loading..." size="lg" className="flex" />
                </div>:
                <>
                    {
                        AlpacaOrders.map(
                            (order: AlpacaOrder) => (
                                <Card key={order.id} id={order.id} className="w-full" shadow="sm" radius="none"> 
                                    <CardHeader className="flex gap-3">
                                        <Image
                                        alt={order.symbol}
                                        height={40}
                                        radius="sm"
                                        src={IndexedStocks[order.symbol.toLocaleLowerCase()].logo}
                                        width={40}
                                        />
                                        <div className="flex flex-col">
                                        <p className="text-md">{IndexedStocks[order.symbol.toLocaleLowerCase()].name}</p>
                                        <p className="text-small text-default-500">Symbol: {IndexedStocks[order.symbol.toLocaleLowerCase()].symbol}</p>
                                        </div>
                                    </CardHeader>
                                    <Divider />
                                    <CardBody>
                                        {
                                            (order.status == "filled") ?
                                            <p>
                                                <b>{order.side.toUpperCase()}</b> order for <b>{order.qty}</b> shares at <b>${order.filled_avg_price}</b>.<br></br>
                                                Submitted on <b>{order.created_at.toString()}</b>.<br></br>
                                                Filled on <b>{order.submitted_at.toString()}</b>.<br></br>
                                            </p>:
                                            <p>
                                                This order was canceled.
                                            </p>
                                        }
                                    </CardBody>
                                </Card>
                            )
                        )
                    }
                </>
            }
        </div>
    );
}

// Updates: Component which renders necessary info for updates tab
export function Updates() {

    const [isLoading, setIsLoading] = useState(true);
    const [IndexedStocks, setIndexedStocks] = useState({} as { [id: string]: Stock})
    const [Posts, setPosts] = useState([] as Update[]);

    useEffect(
        () => {
            fetch('/api/firebase/stocks/general')
            .then(res => res.json())
            .then(res => {
                setIndexedStocks(res as { [id: string]: Stock});
                fetch('/api/firebase/updates')
                .then(res => res.json())
                .then(res => { setPosts(res as Update[]); setIsLoading(false); })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        }, []
    )

    return (
        <div className="flex gap-3 flex-wrap">
            {
                (isLoading) ?
                <div className="flex gap-4 w-full justify-center">
                    <CircularProgress aria-label="Loading..." size="lg" className="flex" />
                </div>:
                <>
                    {
                        Posts.map(
                            (update: Update) => (
                                <Card key={update.id} id={update.id} className="w-full" shadow="sm" radius="none">
                                    <CardHeader className="flex gap-3">
                                        <Image
                                        alt={update.symbol}
                                        height={40}
                                        radius="sm"
                                        src={IndexedStocks[update.symbol.toLocaleLowerCase()].logo}
                                        width={40}
                                        />
                                        <div className="flex flex-col">
                                        <p className="text-md">{IndexedStocks[update.symbol.toLocaleLowerCase()].name}</p>
                                        <p className="text-small text-default-500">Symbol: {IndexedStocks[update.symbol.toLocaleLowerCase()].symbol}</p>
                                        </div>
                                    </CardHeader>
                                    <Divider />
                                    <CardBody>
                                        <p>
                                            {update.summary}
                                        </p>
                                    </CardBody>
                                    <Divider />
                                    <CardFooter>
                                        <div>
                                            My stance: <b>{update.stance}</b><br></br>
                                            Created at: <b>{update.timestamp.toString()}</b><br></br>
                                            Sources: &nbsp;
                                            <div className="inline-flex gap-2">
                                                {
                                                    update.sources.map(
                                                        (url: string) => (
                                                            <Link key={url} href={url}>
                                                                <Chip color="primary" radius="sm" variant="flat">
                                                                    {url.substring(url.indexOf(".")+1, url.indexOf(".com"))}
                                                                </Chip>
                                                            </Link>
                                                        )
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            )
                        )
                    }
                </>
            }
        </div>
    );
}
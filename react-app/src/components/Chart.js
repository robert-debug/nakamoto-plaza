import React, {useEffect, useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createChart } from 'lightweight-charts';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label } from 'recharts'
import { CoinStateContext } from '../context/CoinContext'
import { timeSpans, onYear, onMonth, onWeek, onDay, onHour } from './Home'
const Chart = ( { props } ) =>{
    console.log(props)
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [lineArray, setLineArray] = useState([])
    const coins = useSelector(state => state.coin)
    const userCoins = useSelector(state => state.coin.userCoins)
    const spark = useSelector(state => state.coin.spark)
    const { coinDisplay, setCoinDisplay } = useContext(CoinStateContext)
    const toolTipStyle = { 'border-radius':'20px', 'color':'#F4F4F4'}
    const contentStyle = { 'font-family': 'Roboto'}
    let data = [];

    // const [selectedCoin, setSelectedCoin] = useState('BTC')
    // useEffect(()=>{
    //     setSelectedCoin(props)
    // }, [props])
    // props=props
    // console.log(selectedCoin)
               
    if(!userCoins || !coins || !spark ) return (<p>Loading...</p>) 
    if (props === '1h'){
        for (const key in spark['Time Series Crypto (5min)']){
            
            data.unshift({ 'time': key.slice(11,19), 'price': spark['Time Series Crypto (5min)'][key]['4. close']})
        }
        data.splice(0,87)
    }
    if (props === '1d'){

        for (const key in spark['Time Series Crypto (30min)']){
            console.log('############################################', data.length)
            data.unshift({ 'time': key.slice(11,19), 'price': `${spark['Time Series Crypto (30min)'][key]['4. close']}`})
        }
    }
    if (props === '1w'){
        let i = 0;
        for (const key in spark['Time Series (Digital Currency Daily)']){
            data.unshift({ 'time': key, 'price': spark['Time Series (Digital Currency Daily)'][key]['4b. close (USD)']})
            console.log('############################################', spark['Time Series (Digital Currency Daily)'][key]['4b. close (USD)'])
            i++;
            if (i > 6) break;
        }
    }
    if (props === '1m'){
        let i = 0;
        for (const key in spark['Time Series (Digital Currency Daily)']){
            data.unshift({ 'time': key, 'price': spark['Time Series (Digital Currency Daily)'][key]['4b. close (USD)']})
            console.log('############################################', spark['Time Series (Digital Currency Daily)'][key]['4b. close (USD)'])
            i++;
            if (i > 29) break;
        }
    }
    if (props === '1y'){
        let i = 0;
        for (const key in spark['Time Series (Digital Currency Weekly)']){
            data.unshift({ 'time': key, 'price': spark['Time Series (Digital Currency Weekly)'][key]['4b. close (USD)']})
            console.log('############################################', spark['Time Series (Digital Currency Weekly)'][key]['4b. close (USD)'])
            i++;
            if (i > 29) break;
        }
    }

    // const customLabel=()

    return (
        <div className='chart-info-container'>
            {/* <div className='chart-top-div'>
                <h2>{coins[props].price}</h2>
                <img alt={`${coins[coinDisplay].id}-logo`}src={coins[coinDisplay].logo_url} className='coin-logo'/>
                <span value={coins[coinDisplay].id}>{coins[coinDisplay].name}</span>
                <span value={coins[coinDisplay].id}>{coins[coinDisplay].symbol}</span>
            </div> */}

                <LineChart
                    width={1100}
                    height={400}
                    data={data}
                    margin={{
                    top: 5,
                right: 30,
                left: 90,
                bottom: 5
                }}> 
                <Line type='monotone' dataKey='price' stroke='#1652F0' dot={false}/>
                <CartesianGrid vertical={false} horizontal={false}/>
                <XAxis  tick={{ 'font-size': '1rem', 'font-family': 'Roboto', 'color': '#F4F4F4'}} dataKey="time" />
                <YAxis hide={true} tick={{ 'font-size': '1rem', 'font-family': 'Roboto', 'color': '#F4F4F4'}}>
                </YAxis>
                <Tooltip wrapperStyle={{backgroundColor:'lightgray'}}labelStyle={{ fontSize: '1rem', fontFamily: "'Roboto', sans-serif"}}  />
            </LineChart>
        </div>
    )
}

export default Chart;

// coin: {
//     id: 'BTC',
//     currency: 'BTC',
//     symbol: 'BTC',
//     name: 'Bitcoin',
//     logo_url: 'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg',
//     status: 'active',
//     price: '55873.94462825',
//     price_date: '2021-05-11T00:00:00Z',
//     price_timestamp: '2021-05-11T14:21:00Z',
//     circulating_supply: '18706831',
//     max_supply: '21000000',
//     market_cap: '1045224439464',
//     num_exchanges: '384',
//     num_pairs: '60177',
//     num_pairs_unmapped: '5069',
//     first_candle: '2011-08-18T00:00:00Z',
//     first_trade: '2011-08-18T00:00:00Z',
//     first_order_book: '2017-01-06T00:00:00Z',
//     rank: '1',
//     high: '63511.58620446',
//     high_timestamp: '2021-04-13T00:00:00Z',
//     '1h': {
//       volume: '2667820659.85',
//       price_change: '536.37230863',
//       price_change_pct: '0.0097',
//       volume_change: '-1304633828.53',
//       volume_change_pct: '-0.3284',
//       market_cap_change: '10033826130.62',
//       market_cap_change_pct: '0.0097'
//     },
//     '1d': {
//       volume: '88571716108.29',
//       price_change: '-1557.67190355',
//       price_change_pct: '-0.0271',
//       volume_change: '10177837285.81',
//       volume_change_pct: '0.1298',
//       market_cap_change: '-29079491035.19',
//       market_cap_change_pct: '-0.0271'
//     }
//   },
// spark: {
//     'Meta Data': {
//       '1. Information': 'Crypto Intraday (5min) Time Series',
//       '2. Digital Currency Code': 'BTC',
//       '3. Digital Currency Name': 'Bitcoin',
//       '4. Market Code': 'USD',
//       '5. Market Name': 'United States Dollar',
//       '6. Last Refreshed': '2021-05-11 14:45:00',
//       '7. Interval': '5min',
//       '8. Output Size': 'Compact',
//       '9. Time Zone': 'UTC'
//     },
//     'Time Series Crypto (5min)': {
//       '2021-05-11 14:45:00': {
//         '1. open': '55799.95000',
//         '2. high': '55799.95000',
//         '3. low': '55525.43000',
//         '4. close': '55669.60000',
//         '5. volume': 305
//       },
//       '2021-05-11 14:40:00': {
//         '1. open': '55666.66000',
//         '2. high': '55810.00000',
//         '3. low': '55643.14000',
//         '4. close': '55799.96000',
//         '5. volume': 178
//       },
//       '2021-05-11 14:35:00': {
//         '1. open': '55691.43000',
//         '2. high': '55697.13000',
//         '3. low': '55555.55000',
//         '4. close': '55666.65000',
//         '5. volume': 309
//       },
//       '2021-05-11 14:30:00': {
//         '1. open': '55851.60000',
//         '2. high': '55861.16000',
//         '3. low': '55580.06000',
//         '4. close': '55691.43000',
//         '5. volume': 250
//       },
//       '2021-05-11 14:25:00': {
//         '1. open': '55752.36000',
//         '2. high': '55874.98000',
//         '3. low': '55720.20000',
//         '4. close': '55851.60000',
//         '5. volume': 267
//       },
//       '2021-05-11 14:20:00': {
//         '1. open': '55784.49000',
//         '2. high': '55846.48000',
//         '3. low': '55665.60000',
//         '4. close': '55747.91000',
//         '5. volume': 188
//       },
//       '2021-05-11 14:15:00': {
//         '1. open': '55800.61000',
//         '2. high': '55885.77000',
//         '3. low': '55675.67000',
//         '4. close': '55784.49000',
//         '5. volume': 253
//       },
//       '2021-05-11 14:10:00': {
//         '1. open': '55575.70000',
//         '2. high': '55852.53000',
//         '3. low': '55547.62000',
//         '4. close': '55800.60000',
//         '5. volume': 315
//       },
//       '2021-05-11 14:05:00': {
//         '1. open': '55604.86000',
//         '2. high': '55678.64000',
//         '3. low': '55485.14000',
//         '4. close': '55575.69000',
//         '5. volume': 248
//       },
//       '2021-05-11 14:00:00': {
//         '1. open': '55750.00000',
//         '2. high': '55796.24000',
//         '3. low': '55589.86000',
//         '4. close': '55612.26000',
//         '5. volume': 330
//       },
//       '2021-05-11 13:55:00': {
//         '1. open': '55625.48000',
//         '2. high': '55760.01000',
//         '3. low': '55503.85000',
//         '4. close': '55750.00000',
//         '5. volume': 326
//       },
//       '2021-05-11 13:50:00': {
//         '1. open': '55480.44000',
//         '2. high': '55700.00000',
//         '3. low': '55473.24000',
//         '4. close': '55625.48000',
//         '5. volume': 396
//       },
//       '2021-05-11 13:45:00': {
//         '1. open': '55326.89000',
//         '2. high': '55486.45000',
//         '3. low': '55220.56000',
//         '4. close': '55480.44000',
//         '5. volume': 350
//       },
//       '2021-05-11 13:40:00': {
//         '1. open': '55093.52000',
//         '2. high': '55379.05000',
//         '3. low': '55066.45000',
//         '4. close': '55326.90000',
//         '5. volume': 254
//       },
//       '2021-05-11 13:35:00': {
//         '1. open': '55205.19000',
//         '2. high': '55378.54000',
//         '3. low': '55058.88000',
//         '4. close': '55094.21000',
//         '5. volume': 266
//       },
//       '2021-05-11 13:30:00': {
//         '1. open': '54991.55000',
//         '2. high': '55214.42000',
//         '3. low': '54875.00000',
//         '4. close': '55205.18000',
//         '5. volume': 371
//       },
// spark: {
//     'Meta Data': {
//       '1. Information': 'Daily Prices and Volumes for Digital Currency',
//       '2. Digital Currency Code': 'BTC',
//       '3. Digital Currency Name': 'Bitcoin',
//       '4. Market Code': 'CNY',
//       '5. Market Name': 'Chinese Yuan',
//       '6. Last Refreshed': '2021-05-11 00:00:00',
//       '7. Time Zone': 'UTC'
//     },
//     'Time Series (Digital Currency Daily)': {
//       '2021-05-11': {
//         '1a. open (CNY)': '358166.58876600',
//         '1b. open (USD)': '55816.14000000',
//         '2a. high (CNY)': '362140.83161200',
//         '2b. high (USD)': '56435.48000000',
//         '3a. low (CNY)': '355751.13926800',
//         '3b. low (USD)': '55439.72000000',
//         '4a. close (CNY)': '360191.44156100',
//         '4b. close (USD)': '56131.69000000',
//         '5. volume': '2246.82218500',
//         '6. market cap (USD)': '2246.82218500'
//       },
//       '2021-05-10': {
//         '1a. open (CNY)': '373725.58202700',
//         '1b. open (USD)': '58240.83000000',
//         '2a. high (CNY)': '381805.55000000',
//         '2b. high (USD)': '59500.00000000',
//         '3a. low (CNY)': '342662.46000000',
//         '3b. low (USD)': '53400.00000000',
//         '4a. close (CNY)': '358166.58876600',
//         '4b. close (USD)': '55816.14000000',
//         '5. volume': '89586.34925000',
//         '6. market cap (USD)': '89586.34925000'
//       },
//       '2021-05-09': {
//         '1a. open (CNY)': '377740.63635700',
//         '1b. open (USD)': '58866.53000000',
//         '2a. high (CNY)': '380522.17000000',
//         '2b. high (USD)': '59300.00000000',
//         '3a. low (CNY)': '360858.60665400',
//         '3b. low (USD)': '56235.66000000',
//         '4a. close (CNY)': '373725.64619600',
//         '4b. close (USD)': '58240.84000000',
//         '5. volume': '69806.11991000',
//         '6. market cap (USD)': '69806.11991000'
//       },
//       '2021-05-08': {
//         '1a. open (CNY)': '367787.76778100',
//         '1b. open (USD)': '57315.49000000',
//         '2a. high (CNY)': '381805.55000000',
//         '2b. high (USD)': '59500.00000000',
//         '3a. low (CNY)': '365121.61000000',
//         '3b. low (USD)': '56900.00000000',
//         '4a. close (CNY)': '377711.88864500',
//         '4b. close (USD)': '58862.05000000',
//         '5. volume': '69709.90602800',
//         '6. market cap (USD)': '69709.90602800'
//       },
//       '2021-05-07': {
//         '1a. open (CNY)': '361872.60519200',
//         '1b. open (USD)': '56393.68000000',
//         '2a. high (CNY)': '376351.18500000',
//         '2b. high (USD)': '58650.00000000',
//         '3a. low (CNY)': '354480.01554700',
//         '3b. low (USD)': '55241.63000000',
//         '4a. close (CNY)': '367783.01927500',
//         '4b. close (USD)': '57314.75000000',
//         '5. volume': '74542.74782900',
//         '6. market cap (USD)': '74542.74782900'
//       },
//       '2021-05-06': {
//         '1a. open (CNY)': '368561.77425900',
//         '1b. open (USD)': '57436.11000000',
//         '2a. high (CNY)': '374490.28400000',
//         '2b. high (USD)': '58360.00000000',
//         '3a. low (CNY)': '354212.88000000',
//         '3b. low (USD)': '55200.00000000',
//         '4a. close (CNY)': '361872.60519200',
//         '4b. close (USD)': '56393.68000000',
//         '5. volume': '70181.67190800',
//         '6. market cap (USD)': '70181.67190800'
//       },
//       '2021-05-05': {
//         '1a. open (CNY)': '341411.48534500',
//         '1b. open (USD)': '53205.05000000',
//         '2a. high (CNY)': '372628.22795800',
//         '2b. high (USD)': '58069.82000000',
//         '3a. low (CNY)': '339454.01000000',
//         '3b. low (USD)': '52900.00000000',
//         '4a. close (CNY)': '368561.77425900',
//         '4b. close (USD)': '57436.11000000',
//         '5. volume': '77263.92343900',
//         '6. market cap (USD)': '77263.92343900'
//       },
//       '2021-05-04': {
//         '1a. open (CNY)': '366850.25869100',
//         '1b. open (USD)': '57169.39000000',
//         '2a. high (CNY)': '367046.68000000',
//         '2b. high (USD)': '57200.00000000',
//         '3a. low (CNY)': '340395.30506100',
//         '3b. low (USD)': '53046.69000000',
//         '4a. close (CNY)': '341379.14416900',
//         '4b. close (USD)': '53200.01000000',
//         '5. volume': '85324.62590300',
//         '6. market cap (USD)': '85324.62590300'
//       },
//       '2021-05-03': {
//         '1a. open (CNY)': '363056.71574900',
//         '1b. open (USD)': '56578.21000000',
//         '2a. high (CNY)': '378478.00233600',
//         '2b. high (USD)': '58981.44000000',
//         '3a. low (CNY)': '362137.75150000',
//         '3b. low (USD)': '56435.00000000',
//         '4a. close (CNY)': '366850.25869100',
//         '4b. close (USD)': '57169.39000000',
//         '5. volume': '57649.93128600',
//         '6. market cap (USD)': '57649.93128600'
//       },
//       '2021-05-02': {
//         '1a. open (CNY)': '370879.81521500',
//         '1b. open (USD)': '57797.35000000',
//         '2a. high (CNY)': '371609.22423800',
//         '2b. high (USD)': '57911.02000000',
//         '3a. low (CNY)': '359572.59572500',
//         '3b. low (USD)': '56035.25000000',
//         '4a. close (CNY)': '363056.71574900',
//         '4b. close (USD)': '56578.21000000',
//         '5. volume': '36812.87886300',
//         '6. market cap (USD)': '36812.87886300'
//       },
//       '2021-05-01': {
//         '1a. open (CNY)': '370237.48352500',
//         '1b. open (USD)': '57697.25000000',
//         '2a. high (CNY)': '375119.58938300',
//         '2b. high (USD)': '58458.07000000',
//         '3a. low (CNY)': '365481.85476600',
//         '3b. low (USD)': '56956.14000000',
//         '4a. close (CNY)': '370899.19425300',
//         '4b. close (USD)': '57800.37000000',
//         '5. volume': '42600.35183600',
//         '6. market cap (USD)': '42600.35183600'
//       },
//       '2021-04-30': {
//         '1a. open (CNY)': '343657.07950000',
//         '1b. open (USD)': '53555.00000000',
//         '2a. high (CNY)': '371942.77470000',
//         '2b. high (USD)': '57963.00000000',
//         '3a. low (CNY)': '340179.18386900',
//         '3b. low (USD)': '53013.01000000',
//         '4a. close (CNY)': '370218.36116300',
//         '4b. close (USD)': '57694.27000000',
//         '5. volume': '68578.91004500',
//         '6. market cap (USD)': '68578.91004500'
//       },
//       '2021-04-29': {
//         '1a. open (CNY)': '351942.77328700',
//         '1b. open (USD)': '54846.23000000',
//         '2a. high (CNY)': '354186.18569600',
//         '2b. high (USD)': '55195.84000000',
//         '3a. low (CNY)': '335802.40888600',
//         '3b. low (USD)': '52330.94000000',
//         '4a. close (CNY)': '343657.07950000',
//         '4b. close (USD)': '53555.00000000',
//         '5. volume': '52486.01945500',
//         '6. market cap (USD)': '52486.01945500'
//       },
//       '2021-04-28': {
//         '1a. open (CNY)': '353006.31029300',
//         '1b. open (USD)': '55011.97000000',
//         '2a. high (CNY)': '362092.83320000',
//         '2b. high (USD)': '56428.00000000',
//         '3a. low (CNY)': '345313.66640400',
//         '3b. low (USD)': '53813.16000000',
//         '4a. close (CNY)': '351942.70911800',
//         '4b. close (USD)': '54846.22000000',
//         '5. volume': '55130.45901500',
//         '6. market cap (USD)': '55130.45901500'
//       },
//       '2021-04-27': {
//         '1a. open (CNY)': '346521.45532200',
//         '1b. open (USD)': '54001.38000000',
//         '2a. high (CNY)': '355881.27400000',
//         '2b. high (USD)': '55460.00000000',
//         '3a. low (CNY)': '341520.25180000',
//         '3b. low (USD)': '53222.00000000',
//         '4a. close (CNY)': '353006.31029300',
//         '4b. close (USD)': '55011.97000000',
//         '5. volume': '54064.03467500',
//         '6. market cap (USD)': '54064.03467500'
//       },

// spark: {
//     'Meta Data': {
//       '1. Information': 'Weekly Prices and Volumes for Digital Currency',
//       '2. Digital Currency Code': 'BTC',
//       '3. Digital Currency Name': 'Bitcoin',
//       '4. Market Code': 'USD',
//       '5. Market Name': 'United States Dollar',
//       '6. Last Refreshed': '2021-05-11 00:00:00',
//       '7. Time Zone': 'UTC'
//     },
//     'Time Series (Digital Currency Weekly)': {
//       '2021-05-11': {
//         '1a. open (USD)': '58240.83000000',
//         '1b. open (USD)': '58240.83000000',
//         '2a. high (USD)': '59500.00000000',
//         '2b. high (USD)': '59500.00000000',
//         '3a. low (USD)': '53400.00000000',
//         '3b. low (USD)': '53400.00000000',
//         '4a. close (USD)': '56131.69000000',
//         '4b. close (USD)': '56131.69000000',
//         '5. volume': '91833.17143500',
//         '6. market cap (USD)': '91833.17143500'
//       },
//       '2021-05-09': {
//         '1a. open (USD)': '56578.21000000',
//         '1b. open (USD)': '56578.21000000',
//         '2a. high (USD)': '59500.00000000',
//         '2b. high (USD)': '59500.00000000',
//         '3a. low (USD)': '52900.00000000',
//         '3b. low (USD)': '52900.00000000',
//         '4a. close (USD)': '58240.84000000',
//         '4b. close (USD)': '58240.84000000',
//         '5. volume': '504478.92630300',
//         '6. market cap (USD)': '504478.92630300'
//       },
//       '2021-05-02': {
//         '1a. open (USD)': '49066.76000000',
//         '1b. open (USD)': '49066.76000000',
//         '2a. high (USD)': '58458.07000000',
//         '2b. high (USD)': '58458.07000000',
//         '3a. low (USD)': '48753.44000000',
//         '3b. low (USD)': '48753.44000000',
//         '4a. close (USD)': '56578.21000000',
//         '4b. close (USD)': '56578.21000000',
//         '5. volume': '395983.45601300',
//         '6. market cap (USD)': '395983.45601300'
//       },
//       '2021-04-25': {
//         '1a. open (USD)': '56150.01000000',
//         '1b. open (USD)': '56150.01000000',
//         '2a. high (USD)': '57526.81000000',
//         '2b. high (USD)': '57526.81000000',
//         '3a. low (USD)': '46930.00000000',
//         '3b. low (USD)': '46930.00000000',
//         '4a. close (USD)': '49066.77000000',
//         '4b. close (USD)': '49066.77000000',
//         '5. volume': '568462.85096000',
//         '6. market cap (USD)': '568462.85096000'
//       },
//       '2021-04-18': {
//         '1a. open (USD)': '59998.80000000',
//         '1b. open (USD)': '59998.80000000',
//         '2a. high (USD)': '64854.00000000',
//         '2b. high (USD)': '64854.00000000',
//         '3a. low (USD)': '50931.30000000',
//         '3b. low (USD)': '50931.30000000',
//         '4a. close (USD)': '56150.01000000',
//         '4b. close (USD)': '56150.01000000',
//         '5. volume': '549048.29803200',
//         '6. market cap (USD)': '549048.29803200'
//       },
//       '2021-04-11': {
//         '1a. open (USD)': '58202.01000000',
//         '1b. open (USD)': '58202.01000000',
//         '2a. high (USD)': '61500.00000000',
//         '2b. high (USD)': '61500.00000000',
//         '3a. low (USD)': '55473.00000000',
//         '3b. low (USD)': '55473.00000000',
//         '4a. close (USD)': '60002.43000000',
//         '4b. close (USD)': '60002.43000000',
//         '5. volume': '375865.59361400',
//         '6. market cap (USD)': '375865.59361400'
//       },
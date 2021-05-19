import React, {useEffect, useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createChart } from 'lightweight-charts';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label } from 'recharts'
import { CoinStateContext } from '../context/CoinContext'
import { timeSpans, onYear, onMonth, onWeek, onDay, onHour } from './Home'
const HardChart = ( { props } ) =>{
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

export default HardChart;
![banner](https://github.com/robert-debug/nakamoto-plaza/blob/master/react-app/src/image-assets/color_logo_with_background.png)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

## Project Overview

***[Nakamoto Plaza](https://nakamoto-plaza.herokuapp.com/)*** is a clone of coinbase.com, an app that focuses on helping users buy, sell, send, and receive cryptocurrencies. Users see recent coin price and coin information, and simulate buying, selling, sending, or receiving coins to fictional wallets. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

The goal of this week and a half long, full-stack project was to have 4 fully functional core MVP features finished, which include:  
- User accounts- Users can signup for accounts and simulated vaults and login/logout
- Coins- Users can see current and historical coin data in tables and charts, including holding data 
- Transactions- Users can 'buy' and 'sell' coins at current market prices which is recorded, and updates their vaults
- Transfers - allow users the ability to send and receive 'coins' to other users accounts


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

### Login/Signup

When a user navigates to Nakamoto Plaza he is presented with a login form, a demo button, and a link to a signup form. From here the user logins as a existing user, or demo user, or creates a new account, which then creates vault and vault coins for them.

![Sign Up](https://github.com/robert-debug/nakamoto-plaza/blob/master/react-app/src/image-assets/readme-images/SignupForm.png)
![Login](https://github.com/robert-debug/nakamoto-plaza/blob/master/react-app/src/image-assets/readme-images/LoginForm.png)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

### Home Page

Once a user has signup or signed in, or navigates to the homepage via the home icon he sees his account home page, which includes a chart of his largest coin holding and of the current value of the coins in his account. He can click on those coins to see their value in a chart, or click on the time spans in the upper right hand corner of the chart to see different historical timeframes of data. Each page, including the Home page, has a nav bar with buy/sell, transfer, and logout buttons, and a sidebar that has navigational buttons.

![Home](https://github.com/robert-debug/nakamoto-plaza/blob/master/react-app/src/image-assets/readme-images/Home.png)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

### Portfolio Page

A user can navigate to her Portfolio page via the Portfolio button. This displays a chart of their current coin coin holding, its current USD balance, the number of tokens held, and the percentage of their USD is in that holding. Below the table is a list of their transfers and tranactions.


![Portfolio](https://github.com/robert-debug/nakamoto-plaza/blob/master/react-app/src/image-assets/readme-images/Portfolio.png)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

### Prices Page 
A user can navigate to the prices page and a table of current prices for each available coin, as well the coins daily change, market cap, and a purchase button. If a coin is click on, it navigates to a coin page.


![Prices](https://github.com/robert-debug/nakamoto-plaza/blob/master/react-app/src/image-assets/readme-images/Prices.png)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

### Coin Page 

A user can Navigate to the coin page via the Prices page and a chart of current prices and historical prices for the selected coin, as well as data about the coin at the bottom. Like on the home page, different time frames can be selected via buttons on the top of the chart.


![Coin](https://github.com/robert-debug/nakamoto-plaza/blob/master/react-app/src/image-assets/readme-images/Coin%20Page.png)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


###  Buy/Sell and Transaction Forms 

A user can view a buy/sell for modal via a buy/sell button on the coin on the prices page. She can click to see the buy or sell cards via clicking on them, choose a dollar amount of Coins to purchase or sell, and the coin to purchase or sell. This is completed via a button, which produces a success or error message, and then redirects you to the home page.

A user can click on the send button to transfer coins, choose the number of coins, the email of the user to receive the coins, and the coin he wants to send. She can then hit the transfer button and send the coins, producing a success or error message.



![Buy/ Sell Form](https://github.com/robert-debug/nakamoto-plaza/blob/master/react-app/src/image-assets/readme-images/BuyForm.png)
![Transfer Form](https://github.com/robert-debug/nakamoto-plaza/blob/master/react-app/src/image-assets/readme-images/TransferForm.png)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

For more info about this project, checkout the full planning documentation links outlined in the project wiki page, [here!](https://github.com/robert-debug/nakamoto-plaza/wiki). 

import React from 'react';
import _ from 'lodash';
import moment from 'moment';

const cc = require('cryptocompare');

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;
const MAX_PROMISES = 10;

export class AppProvider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page: 'dashboard',
      favorites: ['BTC', 'ETH', 'ETC', 'DOGE'],
      timeInterval: 'months',
      ...this.savedSettings(),
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      setPage: this.setPage,
      existsFavorites: this.existsFavorites,
      setFilterCoin: this.setFilterCoin,
      confirmFavorites: this.confirmFavorites,
      changeChartSelect: this.changeChartSelect,
      setCurrentFav: this.setCurrentFav
    }
  }

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({coinList});
  }

  addCoin = key => {
    let favorites = [...this.state.favorites];
    if(favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({favorites});
    }
  }

  removeCoin = key => {
    let favorites = [...this.state.favorites];
    this.setState({favorites: _.pull(favorites, key)})
  }

  existsFavorites = key => _.includes(this.state.favorites, key)

  confirmFavorites = () => {
    let currentFavorite = this.state.favorites[0];
    this.setState({
      firstVisit: false,
      page: 'dashboard',
      currentFavorite,
      prices: null,
      historical: null
    }, () => {
      this.fetchPrices();
      this.fetchHistorical();
    });

    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites: this.state.favorites,
      currentFavorite
    }));
  }

  setCurrentFav = (sym) => {
    this.setState({
      currentFavorite: sym,
      historical: null
    }, this.fetchHistorical);

    localStorage.setItem('cryptoDash', JSON.stringify({
      ...JSON.parse(localStorage.getItem('cryptoDash')),
      currentFavorite: sym
    }))
  }

  savedSettings(){
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
    if(!cryptoDashData) {
        return{page: 'settings', firstVisit: true}
    }
    let {favorites, currentFavorite} = cryptoDashData;
    return {favorites, currentFavorite};
  }

  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();

    prices = prices.filter(price => Object.keys(price).length);
    this.setState({prices});
  }

  fetchHistorical = async () => {
    if (this.state.firstVisit) return;
    let results = await this.historical();

    let historical = [
      {
        name: this.state.currentFavorite,
        data: results.map((ticker, index) => [
          moment().subtract({[this.state.timeInterval]: MAX_PROMISES - index}).valueOf(),
          ticker.USD
        ])
      }
    ]
    this.setState({historical});
  }

  historical = () => {
    let promises = [];
    for (let units = MAX_PROMISES; units > 0; units--) {
      promises.push(
        cc.priceHistorical(
          this.state.currentFavorite,
          ['USD'],
          moment().subtract({[this.state.timeInterval]: units}).toDate()
        )
      )
    }
    return Promise.all(promises);
  }

  changeChartSelect = (value) => {
    this.setState({timeInterval: value, historical: null}, this.fetchHistorical);

  }

  prices = async () => {
    let returnData =[];
    for (let i = 0; i < this.state.favorites.length; i++){
      try {
        let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
        returnData.push(priceData);
      }
      catch(e) {
        console.warn('Error Fetch Prices: ', e);
      }
    }
    return returnData;
  }

  setPage = page => this.setState({page})

  setFilterCoin = (filteredCoins) => this.setState({filteredCoins})

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

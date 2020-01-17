import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './main.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      quoteLst: [
      ],
      show: {

      }
    }
    this.newQuote = this.newQuote.bind(this);
    this.handleFetch = this.handleFetch.bind(this)
    this.changeBgColor = this.changeBgColor.bind(this)
  }

  newQuote = () => {
    const range = this.state.quoteLst.length;
    const ranIdx = Math.floor(Math.random() * range);
    const show = this.state.quoteLst[ranIdx];

    // console.log(this.state.quoteLst[ranIdx])
    if (this.state.quoteLst[ranIdx]) {
      this.setState(
        { show: show }
      );
    }


  }

//=====>Fetch data from API<=====
//method 1
  handleFetch() {
    fetch(
      'https://thesimpsonsquoteapi.glitch.me/quotes?count=10'
    )
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        this.setState({ quoteLst: data })
        this.newQuote()
      })
      .catch(e => console.log('错误:', e))
  }
//method 2
  // async handleFetch() {
  //   const url = 'https://thesimpsonsquoteapi.glitch.me/quotes?count=10'
  //   try{
  //   const resp = await fetch(
  //     url
  //   );
  //   const data = await resp.json();
  //   await this.setState( {quoteLst:data})
  //   await this.newQuote()}
  //   catch(e){
  //     console.log(`错误： ${e}`)
  //   }
  // }


  changeBgColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const r1 = Math.floor(Math.random() * 255);
    const g1 = Math.floor(Math.random() * 255);
    const b1 = Math.floor(Math.random() * 255);

    return {
      backgroundImage: 'linear-gradient(to top, rgba(' + r1 + ',' + g1 + ',' + b1 + ',0.2) 0%, rgba(' + r + ',' + g + ',' + b + ',0.6) 100%)',
      // backgroundImage: 'linear-gradient(to top, rgba(${r1},${g1},${b1},0.2) 0%, rgba(${r},${g},${b},0.6) 100%)',
    }
  }
  UNSAFE_componentWillMount() {
    this.handleFetch()
  }

  
  
  

    
  


  render() {
    return (
      <div id="wrap" style={this.changeBgColor()}>
        <div id="quote-box" className="wrapper">
          <p id="text"><i className="fas fa-quote-left"></i>{this.state.quoteLst.length? this.state.show.quote : `Error,can't fetch data`}</p>
          <img id="image" src={this.state.show.image} alt={this.state.show.character}></img>
          <p id="author">author--{this.state.show.character}</p>
          <div className="row">
            <div className="col-7 ">
              <div className="btn btn-dark twitter">
                <a href="twitter.com/intent/tweet" id="tweet-quote"><i className="fab fa-twitter"></i></a>
              </div>
            </div>

            <button id="new-quote" className="btn btn-dark" onClick={this.newQuote}>New quote</button>
            <button className="btn btn-primary fetch" onClick={this.handleFetch}>fetch</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

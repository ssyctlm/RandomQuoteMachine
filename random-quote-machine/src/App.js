import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './main.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      quoteLst: [
        {
          quote: "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
          character: "Marilyn Monroe"
        },
        {
          quote: "Be yourself; everyone else is already taken.",
          character: "Oscar Wilde"
        },
        {
          quote: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
          character: "Albert Einstein"
        },
        {
          quote: "So many books, so little time.",
          character: "Frank Zappa"
        },
      ],
      show: {
        quote: 'Be yourself; everyone else is already taken.',
        character: 'Oscar Wilde'
      }
    }
    this.newQuote = this.newQuote.bind(this);
    this.handleClick = this.handleClick.bind(this)
    this.changeBgColor = this.changeBgColor.bind(this)
  }
  newQuote = () => {
    const range = this.state.quoteLst.length;
    const ranIdx = Math.floor(Math.random() * range);
    const show = this.state.quoteLst[ranIdx];
    this.setState(
      { show: show }
    );
    console.log(ranIdx)
    console.log(this.state)
  }

  handleClick() {
    fetch(
      'https://thesimpsonsquoteapi.glitch.me/quotes?count=10'
    )
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ quoteLst: data })
      })
      .catch(e => console.log('错误:', e))
  }
  componentWillUnmount() {
    console.log("async")
  }
  changeBgColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const r1 = Math.floor(Math.random() * 255);
    const g1 = Math.floor(Math.random() * 255);
    const b1 = Math.floor(Math.random() * 255);

    return {
      backgroundImage: 'linear-gradient(to top, rgba(' + r1 + ',' + g1 + ',' + b1 + ',0.2) 0%, rgba(' + r + ',' + g + ',' + b + ',0.6) 100%)'
    }

  }

  render() {
    return (
      <div id="wrap" style={this.changeBgColor()}>
        <div id="quote-box" className="wrapper">
          <p id="text"><i className="fas fa-quote-left"></i>{this.state.show.quote}</p>
          <p id="author">author--{this.state.show.character}</p>
          <div className="row">
            <div className="col-7 ">
              <div className="btn btn-dark twitter">
                <a href="twitter.com/intent/tweet" id="tweet-quote"><i className="fab fa-twitter"></i></a>
              </div>
            </div>

            <button id="new-quote" className="btn btn-dark" onClick={this.newQuote}>New quote</button>
            <button className="btn btn-primary fetch" onClick={this.handleClick}>fetch</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

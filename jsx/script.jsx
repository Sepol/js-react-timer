var divStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform:`translate(${-50}%, ${-50}%)`,
    textAlign: 'center',
  };
  
  class TimerWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.startTimer = this.startTimer.bind(this)
        this.state = {
            timeLeft: null, // Отчет времени
            timer: null
        }
    }

    startTimer(timeLeft) {
        clearInterval(this.state.timer)
        let timer = setInterval(()=>{
            var timeLeft = this.state.timeLeft - 1
            if (timeLeft === 0) {
                clearInterval(timer)
            }
            this.setState({
                timeLeft: timeLeft
            })
        }, 1000)
        return this.setState({timeLeft: timeLeft, timer: timer})
    }

    render() {
        return(
            <div style={divStyle}>
                <h2>Таймер</h2>
                <div>
                    <Button time="5" startTimer={this.startTimer}/>
                    <Button time="15" startTimer={this.startTimer}/>
                    <Button time="30" startTimer={this.startTimer}/>
                </div>
                <TimerDisplay timeLeft={this.state.timeLeft}/>
                <audio id="end" preload="auto" src="audio/rington.mp3"></audio>
            </div>
        )
    }
}

class Button extends React.Component {
    handleStartTimer() {
        return this.props.startTimer(this.props.time)
    }
    render() {
        return <button className="btn btn-success m-1 " onClick={this.handleStartTimer.bind(this)}>
        {this.props.time} секунд</button>
    }
}

class TimerDisplay extends React.Component {
    render() {
        if (this.props.timeLeft ===0) {
            document.getElementById("end").play()
        }
        if (this.props.timeLeft === 0 || this.props.timeLeft === null) {
            return <div></div>
        }
        return <h1>Осталось времени: {this.props.timeLeft}</h1>
    }
}

ReactDOM.render(
    <TimerWrapper />,
    document.getElementById('content')
);
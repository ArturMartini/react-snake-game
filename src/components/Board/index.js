import React, { Component } from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import "./styles.css"

export default class Board extends Component {
    rect  = {};
    state = {
        board: {
            width: 500,
            height: 500,
            style: {
                border: '10px solid #9f4acf',
                borderRadius: '1px',
                borderColor: 'aqua',
                height: '520px'
            }
        },
        snake: {
            x: 0,
            y: 0,
            size: 50,
            color: 'blue',
            move: 0
        },
    }
    componentDidMount() {
        window.addEventListener("keyup", this.calculateMovement)
        setInterval(this.snakeKeepWalking, 1000);
    }

    snakeKeepWalking = () => {
        console.log("walking")
        this.state.snake.x = this.state.snake.x + this.state.snake.size
        this.setState(this.state.snake)
    }
    

    isValidMovement = (move) => {
        const size = this.state.board.width - this.state.snake.size
        if (move >= 0 && move <= size) {
            return true
        }
    }
    

    calculateMovement = (event) => {
        const {snake} = this.state
        if (event.key == "ArrowUp") {
            snake.move = snake.y - snake.size
            if (this.isValidMovement(snake.move)) {       
                snake.y = snake.move
                this.rect.to({
                    x : snake.x,
                    y: snake.y,
                    duration : 0.1
                });
                console.log(snake)
                return snake
            }
            return
        }
    
        if (event.key == "ArrowDown") {
            snake.move = snake.y + snake.size
            if (this.isValidMovement(snake.move)) {
                snake.y = snake.move
                this.rect.to({
                    x : snake.x,
                    y: snake.y,
                    duration : 0.1
                });
                console.log(snake)
                return snake
            }
            return
        }
    
        if (event.key == "ArrowLeft") {
            snake.move = snake.x - snake.size
            if (this.isValidMovement(snake.move)) {
                snake.x = snake.move
                this.rect.to({
                    x : snake.x,
                    y: snake.y,
                    duration : 0.1
                });
                console.log(snake)
                return snake
            }
        }
    
        if (event.key == "ArrowRight") {
            snake.move = snake.x + snake.size
            if (this.isValidMovement(snake.move)) {
                snake.x = snake.move
                this.rect.to({
                    x : snake.x,
                    y: snake.y,
                    duration : 0.1
                });
                console.log(snake)
                return snake
            }
        }
        return
    }

    render() {
        const {snake, board} = this.state
        return(
            <div className="board">       
                 <Stage width={board.width} height={board.height} style={board.style} >
                    <Layer>
                        <Rect ref={node => (this.rect = node)}
                            x={snake.x}
                            y={snake.y}
                            width={snake.size}
                            height={snake.size}
                            fill={snake.color}
                            shadowBlur={5}
                        />
                    </Layer>
                </Stage>
            </div>
        );
    }
}
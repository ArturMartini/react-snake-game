import React, { Component } from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import "./styles.css"

export default class Board extends Component {
    rect  = {};
    state = {
        board: {
            width: 500,
            height: 500,
        },
        snake: {
            x: 0,
            y: 0,
            size: 50,
            color: 'blue'
        },
    }
    componentDidMount() {
        window.addEventListener("keyup", this.calculateMovement)
    }

    calculateMovement = (event) => {
        const {snake} = this.state
        console.log(snake)
        if (event.key == "ArrowUp") {
            console.log("up")
            snake.y = snake.y - snake.size
            console.log(this.rect)
            this.rect.to({
                x : snake.x,
                y: snake.y,
                duration : 0.1,
                onFinish: () => {
                   console.log('finished');
                }
              });
            return snake
        }
    
        if (event.key == "ArrowDown") {
            console.log("down")
            snake.y = snake.y + snake.size
            console.log(snake)
            this.rect.to({
                x : snake.x,
                y: snake.y,
                duration : 0.1,
                onFinish: () => {
                   console.log('finished');
                }
              });
            return snake
        }
    
        if (event.key == "ArrowLeft") {
            console.log("left")
            snake.x = snake.x - snake.size
            console.log(snake)
            this.rect.to({
                x : snake.x,
                y: snake.y,
                duration : 0.1,
                onFinish: () => {
                   console.log('finished');
                }
              });
            return snake
        }
    
        if (event.key == "ArrowRight") {
            console.log("right")
            snake.x = snake.x + snake.size
            console.log(snake)
            this.rect.to({
                x : snake.x,
                y: snake.y,
                duration : 0.1,
                onFinish: () => {
                   console.log('finished');
                }
              });
            return snake
        }
        return
    }

    render() {
        const {snake, board} = this.state
        return(
            <div className="board">       
                 <Stage width={board.width} height={board.height}>
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
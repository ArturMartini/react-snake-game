import React, { Component } from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import "./styles.css"


const DirectionUp = 1
const DirectionDown = 2
const DirectionRight = 3
const DirectionLeft = 4
const size = 50


export default class Board extends Component {
    rect  = {};
    rectPoint = {};
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
            size: size,
            color: 'blue',
            move: 0,
            direction: DirectionRight,
            lost: false,
        },
        point: {
            x: 400,
            y: 300,
            size: size,
            color: 'black',
        }
    }
    componentDidMount() {
        window.addEventListener("keyup", this.calculateMovement)
        setInterval(this.snakeKeepWalking, 1000);
    }

    snakeKeepWalking = () => {
        const { snake, point, board } = this.state
        var move = 0;
        var isNotValidMove = false

        if (DirectionRight == snake.direction) {
            move = snake.x + snake.size
            if (this.isValidMovement(move)) {
                snake.x = move
            } else {
                isNotValidMove = true
            }
        }

        if (DirectionLeft == snake.direction) {
            move = snake.x - snake.size
            if (this.isValidMovement(move)) {
                snake.x = move
            } else {
                isNotValidMove = true
            }
        }

        if (DirectionUp == snake.direction) {
            move = snake.y - snake.size
            if (this.isValidMovement(move)) {
                snake.y = move
            } else {
                isNotValidMove = true
            }
        }

        if (DirectionDown == snake.direction) {
            move = snake.y + snake.size
            if (this.isValidMovement(move)) {
                snake.y = move
            } else {
                isNotValidMove = true
            }
        }

        if (!isNotValidMove) {
            snake.lost = true
        }

        this.checkKillPoint(snake)
        
        this.state.snake = snake
        this.setState(this.state.snake)
    }

    checkKillPoint = (snake) => {
        const {point} = this.state
        console.log("check kill")
        console.log("snake.y " + snake.y)
        console.log("point.y " + point.y)
        console.log("snake.x " + snake.x)
        console.log("point.x " + point.x)
         if (snake.x == point.x && snake.y == point.y) {
             point.x = 100
             point.y = 400
             snake.size = snake.size + size
         }
         this.state.snake = snake
         this.setState(this.state.snake)
    }
    

    isValidMovement = (move) => {
        const size = this.state.board.width - this.state.snake.size
        if (move >= 0 && move <= size) {
            return true
        }
        return false
    }
    

    calculateMovement = (event) => {
        const {snake} = this.state
        if (event.key == "ArrowUp") {
            snake.direction = DirectionUp
            snake.move = snake.y - snake.size
            if (this.isValidMovement(snake.move)) {       
                snake.y = snake.move
                this.rect.to({
                    x : snake.x,
                    y: snake.y,
                    duration : 0.1,
                });
                console.log(snake)
                return snake
            }
            return
        }
    
        if (event.key == "ArrowDown") {
            snake.direction = DirectionDown
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
            snake.direction = DirectionLeft
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
            snake.direction = DirectionRight
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
        const {snake, point, board} = this.state
        return(
            <div className="board">       
                 <Stage width={board.width} height={board.height} style={board.style} >
                    <Layer>
                    <Rect ref={node => (this.rectPoint = node)}
                            x={point.x}
                            y={point.y}
                            width={point.size}
                            height={point.size}
                            fill={point.color}
                            shadowBlur={5}
                        />
                        <Rect ref={node => (this.rect = node)}
                            x={snake.x}
                            y={snake.y}
                            width={snake.size}
                            height={size}
                            fill={snake.color}
                            shadowBlur={5}
                        />
                    </Layer>
                </Stage>
            </div>
        );
    }
}
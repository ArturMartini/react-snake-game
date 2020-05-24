import React, { Component } from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import "./styles.css"


const DirectionUp = 1
const DirectionDown = 2
const DirectionRight = 3
const DirectionLeft = 4
const size = 50

export default class Board extends Component {
    rects = []
    rect = {};
    rectPoint = {};
    active = true
    interval = -1
    timeInterval = 1000
    killPoints = 0
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
        },
        rects: this.initializeRects()
    }

    initializeRects() {
        return Array.from({ length: 1 }).map((_, i) => ({
            x: 0,
            y: 0,
            active: true,
            id: "rect:0",
            direction: DirectionRight,
            size: size,
            color: 'blue',
            lost: false
        }))
    }

    componentDidMount() {
        window.addEventListener("keydown", this.getMovement)
        this.interval = setInterval(this.walker, this.timeInterval)
    }

    walker = () => {
        const { rects } = this.state
        var move = 0;
        var isLostMove = false
        var leader = {
            x: rects[rects.length - 1].x,
            y: rects[rects.length - 1].y,
            direction: rects[rects.length - 1].direction
        }
        var direction = leader.direction

        if (DirectionRight === leader.direction) {
            move = leader.x + size
            if (this.isLostMovement(move) || this.isInvalidMovement(move, leader.y)) {
                isLostMove = true
            }
        }

        if (DirectionLeft === leader.direction) {
            move = leader.x - size
            if (this.isLostMovement(move) || this.isInvalidMovement(move, leader.y)) {
                isLostMove = true
            }
        }

        if (DirectionUp === leader.direction) {
            move = leader.y - size
            if (this.isLostMovement(move) || this.isInvalidMovement(leader.x, move)) {
                isLostMove = true
            }
        }

        if (DirectionDown === leader.direction) {
            move = leader.y + size
            if (this.isLostMovement(move) || this.isInvalidMovement(leader.x, move)) {
                isLostMove = true
            }
        }

        if (isLostMove) {
            this.active = false
        }

        this.move(rects, direction)
        this.setState(this.state.rects)
    }

    move = (rects, direction) => {
        var ref = {
            x: rects[rects.length - 1].x,
            y: rects[rects.length - 1].y,
            direction: rects[rects.length - 1].direction,
            color: "blue",
        }
        var stateRects = []

        rects.forEach((r) => {
            stateRects.push({
                x: r.x,
                y: r.y
            })
        })

        if (DirectionUp === direction) {
            ref.y -= size
        }
        if (DirectionDown === direction) {
            ref.y += size
        }
        if (DirectionRight === direction) {
            ref.x += size
        }
        if (DirectionLeft === direction) {
            ref.x -= size
        }
        var hasPoint = this.checkKillPoint(rects, ref)
        if (!hasPoint) {
            if (rects.length > 1) {
                for (let idx = rects.length - 1; idx > 0; idx--) {
                    rects[idx - 1].x = stateRects[idx].x
                    rects[idx - 1].y = stateRects[idx].y
                }
            }
            rects[rects.length - 1] = {
                x: ref.x,
                y: ref.y,
                direction: ref.direction,
                id: rects[rects.length - 1].id,
                color: "blue"
            }
        } else {
            return
        }
    }

    checkKillPoint = (rects, moveRef) => {
        const { point } = this.state
        if (moveRef.x === point.x && moveRef.y === point.y) {
            this.killPoints += 1
            rects.push({
                x: point.x,
                y: point.y,
                direction: moveRef.direction,
                active: true,
                color: "blue",
                size: size,
                id: "rect:" + (rects.length)
            })
            var newPoint = this.getRandomPosition(rects, point)
            point.x = newPoint.x
            point.y = newPoint.y
            clearInterval(this.interval)
            this.timeInterval = this.timeInterval * 0.95
            this.interval = setInterval(this.walker, this.timeInterval)
            return true
        }
        return false
    }


    isLostMovement = (move) => {
        const size = this.state.board.width - this.state.snake.size
        if (move >= 0 && move <= size) {
            return false
        }
        return true
    }

    isInvalidMovement = (x, y) => {
        const { rects } = this.state
        var invalid = false
        rects.forEach((r) => {
            if (x === r.x && y === r.y) {
                invalid = true
            }
        })
        return invalid
    }


    getMovement = (event) => {
        const { rects } = this.state
        var dir = 0
        if (event.key === "ArrowUp") {
            dir = DirectionUp
        } else if (event.key === "ArrowDown") {
            dir = DirectionDown
        } else if (event.key === "ArrowLeft") {
            dir = DirectionLeft
        } else if (event.key === "ArrowRight") {
            dir = DirectionRight
        } else {
            return
        }
        rects[rects.length - 1].direction = dir
        return rects
    }

    getRandomPosition = (rects, point) => {
        var isInvalid = true
        var x = 0
        var y = 0
        while (isInvalid) {
            x = (Math.floor(Math.random() * 10)) * 50
            y = (Math.floor(Math.random() * 10)) * 50
            rects.forEach((r) => {                
                if (x !== r.x && y !== r.y) {
                    isInvalid = false
                }
            });

            if (x !== point.x && y !== point.y) {
                isInvalid = false
            } else {
                isInvalid = true
            }
        }
        return {
            x: x,
            y: y,
        };
    }

    render() {
        const { point, board, rects } = this.state
        if (this.active === true) {
            return (
                <div className="board">
                    <div className="scoreboard">{this.killPoints}</div>
                    <Stage width={board.width} height={board.height} style={board.style} >
                        <Layer>
                            {rects.map((rect) => {
                                return (
                                    <Rect ref={node => (this.rects[rects.length - 1] = node)}
                                        key={`${rect.id}`}
                                        x={rect.x}
                                        y={rect.y}
                                        width={size}
                                        height={size}
                                        fill="blue"
                                        shadowBlur={5}
                                    />
                                )
                            })}
                            <Rect ref={node => (this.rectPoint = node)}
                                x={point.x}
                                y={point.y}
                                width={point.size}
                                height={point.size}
                                fill={point.color}
                                shadowBlur={5}
                                name="point"
                            />
                        </Layer>
                    </Stage>
                </div>
            );
        } else {
            return (
                <div className="board">
                    <p style={{ fontSize: 100 }}>YOU LOST!</p>
                </div>
            )
        }
    }
}
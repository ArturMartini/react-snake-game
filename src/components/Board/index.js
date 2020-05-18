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
        window.addEventListener("keyup", this.getMovement)
        setInterval(this.walker, 1000);
    }

    walker = () => {
        const { rects, point, board } = this.state
        var move = 0;
        var isValidMove = false
        var leader = {
            x: rects[rects.length - 1].x,
            y: rects[rects.length - 1].y,
            direction: rects[rects.length - 1].direction
        }
        var direction = leader.direction

        if (DirectionRight == leader.direction) {
            move = leader.x + size
            if (this.isValidMovement(move)) {
                isValidMove = true
            }
        }

        if (DirectionLeft == leader.direction) {
            move = leader.x - size
            if (this.isValidMovement(move)) {
                isValidMove = true
            }
        }

        if (DirectionUp == leader.direction) {
            move = leader.y - size
            if (this.isValidMovement(move)) {
                isValidMove = true
            }
        }

        if (DirectionDown == leader.direction) {
            move = leader.y + size
            if (this.isValidMovement(move)) {
                isValidMove = true
            }
        }

        if (!isValidMove) {
            rects[rects.length - 1].lost = true
        }

        this.move(rects, direction)

        this.state.rects = rects
        this.setState(this.state.rects)
    }

    move = (rects, direction) => {
        var ref = {
            x: rects[rects.length - 1].x,
            y: rects[rects.length - 1].y,
            direction: rects[rects.length - 1].direction,
            color: "blue",
        }

        if (DirectionUp == direction) {
            ref.y -= size
        }
        if (DirectionDown == direction) {
            ref.y += size
        }
        if (DirectionRight == direction) {
            ref.x += size
        }
        if (DirectionLeft == direction) {
            ref.x -= size
        }
        var hasPoint = this.checkKillPoint(rects, ref)
        if (hasPoint) {
            console.log("kill!!")
        } else {
            if (rects.length > 1) {
                for (let idx = rects.length - 1; idx > 0; idx--) {
                    rects[idx - 1].x = rects[idx].x
                    rects[idx - 1].y = rects[idx].y
                }
            }
            rects[rects.length - 1] = {
                x: ref.x,
                y: ref.y,
                direction: ref.direction,
                id: rects[rects.length - 1].id,
                color: "blue"
            }
        }
    }

    checkKillPoint = (rects, moveRef) => {
        const { point } = this.state
        console.log(rects)
        if (moveRef.x == point.x && moveRef.y == point.y) {
            rects.push({
                x: point.x,
                y: point.y,
                direction: moveRef.direction,
                active: true,
                color: "blue",
                size: size,
                id: "rect:" + (rects.length)
            })
            var newPoint = this.getRandomPosition(point)
            point.x = newPoint.x
            point.y = newPoint.y
            return true
        }
        return false
    }


    isValidMovement = (move) => {
        const size = this.state.board.width - this.state.snake.size
        if (move >= 0 && move <= size) {
            return true
        }
        return false
    }


    getMovement = (event) => {
        var dir = 0
        if (event.key == "ArrowUp") {
            dir = DirectionUp
        }

        if (event.key == "ArrowDown") {
            dir = DirectionDown
        }

        if (event.key == "ArrowLeft") {
            dir = DirectionLeft
        }

        if (event.key == "ArrowRight") {
            dir = DirectionRight
        }
        this.state.rects[this.state.rects.length - 1].direction = dir
        return this.state.rects
    }

    getRandomPosition = (point) => {
        var isInvalid = true
        var x = 0
        var y = 0
        while (isInvalid) {
            x = (Math.floor(Math.random() * 10) + 0) * 50
            y = (Math.floor(Math.random() * 10) + 0) * 50
            this.state.rects.forEach((rect) => {
                if (x != rect.x && y != rect.y) {
                    isInvalid = false
                }
            });

            if (x != point.x && y != point.y) {
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
        return (
            <div className="board">
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
    }
}
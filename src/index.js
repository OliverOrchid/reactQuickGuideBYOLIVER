

//词汇翻译示例 :  lift up   挺举 ;  pass down  沉降

import React  from  "react";
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {


//     //In JavaScript classes, you need to always call super when defining the constructor 
//     // of a subclass. All React component classes that have a constructor should start it with a "super(props)" call.

    
//     // @Chapter OF THE : CompleteingTheGame-Lifting State Up --- Delete the constructor from Square because Square no longer keeps track of the game’s state
    
//     // constructor(props){
//     //     super(props);
//     //     this.state={
//     //         valueOfOliver:null,
//     //     }
//     // }

//     render() {
//       return (

//         //不推荐的语法  <button className="square" onClick={function() { alert('click'); }}>
                
//         //To save typing and avoid the confusing behavior of this, we will use the 
//         // arrow function syntax for event handlers here and further below:


//         //Notice how with onClick={() => alert('click')}, we’re passing a function
//         //  as the onClick's  property. React will only call this function after a click. 
        
//         // //下面是推荐的语法
//         // <button className="square"  onClick =  {() => {alert("You Are Clicking Now!!!");}}  > 
//         //   {this.props.valueOfOliver}
//         //                     </button>


        
//         <button className="square"  
//                 // onClick ={() => this.setState({valueOfOliver:'X'})}  
//                 onClick = { this.props.onClickOfBoard }     //The DOM <button> element’s onClick attribute has a special meaning to React 
//                                                             //because it is a built-in component.  各类DOM(诸如 button,testBox)的所拥有的属性名是系统规定的,详见语言手册
//         >  
            

//             {/* {this.state.valueOfOliver} */  
//                 this.props.valueOfOliver
//                                         }                          
                                                                 
//                                                                  </button>

                                                                 

//       );
//     }
//   }



// In React, function components are a simpler way to write components that only contain a render method and don’t have 
//their own state. Instead of defining a class which extends React.Component, we can write a function that takes props as 
//input and returns what should be rendered. 

function Square(props){  //另见L98 ;   实际上,此处函数(习惯称之为 初始化型函数 )会被执行有限次数,常常为1次
    return(
        <button className="square"  onClick={props.onClickOfBoard}>
            {props.valueOfOliver}  
        </button>
    );
}



  
class Board extends React.Component {
    
    //此构造函数 只会被调用一次 , 其间所包含的state属性有2个
    // //状态挺举, 意味着 把 constructor代码 剪切到 相应的component当中 , 一般无需修改代码 即可执行 "状态挺举" 操作
    constructor(props){
        super(props);
        this.state = {
            squaresArrayInBoard :Array(9).fill(null) ,
            xIsNext: true ,
        };
    }
    
    handleClickOfBoard(indexOfSquaresArray){

        //创建当前棋盘状态数组的 副本
        const  copyOfSquares = this.state.squaresArrayInBoard.slice();
        
        
        //We can now change the Board’s handleClick function to return early by 
        //ignoring a click if someone has won the game or if a Square is already filled:
        if(calculateWinner(copyOfSquares) || copyOfSquares[indexOfSquaresArray] ){ ////非零值 则为 True!!! , 类似于 C语言
            return;  //若为真,则提前 跳出 当前函数
        }
        
        // copyOfSquares[indexOfSquaresArray] = 'X';
        copyOfSquares[indexOfSquaresArray] = this.state.xIsNext ? 'X':'O';  //从自然语言的角度来讲, 当xIsNext为true的时候,赋值为'X'
        // this.setState({squaresArrayInBoard:copyOfSquares});  //数组对应数组 进行赋值 ,此处语法类似于 Python!!! 
        this.setState({
            squaresArrayInBoard:copyOfSquares ,
            xIsNext:!this.state.xIsNext,
        });
    }

    //另见 L116
    renderSquare(whateverNameYouWant) {
      return (
            <Square 
                valueOfOliver={this.state.squaresArrayInBoard[whateverNameYouWant]}

                onClickOfBoard = {  () => this.handleClickOfBoard(whateverNameYouWant) } //We have not defined the handleClickOfBoard() method yet, 
                                                                                //so our code crashes. If you click a square now, you should 
                                                                                //see a red error screen saying something like “this.handleClick is not a function”.

                //In React, it’s conventional to use on[Event] names for props which represent events and handle[Event] for the methods which handle the events.                                      />
                />                                                    
                );
    }
  
    
    render() {
      
        // const status =  "Current player is : "+ (this.state.xIsNext ? 'X':'O') + "    这里是个文本常量而已,你可以随时修改!!!"  ;

        const winner = calculateWinner(this.state.squaresArrayInBoard);
        let status;
        if(winner){  ////非零值 则为 True!!! , 类似于 C语言
            status = 'The Winner is '+winner;
        }else{
            status = "Current player is : " + (this.state .xIsNext ? 'X':'O') + "   此标题为文本常量,你可以随时修改!!!";
        }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
}
  


class Game extends React.Component {
    
    
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         historyArrayOfPastMoves:[ {squaresArrayInBoard :Array(9).fill(null)} ] ,  //historyOfPastMoves 与 其后的值 构成了键值对,
    //                                                                             //注意此处的赋值语法!!!
    //         xIsNext: true ,
    //     };
    // }
    
    
    render() {
      return (
        <div className="game">

          <div className="game-board">
            <Board />
                                </div>

          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
                                </div>

                                </div>
      );
    }
}
  
  // ========================================
  
ReactDOM.render(
    <Game />, //示例01 自主决定 渲染显示特定组件 到 container 中,但是由于此处没有container,仍旧无法呈现至浏览器中

    // <Board/>, //示例02 

    document.getElementById('root'), // 接下来 要设置 具体的container ,  此时浏览器可以正常显示 相关页面了!!!

);
  

function calculateWinner(squaresArrayInBoard){
    const lines = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6],
    ]

    for (let i = 0; i<lines.length ; i++){
        const [a,b,c] = lines[i]; //类似于Python的 解构语法!!!  lines作为二维数组,解构后 依次赋值给a,b,c这三个常量
        if (    squaresArrayInBoard[a]  //非零值 则为 True!!! , 类似于 C语言
                &&  squaresArrayInBoard[a]===squaresArrayInBoard[b]  
                && squaresArrayInBoard[a]===squaresArrayInBoard[c]
            ){
            
            return squaresArrayInBoard[a]; // 如果if条件为True,则会执行此处return语句, 当前函数的运行也会就此而止!!!
            
        }
    }

    return null;
}
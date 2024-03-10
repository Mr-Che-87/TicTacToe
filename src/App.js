//КРЕСТИКИ-НОЛИКИ.
//**дополнительно (НЕ ДЕЛАЛ) - Попробуйте добавить дополнительные фичи в игру на ваш вкус, например: добавить счётчик побед в раундах, реализовать зачёркивание трёх крестиков или ноликов в ряд при выигрыше, переход права первого хода в зависимости от победы в предыдущем раунде.

 function Cross() {
  return <svg fill='#A0CBEB' width='40px' height='40px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350">
    <path d="M980.528 205.539L874.462 99.473 540 433.935 205.539 99.473 99.473 205.539 433.935 540 99.473 874.462l106.066 106.065L540 646.066l334.462 334.461 106.065-106.065L646.066 540z"/>
  </svg>
}

function Circle() {
  return <svg fill='#FAE287' width='40px' height='40px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
   <path d="M50.001 5C25.186 5 5 25.186 5 50.001 5 74.815 25.186 95 50.001 95 74.815 95 95 74.815 95 50.001 95 25.186 74.815 5 50.001 5zm0 72.904c-15.385 0-27.904-12.517-27.904-27.903s12.518-27.904 27.904-27.904 27.903 12.518 27.903 27.904-12.518 27.903-27.903 27.903z"/>
  </svg>
}



const X = 1
const O = 2

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

//проверка НА ПОБЕДИТЕЛЯ:
function checkWinner(board) {
  for (const [a, b, c] of WINNING_COMBINATIONS) {   //ДЕСТРУКТУРИЗАЦИЯ МАССИВА for (...of...) - переменные a, b и c будут поочередно принимать ЗНАЧЕНИЯ из элементов вложенных массивов WINNING_COMBINATIONS. 
    if (board[a] &&(board[a] === board[b] &&(board[a] === board[c]))) {  
      return board[a]       //или board[b] или board[c] - неважно
    }
  }
  return null  
}

//проверка НА НИЧЬЮ:
function checkDraw(board) {
  return board.every(e => e > 0) 
}  //если все элементы > 0 (все клетки заполнены)  - функция возвращает true, иначе false.




//ОСНОВНОЙ КОМПОНЕНТ: 
function TicTacToe() {
//стейт, определяющий чей ход: если xIsNext равно true, то следующий ход будет за "X", иначе за "O"  
  const [xIsNext, setXIsNext] = useState(true);

//общий стейт для всей доски:
  const [board, setBoard] = useState([
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
  ]);  //аналог: useState(Array(9).fill(0)) 
  

  //ФУНКЦИЯ ОБНУЛЕНИЯ ПОЛЯ ПО ОКОНЧАНИЮ ИГРЫ
  const restartGameWithMessage = (message) => {
    setTimeout(() => {
      alert(message);
      setBoard(Array(9).fill(0));
      setXIsNext(true);
    }, 200);  
  };


  //Обработчик клика:
  const handleClick = (i) => {
    if (!board[i])  {   //если клетка пустая, то клик срабатывает (чтобы нельзя было заменить крестик/нолик в уже заполненной клетке)
      
      const newBoard = board.slice();  //создаём копию массива board - чтобы изменения вносились в копию массива, а не в оригинальный.
// Типа иммутабельность - НЕ ПОНЯЛ ЗАЧЕМ????? если не вводить newBoard и везде в обработчике писать board - код также будет работать!
      
      if (xIsNext) {newBoard[i] = X;} 
      else {newBoard[i] = O; }

      setBoard(newBoard); 
      setXIsNext(!xIsNext);  //инвертируем стейт - для перехода хода

      const winner = checkWinner(newBoard); //каждый раз чекаем, есть ли победитель

//если победитель найден/ничья - выводим тот или иной message 
      if (winner) {
        restartGameWithMessage( `${winner === X ? 'Крестики' : 'Нолики'} победили` );
      }

      if (!winner && checkDraw(newBoard)) {
        restartGameWithMessage('Ничья');
      }
    }
  };



//функция заполнения ячейки(без логики правил игры - просто отрисовка компонента <Cross /> или <Circle />):
 function renderSquare(i)  {
    const isEmpty = (board[i] === 0)  
    const isX = !isEmpty && (board[i] === X)
    const isO = !isEmpty && (board[i] === O)
    

    return (  //условие чем заполнять. Если board[i]=0, то ничем. Иначе выбираем - либо крестик, либо нолик
      <button key={i} className="square" onClick={() => handleClick(i)}>
        {isX ? <Cross /> :
         isO ? <Circle /> :
         isEmpty ? null :
         null 
        }
      </button>
    )
  }
  
  
    return (
      <div className='board'>
        {board.map((_, i) => {   //  (_, i) - когда необходимо обойти массив, но фактическое значение элемента item не важно и с ним внутри ничё не делается. Просто стилистика. Если напишешь (item_, i) или (i) - результат будет тот же. 
          return renderSquare(i) 
        })}
      </div>
    )
}


export default function App() {
  return (<TicTacToe />)
}





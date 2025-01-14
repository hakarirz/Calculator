const display = document.querySelector(".display"); // 화면 출력
const buttons = document.querySelectorAll("button"); // 버튼 입력
const storage = document.querySelector(".history"); //과거 이력
let sum = ""; // 저장
let result = ""; //계산 최종값
let percent = ""; //값을 빼놓고 100분울값
let history = ""; // 계산 수식 저장값
let show_history = ""; // 계산 수식 부터 값까지


//등호 push시 발생 함수
function cal(val) { 
    try {
        return new Function('return ' + val)();
    } catch (error) {
        return sum = "";
    }
}

//백분율로 나누는 함수
function devide(val2){
    try{
        return (val2/100).toString();
    }catch (error) {
        return sum = "";
    }
}
//버튼 push시 발생 함수  
buttons.forEach(button => { 
    button.addEventListener("click", function () { // 버튼들 각각 클릭 이벤트 추가
        const value = button.textContent;

        if (value === "=") { //등호 push
            result = cal(sum);
            history = sum + " = " + "\n" + result +"\n"; //값을 num + num = \n num2 \n 형식
            show_history = history + show_history;
            display.textContent = result;
            storage.style.whiteSpace = "pre-wrap";
            storage.textContent = show_history; // 과거 열람에 show_history의 문자열을 가져옴
        }else if(["/","+","-","*"].includes(value)){ // 연산자 push 
            if(sum === "" && (["*","/","+","-"].includes(value))){ // 처음부터 연 산자 push하면 반환
                return;
            }else{
                if(result !== ""){
                    sum = result + value;
                    result = "";
                }else if(value === sum.charAt(sum.length-1)){ // 마지막 입력값이 value값과 같은 연산자 일 때
                    return;
                }else if(value !== sum.charAt(sum.length-1) && ["/","*","-","+"].includes(sum.charAt(sum.length-1))){ 
                    if(value === "-"){
                        sum+=value;
                    }else if(!["*", "/", "+"].includes(sum.charAt(sum.length - 2))){ // length-2 부분을 확인하여 연산자 변경
                        sum = sum.slice(0,-1) + value;
                    }else{
                        return;
                    }
                }else{
                    sum+=value;
                }
            display.textContent = sum;
            }
        }else if(["C","CE","🠔","%"].includes(value)){
            if(value === "C"){ // 전체 삭제
                sum = "";
                result = "";
            }else if(value === "🠔"){ 
                sum = sum.slice(0,-1); // 뒷자리 1씩 slice
            }else if(value === "CE"){ 
                if(result !== ""){ // 결과값이 나왔을 때 누르면
                    sum = "";
                    result = "";
                }else if(/[0-9a-zA-Z.]/.test(sum.charAt(sum.length - 1))) { //99/99 while 문 쓸껄 그랫나? sum의 마지막에 0~9 . 존재 여부 확인
                    for(i=1; i <= sum.length; i++){
                        if(/[^0-9a-zA-Z.]/.test(sum.charAt(sum.length - i))){ // 99/99 
                            break;
                        }
                    }
                    sum = sum.slice(0, sum.length - i + 1);
                }else{
                    sum = sum.slice(0, sum.length - 1);
                }
            }else if(value === "%"){
                if(sum === ""){ // 초기 입력 방지
                    return;
                }else if(["/","+","-","*"].includes(sum.charAt(sum.length-1))){
                    return;
                }else if(result !== ""){
                    sum = devide(result); // 결과값 존재시 즉시 값 %
                    result = "";
                }else{
                    for(i = 1; i <= sum.length; i++){
                        if(/[^0-9a-zA-Z.]/.test(sum.charAt(sum.length - i))){ // sum의 뒷부분부터 0~9 . 이 존재하는지 확인
                            break;
                        }else{
                            percent = sum.charAt(sum.length - i) + percent; // percent 변수에 sum의 뒷부분을 추가함 // 99/99
                        }
                        //sum = sum.slice(0, sum.length - i + 1) + devide(percent); 이게 여기있었다는데 말이 안되는데;
                    }
                    sum = sum.slice(0, sum.length - i + 1) + devide(percent); // 분명 for문 밖에 놨는데 얘가 for문 안에 있다고 했었음;;
                    percent = "";
                }
            }
            display.textContent = sum;
        }else if(value === "."){
            if(sum.includes(".")){ // 수식에 소수점이 존재시
                return;
            }else{
                sum += value;
            }
            display.textContent = sum;
        }else{ // 숫자 push
            if(result !== ""){
                sum = value;
                result = "";
            }else{
                sum +=value;
            }
            display.textContent = sum;
        }
    });
});

//키보드 입력
document.addEventListener("keydown",function(e){
    const key = e.key; // 키입력 기능 추가

    if (["=","Enter"].includes(key)) { //등호 Enter push
        result = cal(sum);
        history = sum + " = " + "\n" + result +"\n";
        show_history = history + show_history;
        display.textContent = result;
        storage.style.whiteSpace = "pre-wrap";
        storage.textContent = show_history;
        e.preventDefault();
    }else if(["/","+","-","*"].includes(key)){ // 연산자 push 
        if(sum === "" && (["*","/","+","-"].includes(key))){ // 처음부터 연 산자 push하면 반환
            return;
        }else{
            if(result !== ""){
                sum = result + key;
                result = "";
            }else if(key === sum.charAt(sum.length-1)){ // 마지막 입력값이 value값과 같은 연산자 일 때
                return;
            }else if(key !== sum.charAt(sum.length-1) && ["/","*","-","+"].includes(sum.charAt(sum.length-1))){ 
                if(key === "-"){
                    sum+=key;
                }else if(!["*", "/", "+"].includes(sum.charAt(sum.length - 2))){ // length-2 부분을 확인하여 연산자 변경
                    sum = sum.slice(0,-1) + key;
                }else{
                    return;
                }
            }else{
                sum+=key;
            }
        display.textContent = sum;
        }
    }else if(["Escape","Backspace","%","Delete"].includes(key)){
        if(["Escape","Delete"].includes(key)){ // ESC, Delete 
            sum = "";
            result = "";
        }else if(key === "Backspace"){ // Backspace
            if(result !== ""){
                result = "";
                sum = "";
            }else{
                sum = sum.slice(0,-1);
            }
        }else if(key === "%"){ 
            if(sum === ""){
                return;
            }else if(["/","+","-","*"].includes(sum.charAt(sum.length-1))){
                return;
            }else if(result !== ""){
                sum = devide(result);
                result = "";
            }else{
                for(i = 1; i <= sum.length; i++){
                    if(/[^0-9a-zA-Z.]/.test(sum.charAt(sum.length - i))){
                        break;
                    }else{
                        percent = sum.charAt(sum.length - i) + percent;
                    }
                }
                sum = sum.slice(0, sum.length - i + 1) + devide(percent); // 분명 for문 밖에 놨는데 얘가 for문 안에 있다고 했었음;;
                percent = "";
            }
        }
        display.textContent = sum;
    }else if(/[0-9]/.test(key)){ // 숫자 push F12를 누르면 F제외 12가 숫자라서 여기에 걸림
        if(result !== ""){
            sum = key;
            result = "";
        }else if(key.startsWith("F")){ // F1~F12 방지
            return;
        }else{
            sum +=key;
        }
        display.textContent = sum;
    }else if(key === "."){
        if(sum.includes(".")){
            return;
        }else{
            sum += key;
        }
        display.textContent = sum;
    }else{
        return;
    }
})
    
document.querySelector(".icon").addEventListener("click",function(){ //팝업창 누르면 켜지고 닫기 누르면 꺼짐
    document.querySelector(".history").style.display = "block";
    document.querySelector(".close").style.display = "block";
});

document.querySelector(".close").addEventListener("click",function(){
    document.querySelector(".history").style.display = "none";
    document.querySelector(".close").style.display = "none";
});

// 키보드로 수식 입력 후 엔터를 입력하면 수식의 마지막 값이 엔터가 되어 작동이 이상했다.
// F1~F12를 FN을 누르고 하는 입력 방식이라 "FN+F1" 방식일 줄 알았는데 아니였다.
// keyCode를 사용해서 키보드의 값을 사용하는 방법도 있었지만 문자열로 출력하니 keyCode가 실행이 안되었다.
// 처음에 백분율(%)를 만들기 위해 for문으로 연산자 존재시 연산자 전까지의 값을 저장하고 해당 값을 / 100 을 하려했는데 slice의 위치가 이상해서 연산자까지 가져갔다.
// 키입력의 Delete, Alt, Escape 등 해당 키들은 대문자로 시작한다.
// slice함수가 slice(0,2)라면 0번째 자리에서 2번의 위치를 자른다는 줄 알았는데 0~2전까지의 값을 자르는 것 이였다.
// ex) 99/99 slice(0,3)를 하면 0부터 시작해서 0 1 2 == 9 9 / 이다.

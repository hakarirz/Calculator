const display = document.querySelector(".display"); // 화면 출력
const buttons = document.querySelectorAll("button"); // 버튼 입력
let sum = ""; // 저장
let result = ""; //계산 최종값

//등호 push시 발생 함수
function cal(val) { 
    try {
        return new Function('return ' + val)();
    } catch (error) {
        return sum = "";
    }
}
//버튼 push시 발생 함수  
buttons.forEach(button => { 
    button.addEventListener("click", function () {
        const value = button.textContent;

        if (value === "=") { //등호 push
            result = cal(sum);
            display.textContent = result;
        }else if(["/","+","-","*"].includes(value)){ // 연산자 push 
            if(sum === "" && (["*","/"].includes(value))){ // 처음부터 연산자 push하면 반환
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
/*
This is a JavaScript generator function named bankAccount(). It uses the yield keyword to create 
a generator. The generator function maintains a balance variable and repeatedly yields the current 
balance. The generator function will continue to yield the balance until the balance becomes negative. 
Once the balance becomes negative, the generator function will return the string 'bankrupt!'.*/ 
function* bankAccount(){
    let balance = 0;
    while (balance >= 0){
        balance += yield balance;
    }
    return 'bankrupt!'
}

let acct = bankAccount();

console.log(acct.next());
console.log(acct.next(50));
console.log(acct.next(-10));
console.log(acct.next(-60));
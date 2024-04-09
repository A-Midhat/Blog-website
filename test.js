// character substitution
function charSub(my_string){
    let charArray = my_string.split('');
    for (let i = 0; i<charArray.length; i++){
        if("-*/_ ".includes(charArray[i])){
            charArray[i] = "-"
        }
    }
    myString = charArray.join('').toLowerCase() 
    return my_string
}

function generationCode(){
    
    let text = '';
    const possible = 'ABCDEFGHIJLMNOPQRSTUVXZabcdefghijlmnopqrstuvxz0123456789';
    
    for (let i = 0; i < 5; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export default {
    generationCode,
}
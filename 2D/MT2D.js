class MT2D {

    constructor() {
         this._matrica =  [[1 ,0 , 0 ] ,[0 ,1 , 0 ] ,[0 ,0 ,1]];
    } 

    getMatrica() {
        return this._matrica;
    }

    identitet(){
        this._matrica= [[1 ,0 , 0 ] ,[0 ,1 , 0 ] ,[0 ,0 ,1]];
    }
    //translacija za vektor (px,py)
    pomakni (px , py) {
        this._matrica= [[1 ,0 , px ] ,[0 ,1 , py ] ,[0 ,0 ,1]];
    }
    //Skaliranje s faktorima sx i sy
    skaliraj(sx, sy){
        this._matrica= [[sx ,0 , 0 ] ,[0 ,sy , 0 ] ,[0 ,0 ,1]];
    }

	zrcaliNaX() {
        this._matrica= [[1 ,0 , 0 ] ,[0 ,-1 , 0 ] ,[0 ,0 ,1]];
    }

    zrcaliNaY(){
        this._matrica = [[-1, 0, 0], [0, 1, 0], [0, 0, 1]];
    }
    
    //Rotacija oko ishodišta za navedeni kut u stupnjevima
    rotiraj(kut){
        kut = kut*(Math.PI/180);
        this._matrica = [[Math.cos(kut) ,-Math.sin(kut) , 0 ] ,[Math.sin(kut) ,Math.cos(kut) , 0 ] ,[0 ,0 ,1]];
    }

    smicanje(alpha, beta){
        alpha = (alpha*Math.PI)/180; 
        beta = (beta*Math.PI)/180; 

       var m = [[1 ,Math.tan(beta) , 0 ] ,[Math.tan(alpha) ,1 , 0 ] ,[0 ,0 ,1]];
        this._matrica = m;
    }

    mult (m) {
        let m1 = [[0 ,0 ,0] ,[0 ,0 ,0] ,[0 ,0 ,0]];
        for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            m1[i][j] += this._matrica[i][k] * m[k][j];
        }}}
        this._matrica = m1;
        return this;
    }
    
}

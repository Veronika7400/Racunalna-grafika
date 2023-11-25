class GKS {
/*
    constructor(platno, xmin, xmax, ymin, ymax) {
        this.platno = platno;
        this.g = platno.getContext("2d");
        this.Xmin = xmin;
        this.Xmax = xmax;
        this.Ymin = ymin;
        this.Ymax = ymax;

        this.Sx = platno.width / (this.Xmax - this.Xmin);
        this.Sy = platno.height / (this.Ymin - this.Ymax);

        this.Px = -this.Sx * this.Xmin;
        this.Py = -this.Sy * this.Ymax;
        this._matrica = [[1 ,0 , 0 ] ,[0 ,1 , 0 ] ,[0 ,0 ,1]]; 
    }
    */
constructor(platno, xmin, xmax) {
    this.platno = platno;
    this.g = platno.getContext("2d");
    this.Xmin = xmin;
    this.Xmax = xmax;

    this.Sx = platno.width / (this.Xmax - this.Xmin);
    this.Sy = -this.Sx;

    this.Px = -this.Sx * this.Xmin;
    this.Py = platno.height /2 ;
 
    this._matrica = [[1 ,0 , 0 ] ,[0 ,1 , 0 ] ,[0 ,0 ,1]]; 
    } 

	postaviNa(x, y) {
        const [tx, ty, _] = this.transformiraj([x, y, 1]);

        this.g.beginPath(); 
        this.g.moveTo(this.Sx*tx+this.Px, this.Sy*ty+this.Py); 
    }
    
    linijaDo(x, y){
        const  [tx, ty, _] = this.transformiraj([x, y, 1]);

        this.g.lineTo(this.Sx*tx+this.Px, this.Sy*ty+this.Py); 
    }

    koristiBoju(c){
        this.g.strokeStyle = c;
    }

    povuciLiniju(){
        this.g.stroke();
    }

    trans(m){
        this._matrica = m.getMatrica(); 
    }

    transformiraj (tocka){
       const x=tocka[0];
       const y= tocka[1];
       var tx = x * this._matrica[0][0] + y * this._matrica[0][1] + this._matrica[0][2];
       var ty = x * this._matrica[1][0] + y * this._matrica[1][1] + this._matrica[1][2];
       var tz = x * this._matrica[2][0] + y * this._matrica[2][1] + this._matrica[2][2];

        return [tx, ty, tz];
    }
}
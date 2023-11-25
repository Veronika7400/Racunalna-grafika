class MT3D {

    constructor() {
        this._matrica = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this._kamera = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

    }

    getMatrica() {
        return this._matrica;
    }

    identitet() {
        let m = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this._matrica = m;
        this._kamera = m; 
    }

    pomakni(px, py, pz) {
        let m = [[1, 0, 0, px], [0, 1, 0, py], [0, 0, 1, pz], [0, 0, 0, 1]];
        this.mult(m);
    }

    skaliraj(sx, sy, sz) {
        let m = [[sx, 0, 0, 0], [0, sy, 0, 0], [0, 0, sz, 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaX() {
        let m = [[1, 0, 0, 0], [0, -1, 0, 0], [0, 0, -1, 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaY() {
        let m = [[-1, 0, 0, 0], [0, 1, 0, 0], [0, 0, -1, 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaZ() {
        let m = [[-1, 0, 0, 0], [0, -1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaXY() {
        let m = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, -1, 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaXZ() {
        let m = [[1, 0, 0, 0], [0, -1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    zrcaliNaYZ() {
        let m = [[-1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    rotirajX(kut) {
        kut = kut * (Math.PI / 180);
        let m = [[1, 0, 0, 0], [0, Math.cos(kut), -Math.sin(kut), 0], [0, Math.sin(kut), Math.cos(kut), 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    rotirajY(kut) {
        kut = kut * (Math.PI / 180);
        let m = [[Math.cos(kut), 0, Math.sin(kut), 0], [0, 1, 0, 0], [-Math.sin(kut), 0, Math.cos(kut), 0], [0, 0, 0, 1]];
        this.mult(m);
    }

    rotirajZ(kut) {
        kut = kut * (Math.PI / 180);
        let m = [[Math.cos(kut), -Math.sin(kut), 0, 0], [Math.sin(kut), Math.cos(kut), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.mult(m);

    }

    mult(m) {
        let m1 = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++) {
                    m1[i][j] += this._matrica[i][k] * m[k][j];
                }
            }
        }
        this._matrica = m1;
    }

    rotiraj_oko_osi(x0, y0, z0, u1, u2, u3, kut) {
        kut = kut * (Math.PI / 180);
        const nazivnik = Math.pow((Math.pow(u1 - x0, 2) + Math.pow(u2 - y0, 2) + Math.pow(u3 - z0, 2)), 1 / 2);
        const a = (u1 - x0) / nazivnik;
        const b = (u2 - y0) / nazivnik;
        const c = (u3 - z0) / nazivnik;
        const d = Math.pow(Math.pow(b, 2) + Math.pow(c, 2), 1 / 2);

        const alfa = Math.asin(b / d) * (180 / Math.PI);
        const beta = Math.asin(a) * (180 / Math.PI);

        const T1 = new MT3D();
        T1.pomakni(x0, y0, z0);

        const Rx1 = new MT3D();
        Rx1.rotirajX(-alfa);

        const Ry1 = new MT3D();
        Ry1.rotirajY(beta);

        const Rz = new MT3D();
        Rz.rotirajZ(kut);

        const Ry2 = new MT3D();
        Ry2.rotirajY(-beta);

        const Rx2 = new MT3D();
        Rx2.rotirajX(alfa);

        const T2 = new MT3D();
        T2.pomakni(-x0, -y0, -z0);

        this.identitet();
        this.mult(T1.getMatrica());
        this.mult(Rx1.getMatrica());
        this.mult(Ry1.getMatrica());
        this.mult(Rz.getMatrica());
        this.mult(Ry2.getMatrica());
        this.mult(Rx2.getMatrica());
        this.mult(T2.getMatrica());
    }

    VP(u, v) {
        let vek = [0, 0, 0];
        vek[0] = u[1] * v[2] - u[2] * v[1];
        vek[1] = u[0] * v[2] - u[2] * v[0];
        vek[2] = u[0] * v[1] - u[1] * v[0];
        return vek;
    }

    mnoziMatrice(m1, m2) {
        let rez = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++) {
                    rez[i][j] += m1[i][k] * m2[k][j];
                }
            }
        }
        return rez;
    }

    postaviKameru(x0, y0, z0, x1, y1, z1, Vx, Vy, Vz) {
        const N = [x0 - x1, y0 - y1, z0 - z1];
        const n = this.normalizirajVektor(N);
    
        const U = this.VP([Vx, Vy, Vz], N);
        const u= this.normalizirajVektor(U);
        const v = this.VP(n, u);
        this._kamera = [
            [u[0], u[1], u[2], -this.tocka(u, [x0, y0, z0])],
            [v[0], v[1], v[2], -this.tocka(v, [x0, y0, z0])],
            [n[0], n[1], n[2], -this.tocka(n, [x0, y0, z0])],
            [0, 0, 0, 1]
        ];
    }
    tocka(v1, v2) {
        return v1[0] * v2[0]+v1[1] * v2[1] +v1[2] * v2[2];
    }

    normalizirajVektor(vektor) {
        const duzina = Math.sqrt(vektor[0] * vektor[0] + vektor[1] * vektor[1] + vektor[2] * vektor[2]);
        return [vektor[0] / duzina, vektor[1] / duzina, vektor[2] / duzina];
    }
}

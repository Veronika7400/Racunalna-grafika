class Perps {
    constructor(platno, xmin, xmax, ymin, ymax, dist) {
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

        this._matrica = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        this.d = dist;
    }

    postaviNa(x, y, z) {
        const [tx, ty] = this.transformiraj([x, y, z]);
        this.g.beginPath();
        this.g.moveTo(this.Sx * tx + this.Px, this.Sy * (-ty) + this.Py);

    }

    linijaDo(x, y, z) {

        const [tx, ty] = this.transformiraj([x, y, z]);
        this.g.lineTo(this.Sx * tx + this.Px, this.Sy * (-ty) + this.Py);
    }

    trans(m) {
        this._matrica = m.mnoziMatrice(m._kamera, m._matrica);
    }

    koristiBoju(c) {
        this.g.strokeStyle = c;
    }

    povuciLiniju() {
        this.g.stroke();
    }


    transformiraj(tocka) {
        const x = tocka[0];
        const y = tocka[1];
        const z = tocka[2];
        const tx = this._matrica[0][0] * x + this._matrica[0][1] * y + this._matrica[0][2] * z + this._matrica[0][3];
        const ty = this._matrica[1][0] * x + this._matrica[1][1] * y + this._matrica[1][2] * z + this._matrica[1][3];
        const tz = this._matrica[2][0] * x + this._matrica[2][1] * y + this._matrica[2][2] * z + this._matrica[2][3];

        let xpr = (this.d / tz) * tx;
        let ypr = (this.d / tz) * ty;

        return [xpr, ypr];
    }

    nacrtajStozac(r, h, n) {
        
        for (let i = 0; i < n; i++) {
            const phi = (2 * Math.PI * i) / n;
            const x = r * Math.cos(phi);
            const y = r * Math.sin(phi);
            this.postaviNa(x, y, 0);
            const iduciPhi = (2 * Math.PI * (i + 1)) / n;
            const iduciX = r * Math.cos(iduciPhi);
            const iduciY = r * Math.sin(iduciPhi);
            this.linijaDo(iduciX, iduciY, 0);
            this.povuciLiniju();
        }

        for (let i = 0; i < n; i++) {
            const phi = (2 * Math.PI * i) / n;
            const x = r * Math.cos(phi);
            const y = r * Math.sin(phi);
            this.postaviNa(x, y, 0);
            this.linijaDo(0, 0, h);
            this.povuciLiniju();
        }
    }

    nacrtajValjak(r, h, n) {
        
        for (let i = 0; i < n; i++) {
            const phi = (2 * Math.PI * i) / n;
            const x = r * Math.cos(phi);
            const y = r * Math.sin(phi);
            this.postaviNa(x, y, 0);
            const iduciPhi = (2 * Math.PI * (i + 1)) / n;
            const iduciX = r * Math.cos(iduciPhi);
            const iduciY = r * Math.sin(iduciPhi);
            this.linijaDo(iduciX, iduciY, 0);
            this.povuciLiniju();
        }

        for (let i = 0; i < n; i++) {
            const phi = (2 * Math.PI * i) / n;
            const x = r * Math.cos(phi);
            const y = r * Math.sin(phi);
            this.postaviNa(x, y, h);
            const iduciPhi = (2 * Math.PI * (i + 1)) / n;
            const iduciX = r * Math.cos(iduciPhi);
            const iduciY = r * Math.sin(iduciPhi);
            this.linijaDo(iduciX, iduciY, h);
            this.povuciLiniju();
        }

        for (let i = 0; i < n; i++) {
            const phi = (2 * Math.PI * i) / n;
            const x = r * Math.cos(phi);
            const y = r * Math.sin(phi);
            this.postaviNa(x, y, 0);
            this.linijaDo(x, y, h);
            this.povuciLiniju();
        }
    }

    nacrtajKuglu(r, m, n) {
        
        for (let i = 0; i < m; i++) {
            const phi = (2 * Math.PI * i) / m;
            for (let j = 0; j <= n; j++) {
                const theta = (Math.PI * j) / n;
                const x = r * Math.cos(phi) * Math.sin(theta);
                const y = r * Math.sin(phi) * Math.sin(theta);
                const z = r * Math.cos(theta);
                this.postaviNa(x, y, z);
                const iduciPhi = (2 * Math.PI * (i + 1)) / m;
                const iduciX = r * Math.cos(iduciPhi) * Math.sin(theta);
                const iduciY = r * Math.sin(iduciPhi) * Math.sin(theta);
                const iduciZ = r * Math.cos(theta);
                this.linijaDo(iduciX, iduciY, iduciZ);
                this.povuciLiniju();
            }
        }

        for (let i = 0; i <= n; i++) {
            const theta = (Math.PI * i) / n;
            for (let j = 0; j < m; j++) {
                const phi = (2 * Math.PI * j) / m;
                const x = r * Math.cos(phi) * Math.sin(theta);
                const y = r * Math.sin(phi) * Math.sin(theta);
                const z = r * Math.cos(theta);
                this.postaviNa(x, y, z);
                const iducaTheta = (Math.PI * (i + 1)) / n;
                const iduciX = r * Math.cos(phi) * Math.sin(iducaTheta);
                const iduciY = r * Math.sin(phi) * Math.sin(iducaTheta);
                const iduciZ = r * Math.cos(iducaTheta);
                this.linijaDo(iduciX, iduciY, iduciZ);
                this.povuciLiniju();
            }
        }
    }

    nacrtajGornjuPoluKuglu(r, m, n) {
        for (let i = 0; i < m; i++) {
            const phi = (2 * Math.PI * i) / m;
            this.postaviNa(0, 0, r);
            for (let j = 0; j <= Math.PI / 2; j += 0.01) {
                const x = r * Math.sin(j) * Math.cos(phi);
                const y = r * Math.sin(j) * Math.sin(phi);
                const z = r * Math.cos(j);
                this.linijaDo(x, y, z);
            }
            this.povuciLiniju();
        }

        for (let i = 0; i <= Math.PI / 2; i += (Math.PI / (2 * n))) {
            const theta = Math.PI / 2 - i;
            this.postaviNa(0, 0, r * Math.cos(theta));
            for (let j = 0; j <= 2 * Math.PI; j += 0.01) {
                const x = r * Math.cos(j) * Math.sin(theta);
                const y = r * Math.sin(j) * Math.sin(theta);
                const z = r * Math.cos(theta);
    
                if (j === 0) {
                    this.postaviNa(x, y, z);
                } else {
                    this.linijaDo(x, y, z);
                }
            }
            this.povuciLiniju();
        }
    }
    
    nacrtajLijevuPoluKuglu(r, m, n) {
    
        // Gornji lijevi dio
        for (let i = 0; i < m / 2; i++) {
            const phi = (2 * Math.PI * i) / m;
            for (let j = 0; j <= n / 2; j++) {
                const theta = (Math.PI * j) / (n / 2); // Mijenjamo n s n / 2
                const x = r * Math.cos(phi) * Math.sin(theta);
                const y = r * Math.sin(phi) * Math.sin(theta);
                const z = r * Math.cos(theta);
                this.postaviNa(x, y, z);
    
                const iduciPhi = (2 * Math.PI * (i + 1)) / m;
                const iducaTheta = (Math.PI * j) / (n / 2); // Mijenjamo n s n / 2
                const iduciX = r * Math.cos(iduciPhi) * Math.sin(iducaTheta);
                const iduciY = r * Math.sin(iduciPhi) * Math.sin(iducaTheta);
                const iduciZ = r * Math.cos(iducaTheta);
    
                this.linijaDo(iduciX, iduciY, iduciZ);
                this.povuciLiniju();
            }
        }
    
        // Dodavanje meridijana
        for (let j = 0; j <= n / 2; j++) {
            const theta = (Math.PI * j) / n;
            for (let i = 0; i <= m / 2; i++) {
                const phi = (Math.PI * i) / (m/2);
                const x1 = r * Math.cos(phi) * Math.sin(theta);
                const y1 = r * Math.sin(phi) * Math.sin(theta);
                const z1 = r * Math.cos(theta);
    
                const iduciTheta = (Math.PI * (j + 1)) / (n);
                const iduciX = r * Math.cos(phi) * Math.sin(iduciTheta);
                const iduciY = r * Math.sin(phi) * Math.sin(iduciTheta);
                const iduciZ = r * Math.cos(iduciTheta);
    
                this.postaviNa(x1, y1, z1);
                this.linijaDo(iduciX, iduciY, iduciZ);
                this.povuciLiniju();
            }
        }
    
        // Donji lijevi dio
        for (let i = 0; i < m / 2; i++) {
            const phi = (2 * Math.PI * i) / m;
            for (let j = 0; j <= n / 2; j++) {
                const theta = (Math.PI * j) / (n / 2); // Mijenjamo n s n / 2
                const x = r * Math.cos(phi) * Math.sin(theta);
                const y = r * Math.sin(phi) * Math.sin(theta);
                const z = -r * Math.cos(theta);
                this.postaviNa(x, y, z);
    
                const iduciPhi = (2 * Math.PI * (i + 1)) / m;
                const iducaTheta = (Math.PI * j) / (n / 2); // Mijenjamo n s n / 2
                const iduciX = r * Math.cos(iduciPhi) * Math.sin(iducaTheta);
                const iduciY = r * Math.sin(iduciPhi) * Math.sin(iducaTheta);
                const iduciZ = -r * Math.cos(iducaTheta);
    
                this.linijaDo(iduciX, iduciY, iduciZ);
                this.povuciLiniju();
            }
        
        }
    
        // Dodavanje meridijana
        for (let j = 0; j <= n / 2; j++) {
            const theta = (Math.PI * j) / n;
            for (let i = 0; i <= m / 2; i++) {
                const phi = (Math.PI * i) / (m/2);
                const x1 = r * Math.cos(phi) * Math.sin(theta);
                const y1 = r * Math.sin(phi) * Math.sin(theta);
                const z1 = -r * Math.cos(theta);
    
                const iduciTheta = (Math.PI * (j + 1)) / n;
                const iduciX = r * Math.cos(phi) * Math.sin(iduciTheta);
                const iduciY = r * Math.sin(phi) * Math.sin(iduciTheta);
                const iduciZ = -r * Math.cos(iduciTheta);
    
                this.postaviNa(x1, y1, z1);
                this.linijaDo(iduciX, iduciY, iduciZ);
                this.povuciLiniju();
            }
        }
    }
    
    nacrtajKocku(a) {
        
        this.postaviNa(-a / 2, -a / 2, -a / 2);
        this.linijaDo(a / 2, -a / 2, -a / 2);
        this.linijaDo(a / 2, a / 2, -a / 2);
        this.linijaDo(-a / 2, a / 2, -a / 2);
        this.linijaDo(-a / 2, -a / 2, -a / 2);
        this.linijaDo(-a / 2, -a / 2, a / 2);
        this.linijaDo(a / 2, -a / 2, a / 2);
        this.linijaDo(a / 2, a / 2, a / 2);
        this.linijaDo(-a / 2, a / 2, a / 2);
        this.linijaDo(-a / 2, -a / 2, a / 2);
        this.povuciLiniju();

        this.postaviNa(a / 2, -a / 2, -a / 2);
        this.linijaDo(a / 2, -a / 2, a / 2);
        this.povuciLiniju();

        this.postaviNa(a / 2, a / 2, -a / 2);
        this.linijaDo(a / 2, a / 2, a / 2);
        this.povuciLiniju();

        this.postaviNa(-a / 2, a / 2, -a / 2);
        this.linijaDo(-a / 2, a / 2, a / 2);
        this.povuciLiniju();
    }
}
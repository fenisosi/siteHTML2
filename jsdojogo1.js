var canvas, ctx, ALTURA, LARGURA, frames = 0, velocidade = 6, s = true

    function jogo(dif, difee) {
        s = true
        document.getElementById("muda_please").textContent = ""
        document.getElementById("muda").textContent = ""
        
    chao = {
        y: 550,
        altura: 50,
        cor: "#ffdf70",

        desenha: function() {
            ctx.fillStyle = this.cor;
            ctx.fillRect(0, this.y, LARGURA, this.altura);
        }
    },

    bloco = {
        x:250,
        y: 275,
        altura: 50,
        largura: 50,
        cor: "#ff4e4e",
        gravidade: 0,
        velocidade: 0,
        forcaDoPulo: 15,
        limitePulo: 100,
        temponc: 0,
        
        atualiza: function() {
            this.velocidade += this.gravidade
            this.y += this.velocidade
            if ((this.y > chao.y - this.altura + 25)) {
                morreu("bateu no chão", difee)
            } 
            if (this.y <= 0 - 5) {
                morreu("bateu no teto", difee)
            }
        },
        pula: function() {
            this.velocidade = -this.forcaDoPulo
        },
        desenha: function() {
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.x, this.y, this.largura, this.altura);
            }
        },
        obstaculos = {   
            x: bloco.x, 
            largura: bloco.largura,
            altura: bloco.altura,
            mais: 100,
            tempo_mudar: 0,
            comeco: false,
            vidas: 3,
            clique: 0,
            redef: 0,
            
            desenha: function() {
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.x, this.y, this.largura, this.altura);
            
            },
            atualiza: function() {
                if ((bloco.y >= this.y - 20) && (bloco.y <= this.y + 20)) {
                    morreu("encostou no bloco", difee);
                    
                
            }
            
            if ((this.tempo_mudar == 0)) {
            this.y = bloco.y + this.mais + Math.floor(200 * Math.random())
            this.tempo_mudar = dif
            }else{
                this.tempo_mudar--
            }
            this.mais--;
            if (s == true) {
            document.getElementById("muda").textContent = "sua distancia minima objeto amarelo: " + this.mais + "\n vidas: " + this.vidas + " seu score: " + this.clique
            }
                if (this.mais == 30) {
                    this.mais = 100
            }
            if ((this.comeco == false)) {
                this.y = bloco.y + 150
                this.mais = 101
            }
            if (s == false) {
                bloco.x = 9000
                this.vidas = 3
            
            }
        }
        }
    function clique(event) {  
        bloco.gravidade = 1.2;
        bloco.pula()
        obstaculos.clique++;
        obstaculos.comeco = true
    }
    function main() {
        ALTURA = window.innerHeight;
        LARGURA = window.innerWidth;

        if (LARGURA <= 550) {
            LARGURA = 600
            ALTURA = 600
        }

        canvas = document.createElement("canvas", {id : "canvas"});
        canvas.width = LARGURA;
        canvas.height = ALTURA;
        canvas.style.border = "1px solid #000";
        ctx = canvas.getContext("2d");
        document.body.appendChild(canvas);
        document.addEventListener("mousedown", clique)
        document.getElementById("muda_please").style.top = 500
        roda();
    }
    function roda() {
        atualiza();
        desenha();

        window.requestAnimationFrame(roda);
    }
    function atualiza() {
        frames++;
        
        bloco.atualiza()
        obstaculos.atualiza()
        
    }
    function desenha() {
        ctx.fillStyle = "#50beff";
        ctx.fillRect(0, 0, LARGURA, ALTURA);

        chao.desenha();
        obstaculos.desenha();
        bloco.desenha();
    }
    
    main() 
    function morreu(por, dife) {
        if (obstaculos.vidas == 0) {
        alert(`você morreu porq ${por} na dificuldade ${dife}`)
        bloco.y = 275
        obstaculos.y = bloco.y - 150
        bloco.gravidade = 0
        bloco.velocidade = 0
        obstaculos.comeco = false
        obstaculos.mais = 100
        obstaculos.vidas = 3
        obstaculos.clique = 0
        s = confirm("quer jogar denovo?")
        if (s == true) {
            return;
        } else {
            var body = document.getElementById("body")
            body.removeChild(canvas)
            bloco.y = 9000
            document.getElementById("muda_please").textContent = ""
            if (s == false) {
                window.location.reload(true);
                document.getElementById("muda").textContent = "atualize a pagina!"
            }
        }
        } else {
            obstaculos.vidas--
            bloco.y = 275
            obstaculos.y = bloco.y - 150
            bloco.gravidade = 0
            bloco.velocidade = 0
            obstaculos.comeco = false
            obstaculos.mais = 100
        }
    }
}
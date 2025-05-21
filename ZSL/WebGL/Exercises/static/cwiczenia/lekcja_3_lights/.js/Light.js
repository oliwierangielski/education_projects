class Light {

        constructor(parametrA, parametrB) {
    
        // przykładowe, nieobowiązkowe parametry konstruktora
        // przekazane podczas tworzenia obiektu klasy Light
        // np scena, kolor światła, wielkość bryły
    
        this.parametrA = parametrA
        this.parametrB = parametrB
    
        // dodatkowe zmienne tworzone w konstruktorze
        // widoczne w dalszych funkcjach
        
        this.zmienna = 0
    
        // pusty kontener na inne obiekty 3D
    
        this.container = new THREE.Object3D();
    
            //wywołanie funkcji init()
    
            this.init()
        }
    
        init() {
    
            // utworzenie i pozycjonowanie światła
    
            this.light = new THREE.SpotLight(0xffffff, 2, 500, Math.PI / 8);
            this.light.position.set(0, 0, 0); // ma być w pozycji 0,0,0 kontenera - nie zmieniamy!!!
    
            // dodanie światła do kontenera
    
            this.container.add(this.light);
    
            //utworzenie widzialnego elementu reprezentującego światło (mały sześcian, kula, czworościan foremny, do wyboru)
    
            this.mesh = new THREE.Mesh()
    
            // dodanie go do kontenera
    
            this.container.add(this.mesh);
        }
    
    
        // funkcja zwracająca obiekt kontenera
        // czyli nasze światło wraz z bryłą
    
        getLight() {
            return this.container;
        }
    
        // przykład innej funkcji, np do zmiany koloru bryły, zmiany koloru światła, etc
    
        changeColor (color) {
            console.log("zmiana koloru na " + color)
        }   
    
    }
    
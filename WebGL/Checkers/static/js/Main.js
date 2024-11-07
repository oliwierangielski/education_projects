let game;
let net;
let ui;
window.onload = () => {
   const main = {}
   main.game = new Game(main)
   main.ui = new Ui(main)
   main.net = new Net(main)
   main.config = main.net.getConfig() // TODO: dokończyć to z configiem + obowiązkowe bicie

}
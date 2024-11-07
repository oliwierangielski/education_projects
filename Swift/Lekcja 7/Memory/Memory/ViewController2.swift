//
//  ViewController2.swift
//  Memory
//
//  Created by Oliwier Angielski on 08/12/2023.
//

import UIKit

struct Puzzle{
    var name: String
    var image: String
    var id: Int
}

struct PuzzleLocation{
    var tag: Int
    var ImageId: Int
    var btn: UIButton
}

class ViewController2: UIViewController {
    var level: Int?

    override func viewDidLoad() {
        super.viewDidLoad()
//        print(level!)
        
        setup()

        // Do any additional setup after loading the view.
    }
    
    func setup(){
        let screenSize: CGRect = UIScreen.main.bounds
        if(level == 0){
            var puzzles = generatePuzzles(puzzlesAmount: 12)
            if(screenSize.width>screenSize.height){
                drawGui(cols: 4, rows: 3, puzzles: puzzles)
            } else {
                drawGui(cols: 3, rows: 4, puzzles: puzzles)
            }
            
        } else if(level == 1){
            var puzzles = generatePuzzles(puzzlesAmount: 28)
            if(screenSize.width>screenSize.height){
                drawGui(cols: 7, rows: 4, puzzles: puzzles)
            } else {
                drawGui(cols: 4, rows: 7, puzzles: puzzles)
            }
            
        }
    }
    
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
            super.viewWillTransition(to: size, with: coordinator)
        self.view.subviews.forEach({$0.removeFromSuperview()})
        setup()
            if UIDevice.current.orientation.isLandscape {
                print("Landscape")
                
                
            } else {
                print("Portrait")
                
            }
        }
    
    func generatePuzzles(puzzlesAmount: Int) -> Array<Puzzle>{
        var puzzlesArray: [Puzzle] = []
        var images: [Puzzle] = [
            Puzzle(name: "Cabbage", image: "images/Cabbage-icon-32.png", id: 1),
            Puzzle(name: "Carrot", image: "images/Carrot-icon-32.png", id: 2),
            Puzzle(name: "Cauliflower", image: "images/Cauliflower-icon-32.png", id: 3),
            Puzzle(name: "Chinese-Cabbage", image: "images/Chinese-Cabbage-icon-32.png", id: 4),
            Puzzle(name: "Corn", image: "images/Corn-icon-32.png", id: 5),
            Puzzle(name: "Cucumber", image: "images/Cucumber-icon-32.png", id: 6),
            Puzzle(name: "Eggplant", image: "images/Eggplant-icon-32.png", id: 7),
            Puzzle(name: "Garlic", image: "images/Garlic-icon-32.png", id: 8),
            Puzzle(name: "Ginger", image: "images/Ginger-icon-32.png", id: 9),
            Puzzle(name: "Green-Onion", image: "images/Green-Onion-icon-32.png", id: 10),
            Puzzle(name: "Green-Pepper", image: "images/Green-Pepper-icon-32.png", id: 11),
            Puzzle(name: "Japanese-Radish", image: "images/Japanese-Radish-icon-32.png", id: 12),
            Puzzle(name: "Leaf-Lettuce", image: "images/Leaf-Lettuce-icon-32.png", id: 13),
            Puzzle(name: "Lettuce", image: "images/Lettuce-icon-32.png", id: 14),
            Puzzle(name: "Red-Onion", image: "images/Red-Onion-icon-32.png", id: 15),
            Puzzle(name: "Snowpea", image: "images/Snowpea-icon-32.png", id: 16),
            Puzzle(name: "Sweet-Potato", image: "images/Sweet-Potato-icon-32.png", id: 17)
        ]
        
        while(puzzlesArray.count < puzzlesAmount){
            var puzzle: Puzzle = images[Int.random(in: 0...16)]
            if(puzzlesArray.filter{$0.name == puzzle.name}.count==0){
//                print(puzzle.name)
                puzzlesArray.append(puzzle)
                puzzlesArray.append(puzzle)
            }
        }
        
        
//        if(cols == 4 && rows == 7){
//            while(puzzlesArray.count < 14){
//                var puzzle: Puzzle = images[Int.random(in: 0...16)]
//                if(puzzlesArray.filter{$0.name == puzzle.name}.count==0){
//                    puzzlesArray.append(puzzle)
//                }
//            }
//        } else if(cols == 3 && rows == 4){
//
//
//        }
        
        return puzzlesArray
    }
    
    func showAlert(moves: Int, score: Int){
        let backAction = UIAlertAction(title: "Powrót",
                                style: .default) { (action) in
            // Respond to user selection of the action.
            self.navigationController?.popViewController(animated: true)
           }
        
        let alert = UIAlertController(title: "Koniec Gry",
                 message: "Ilość ruchów: \(moves), Wynik: \(score)",
                 preferredStyle: .alert)
                alert.addAction(backAction)
//           alert.addAction(cancelAction)
        self.present(alert, animated: true, completion: nil)
    }
    
    func drawGui(cols: Int, rows: Int, puzzles: [Puzzle]){
        var score = 0
        let maxScore = cols*rows/2
        var moves = 0
        let screenSize: CGRect = UIScreen.main.bounds
        let navHeight = Int(self.navigationController?.navigationBar.bounds.height ?? 0)
        let statusBarHeight = Int(UIApplication.shared.statusBarFrame.height)
        let offset = 20
        let offsetColSum = offset*(cols+1)
        let offsetRowSum = offset*(rows+1)
        let size = min( (Int(screenSize.width) - offsetColSum)/cols, (Int(screenSize.height)-navHeight-statusBarHeight - offsetRowSum)/rows)
        let offsetMarginX = (Int(screenSize.width)-size*cols-offsetColSum)/2
        let offsetMarginY = (Int(screenSize.height) - navHeight-statusBarHeight-size*rows-offsetRowSum)/2
        
        var puzzelsList = puzzles
        
//        var nowClicked: [String: Int] = [:]
        var nowClicked: [PuzzleLocation] = []
        
        
        
        for i in (0..<cols){
            for y in (0..<rows){
//                var randomImageIndex = 0
//                if puzzelsList.count
                 let randomImageIndex = Int.random(in: 0..<puzzelsList.count)
                let thisPuzzle = puzzelsList[randomImageIndex]
                puzzelsList.remove(at: randomImageIndex)
            
//                print(puzzelsList.count)
                let button : UIButton = UIButton()
//                button.puzzle = puzzles[randomImageIndex]
                    let img = UIImage(named : "images/memory.png")!    //dodaj ten folder do projektu (przeciągnij)
                    button.frame = CGRect(x: i*size + offset*(i+1) + offsetMarginX , y: y*size + offset*(y+1) + offsetMarginY +  navHeight+statusBarHeight, width: size, height: size) // rozmiar i punkt wstwienia
                button.tag = (y+1)*10 + i+1 //mozna dodac liczbowy tag
//                    button.tag = thisPuzzle.id
                    button.setBackgroundImage(img, for: UIControl.State.normal) // dodanie tła
                    button.backgroundColor = UIColor.gray
//                    button.addTarget(self, action: #selector(onClick), for: UIControl.Event.touchUpInside)
                button.addAction(UIAction(title: "Click Me", handler: { _ in
                    if(nowClicked.count < 2 ){
                        if(nowClicked.filter{$0.tag == button.tag}.count == 0){
                            
                            nowClicked.append(PuzzleLocation(tag: button.tag, ImageId: thisPuzzle.id, btn: button))
                            button.setBackgroundImage(UIImage(named:thisPuzzle.image), for: UIControl.State.normal)
                            
                            
                            
                            if(nowClicked.count == 2){
                                moves+=1
                                print(nowClicked[0], nowClicked[1])
                                if(nowClicked[0].ImageId == nowClicked[1].ImageId){
                                    print("xd")
                                    score+=1
                                    nowClicked.forEach{
                                        $0.btn.isEnabled = false
                                    }
                                    nowClicked.removeAll()
                                    print(score, maxScore)
                                    if(score==maxScore){
                                        
                                        self.showAlert(moves: moves, score: score)
                                    }
                                    
                                } else {
                                    DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
//                                        if(nowClicked.filter{$0.tag == button.tag}.count > 0){
//                                            button.setBackgroundImage(UIImage(named: "images/memory.png"), for: UIControl.State.normal)
//                                            let index = nowClicked.filter{$0.tag == button.tag}.startIndex
                                            
//                                            nowClicked.remove(at: index)
                                        nowClicked.forEach{
                                            $0.btn.setBackgroundImage(UIImage(named: "images/memory.png"), for: UIControl.State.normal)
                                        }
                                        nowClicked.removeAll()
//                                        }
                                    }
                                }
                            }
                            
                            
                        }
                    }
                    
//                    if(nowClicked.count < 2){
//                        nowClicked.append(button.tag)
//                        button.setBackgroundImage(UIImage(named: "images/memory.png"), for: UIControl.State.normal)
//                        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
//                            button.setBackgroundImage(UIImage(named: thisPuzzle.image), for: UIControl.State.normal)
////                            if(nowClicked.count == 2){
////                                if(nowClicked[0] == nowClicked[1]){
////                                    print("para")
////                                    nowClicked.removeAll()
////                                }
////                            }
////                            print(nowClicked)
////
////                            if(nowClicked.filter{$0 == button.tag}.count > 1){
////                                let index = nowClicked.filter{$0 == button.tag}.startIndex
////                                button.setBackgroundImage(img, for: UIControl.State.normal) // dodanie tła
////                                nowClicked.remove(at: index)
////
////                            }
////
//////                            let index = nowClicked.filter{$0 == button.tag}.startIndex
//////                            nowClicked.remove(at: index)
//                        }
//                    }
                    
                }), for: .touchUpInside)
//                button.backgroundColor =
                    self.view.addSubview(button) //dodanie buttona do widoku
            }
        }
    }
    
    @objc func onClick(sender:UIButton){ //@objc (atrybut) -> dostępna w objC
//        print(sender.tag)
//        sender.setBackgroundImage(UIImage(named: ), for: <#T##UIControl.State#>)
            }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}

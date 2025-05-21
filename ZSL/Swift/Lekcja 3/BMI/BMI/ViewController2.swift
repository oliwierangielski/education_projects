//
//  ViewController2.swift
//  BMI
//
//  Created by Oliwier Angielski on 06/10/2023.
//

import UIKit

class ViewController2: UIViewController {

    
    @IBOutlet weak var weightTextField: UITextField!
    
//    @IBAction func button(_ sender: Any) {
//    }
    @IBOutlet weak var heightTextField: UITextField!
    
    @IBOutlet weak var imageView: UIImageView!
    
    
    @IBOutlet weak var resultLabel: UILabel!
    
    @IBOutlet weak var button: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }
    
    func checkIfDouble(s: String) -> Bool {
        return Double(s) != nil
    }
    
    
    @IBAction func click(_ sender: UIButton) {
        
        if let weight = weightTextField.text, let height = heightTextField.text {
            let parsedWeight = (weight as NSString).doubleValue
            let parsedHeight = (height as NSString).doubleValue
            if(checkIfDouble(s: weight) && checkIfDouble(s: height) && parsedWeight > 0 && parsedHeight > 0){
                let bmi:Double = parsedWeight / pow(parsedHeight/100.0, 2)
                resultLabel.text = "Twoje BMI: \((bmi*10).rounded()/10)"
                if(bmi < 18.5){ // nideowaga
                    imageView.image = UIImage(named: "Underweight")
                } else if(bmi >= 25){ // nadwaga
                    imageView.image = UIImage(named: "Overweight")
                } else { // idealna waga
                    imageView.image = UIImage(named: "Idealweight")
                }
            } else {
                resultLabel.text = "Twoje BMI: Błędne dane"
                imageView.image = UIImage()
            }
        }
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

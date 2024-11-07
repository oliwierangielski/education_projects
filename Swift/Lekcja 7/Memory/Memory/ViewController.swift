//
//  ViewController.swift
//  Memory
//
//  Created by Oliwier Angielski on 08/12/2023.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var segmentedControl: UISegmentedControl!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
                    let dest = segue.destination as! ViewController2
        dest.level = segmentedControl.selectedSegmentIndex
                }


}


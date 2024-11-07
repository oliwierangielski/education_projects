//
//  ViewController.swift
//  Core Data
//
//  Created by Oliwier Angielski on 18/04/2024.
//

import UIKit
import CoreData

class TableData: UITableViewCell {
    @IBOutlet weak var name: UILabel!
    @IBOutlet weak var surname: UILabel!
    @IBOutlet weak var pesel: UILabel!
}


class ViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    
    var items:[Person]?
    var ctx: NSManagedObjectContext?
    var addAction : UIAlertAction?
    var isInputNameEmpty = true
    var isInputSurnameEmpty = true
    var isPeselValid = false
    

    @IBAction func personBtn(_ sender: Any) {
        showInputDialog()
    }
    
    
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let edit = UIContextualAction(style: .normal, title: "Edit") {(action, view, completionHandler) in
            // akcja
            print("edit")
            self.showInputDialog(name: self.items![indexPath.row].name!, surname: self.items![indexPath.row].surname!, pesel: self.items![indexPath.row].pesel!, edit: true, index: indexPath.row)

        }
            let delete = UIContextualAction(style: .destructive, title: "Delete") {(action, view, completionHandler) in
                // akcja
                let toDelete = self.items![indexPath.row]
                self.ctx!.delete(toDelete)
                try! self.ctx!.save()
                self.reloadData()
                print("delete")

            }
            return UISwipeActionsConfiguration(actions: [edit, delete])
        }
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return items!.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tab.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! TableData;
        
        if(items!.count > 0){
            cell.name.text = items?[indexPath.row].name
            cell.surname.text = items?[indexPath.row].surname
            cell.pesel.text = items?[indexPath.row].pesel
        }
        

//        indexPath.row - aktualny wiersz
        return cell
    }
    
    
    func reloadData(){
        do{
            self.items = try ctx!.fetch(Person.fetchRequest())
            self.items!.sort { $0.surname! < $1.surname! }
            tab.reloadData()
        }catch{
        }
    }
    
    func sprawdzPesel(nrpesel: String) -> Bool{
        var sum: Int = 0
        let wagi = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3, 1]
        for i in (0..<11){
            sum += wagi[i] * (nrpesel[nrpesel.index(nrpesel.startIndex, offsetBy: i)].wholeNumberValue ?? 0)
        }

        return !(sum%10==0)
    }
    

    @IBOutlet weak var tab: UITableView!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        tab.delegate = self;
        tab.dataSource = self;
        
         ctx = (UIApplication.shared.delegate as! AppDelegate).persistentContainer.viewContext   // właściwość
        reloadData()
        
        
    }
    
    @objc func textFieldPeselDidChange(_ textField: UITextField) {
        let text = textField.text ?? ""
        self.isPeselValid = true
        if(text.count != 11){
            self.addAction!.isEnabled = false
            self.isPeselValid = false
        } else if(self.sprawdzPesel(nrpesel: textField.text ?? "")  ){
            self.addAction!.isEnabled = false
            self.isPeselValid = false
        } else if(self.isInputNameEmpty == false && self.isInputSurnameEmpty == false) {
            self.addAction!.isEnabled = true
        }
       }
    
    @objc func isFieldNameEmpty(_ textField: UITextField) {
        let text = textField.text ?? ""
        self.isInputNameEmpty = false
        if(text == ""){
            self.addAction!.isEnabled = false
            self.isInputNameEmpty = true
        } else if(self.isPeselValid && self.isInputSurnameEmpty == false) {
            self.addAction!.isEnabled = true
        }
       }
    
    @objc func isFieldSurnameEmpty(_ textField: UITextField) {
        let text = textField.text ?? ""
        self.isInputSurnameEmpty = false
        if(text == ""){
            self.addAction!.isEnabled = false
            self.isInputSurnameEmpty = true
        } else if(self.isPeselValid && self.isInputNameEmpty == false) {
            self.addAction!.isEnabled = true
        }
       }
    
    
    
    func showInputDialog(name: String = "", surname: String = "", pesel: String = "", edit: Bool = false,  index: Int? = nil) {
        if(edit == false){
            self.isPeselValid = false
            self.isInputNameEmpty = true
            self.isInputSurnameEmpty = true
        } else {
            self.isPeselValid = true
            self.isInputNameEmpty = false
            self.isInputSurnameEmpty = false
        }
        
            let alertController = UIAlertController(title: (!edit ? "Dodaj dane" : "Zmień dane"), message: nil, preferredStyle: .alert)
            
            // Dodaj pola tekstowe do UIAlert
            alertController.addTextField { (textField) in
                textField.placeholder = "Imię"
                textField.text = name
            }
            alertController.addTextField { (textField) in
                textField.placeholder = "Nazwisko"
                textField.text = surname
            }
            alertController.addTextField { (textField) in
                textField.placeholder = "Pesel"
                textField.text = pesel
            }
        
        alertController.textFields?[0].addTarget(self, action: #selector(isFieldNameEmpty(_:)), for: .editingChanged)
        alertController.textFields?[1].addTarget(self, action: #selector(isFieldSurnameEmpty(_:)), for: .editingChanged)
        alertController.textFields?[2].addTarget(self, action: #selector(textFieldPeselDidChange(_:)), for: .editingChanged)
        
            
           
            
        addAction = UIAlertAction(title: (!edit ? "Dodaj" : "Zmień"), style: .default) { [weak self] (_) in
                guard let textField1 = alertController.textFields?[0],
                      let textField2 = alertController.textFields?[1],
                      let textField3 = alertController.textFields?[2],
                      let input1 = textField1.text,
                      let input2 = textField2.text,
                      let input3 = textField3.text else {
                    return
                }
            
                
                let newPerson = Person(context: self!.ctx!)
                newPerson.name = input1 // name - atrybut w "bazie"
                newPerson.surname = input2
                newPerson.pesel = input3
            
            if(edit){
                let toDelete = self!.items![index!]
                self!.ctx!.delete(toDelete)
            }
                

                try! self!.ctx!.save()
                self!.reloadData()

            }
        addAction?.isEnabled = false
            alertController.addAction(addAction!)
            
            
            let cancelAction = UIAlertAction(title: "Anuluj", style: .cancel, handler: nil)
            alertController.addAction(cancelAction)
            
            
            present(alertController, animated: true, completion: nil)
        }


}




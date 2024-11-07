//
//  ViewController.swift
//  Stoper
//
//  Created by Oliwier Angielski on 19/01/2024.
//

import UIKit

class TableData : UITableViewCell {
    
    @IBOutlet weak var left: UILabel!
    
    @IBOutlet weak var mid: UILabel!
    
    @IBOutlet weak var right: UILabel!
}

class ViewController: UIViewController, UITableViewDelegate, UITableViewDataSource, UIScrollViewDelegate {
    
    struct timeRow {
        var indirectTime: Date
        var combinedTime: Date
    }
    
    var data: [timeRow] = []
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        print("you tapped me")
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return data.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! TableData;
        
        cell.left.text = "Runda \(data.count - indexPath.row)"
        cell.mid.text = dateToString(date: data[indexPath.row].indirectTime)
        cell.right.text = dateToString(date: data[indexPath.row].combinedTime)
        //        cell.mid.text = dateToString(date: (indexPath.row+1 != data.count ? countTimeDelta(date1: data[indexPath.row], date2: data[indexPath.row+1], timeOffset: 0) : data[indexPath.row]))
//        cell.right.text = dateToString(date: data[indexPath.row])
        
        
//        print(data.last?.indirectTime.timeIntervalSinceReferenceDate)
        if(data.count >= 3){
            var color: UIColor = .black
            let indirectTimes = data.suffix(from: 1).map(\.indirectTime)
//            indirectTimes.forEach({
//                print($0.timeIntervalSinceReferenceDate)
//            })
            if( data[indexPath.row].indirectTime == indirectTimes.min()){
                color = .green
            } else if( data[indexPath.row].indirectTime == indirectTimes.max() ){
                color = .red
            }
            cell.left.textColor = color
            cell.mid.textColor = color
            cell.right.textColor = color
        } else {
            cell.left.textColor = .black
            cell.mid.textColor = .black
            cell.right.textColor = .black
        }
        return cell;
    }
    
//    func numberOfSections(in tableView: UITableView) -> Int {
//        return 1
//    }
//    
//    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
//        print("sec:",section);
//        return 4
//    }
    
    
  
    
//    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
//        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! TableData;
//        //cell.left.text = "Test \(indexPath.row)"
//        //cell.left.text = "Test2"
//        cell.left.text = "Test3"
//        cell.mid.text = "lol"
//        print("lol" , indexPath)
//        
//        return cell
//    }
    

    @IBOutlet weak var pageControl: UIPageControl!
    
    @IBOutlet weak var scrollView: UIScrollView!
    @IBOutlet weak var tableView: UITableView!
    var isTimerActive = false
    var timer: Timer? = nil
    var firstDate: Date? = nil
    var delta: TimeInterval? = nil
    var slides: Array<Any> = []
    @IBOutlet weak var resetBtnOutlet: UIButton!
    
    func countTimeDelta(date1: Date, date2: Date) -> Date{
        delta = date1.timeIntervalSinceReferenceDate - date2.timeIntervalSinceReferenceDate
        return Date(timeIntervalSinceReferenceDate: delta!)
    }
    
    
    func dateToString(date: Date) -> String {
        let df = DateFormatter();
        df.locale = Locale(identifier: "pl_PL")
        df.setLocalizedDateFormatFromTemplate("mm:ss,SS")
        df.timeZone = TimeZone(secondsFromGMT: 3600)
        return df.string(from: date)
    }
    
    @objc func updateTime(){
        let combinedTime = countTimeDelta(date1: Date(), date2: firstDate!)
        let indirectTime = (data.count > 1) ? countTimeDelta(date1: combinedTime, date2: data[1].combinedTime) : combinedTime
        data[0] = timeRow(indirectTime: indirectTime, combinedTime: combinedTime)
        (slides[0] as! SlideA).timeLabel.text = dateToString(date: combinedTime)
        (slides[1] as! SlideB).updateAndRedraw(combinedTime: combinedTime, redirectTime: indirectTime)
        tableView.reloadData()
//        let reloadPath = IndexPath(row: 0, section: 0)
//        tableView.reloadRows(at: [reloadPath], with: .none)
    }
    
    @IBAction func startBtn(_ sender: UIButton) {
        if(!isTimerActive){
            isTimerActive = !isTimerActive
            if(firstDate == nil){
                firstDate = Date()
//                data.append(countTimeDelta(date1: Date(), date2: firstDate!))
                let time = countTimeDelta(date1: Date(), date2: firstDate!)
                data.append(timeRow(indirectTime: time, combinedTime: time))
                tableView.reloadData()
                print(data)
            } else {
                firstDate! = Date(timeIntervalSinceReferenceDate: (Date().timeIntervalSinceReferenceDate - delta!))
            }
            sender.setTitle("STOP", for: .normal)
            sender.setTitleColor(.red, for: .normal)
            resetBtnOutlet.setTitle("RUNDA", for: .normal)
            
             timer = Timer.scheduledTimer(timeInterval: 0.01, target: self, selector: #selector(self.updateTime), userInfo: nil, repeats: true)
            RunLoop.current.add(timer!, forMode: .common);
        } else {
            timer?.invalidate(); //zatrzymanie
            isTimerActive = !isTimerActive
            sender.setTitle("START", for: .normal)
            sender.setTitleColor(.green, for: .normal)
            resetBtnOutlet.setTitle("WYZERUJ", for: .normal)
        }
        
        
        
    }
    @IBAction func resetBtn(_ sender: UIButton) {
        if(!isTimerActive){
            //Wyzeruj
//            delta = -3600
            (slides[0] as! SlideA).timeLabel.text = "00:00,00"
            (slides[1] as! SlideB).updateAndRedraw(combinedTime: Date(timeIntervalSinceReferenceDate: 0))
            data.removeAll()
            firstDate=nil
            tableView.reloadData()
        } else {
            //Runda
//            data.append(countTimeDelta(date1: Date(), date2: firstDate!))
//            data.insert(countTimeDelta(date1: Date(), date2: firstDate!), at: 0)
            let combinedTime = countTimeDelta(date1: Date(), date2: firstDate!)
            let indirectTime = countTimeDelta(date1: combinedTime, date2: data[0].combinedTime)
            data.insert(timeRow(indirectTime: indirectTime, combinedTime: combinedTime), at: 0)
            tableView.reloadData()
        }
    }
    
    
   
    override func viewDidLoad() {
        super.viewDidLoad()
        slides = setupSlides()
        tableView.delegate = self
        tableView.dataSource = self;
        scrollView.delegate = self
    }
    
    func setupSlides() -> [Any] {
        var slides = Array<Any>()
        scrollView.frame = CGRect(x: 0, y: 0, width: view.frame.width, height: view.frame.height)
        scrollView.contentSize = CGSize(width: view.frame.width*2, height: view.frame.height-24)
        scrollView.isPagingEnabled = true    // w przypadku dwóch widoków - nadmiarowe
        // odpowiednie paski przewijania
        scrollView.showsVerticalScrollIndicator = false
        scrollView.showsHorizontalScrollIndicator = false
        scrollView.isDirectionalLockEnabled = true
        let slideA : SlideA = Bundle.main.loadNibNamed("SlideA", owner: self, options: nil)?.first as! SlideA
        let slideB : SlideB = Bundle.main.loadNibNamed("SlideB", owner: self, options: nil)?.first as! SlideB
        
        slideA.frame = CGRect(x: 0, y: 0, width: view.frame.width, height: view.frame.height)
        slideB.frame = CGRect(x: view.frame.width, y: 0, width: view.frame.width, height: view.frame.height)
        slides = [slideA, slideB]
        
        scrollView.addSubview(slideA)
        scrollView.addSubview(slideB)
        
        pageControl.addTarget(self, action: #selector(self.change(_:)), for: .valueChanged)
        
        pageControl.numberOfPages = slides.count
        pageControl.currentPage = 0
        
        slideB.updateAndRedraw(combinedTime: Date(timeIntervalSinceReferenceDate: 0))
        
        return slides

    }
    
    
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        let pageIndex = round(scrollView.contentOffset.x/view.frame.width)
        pageControl.currentPage = Int(pageIndex)
    }
    
    @IBAction func change(_ sender: UIPageControl) {
        let x = CGFloat(sender.currentPage) * view.frame.width
//        scrollView.contentOffset = CGPoint(x: x, y: 0)
        scrollView.setContentOffset(CGPoint(x: x, y: 0), animated: true)
    }
    
   


}

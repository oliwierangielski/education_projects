import UIKit

class SlideB: UIView {

    @IBOutlet weak var imageView: UIImageView!
    private var currentTime: Date = Date()
    private var roundTime: Date? = nil
    private var lastStepNr: Int = 0

    func updateAndRedraw(combinedTime: Date, redirectTime: Date? = nil) {
        currentTime = combinedTime
        roundTime = redirectTime
        setNeedsDisplay()
    }
    
    func dateToString(date: Date) -> String {
        let df = DateFormatter();
        df.locale = Locale(identifier: "pl_PL")
        df.setLocalizedDateFormatFromTemplate("mm:ss,SS")
        df.timeZone = TimeZone(secondsFromGMT: 3600)
        return df.string(from: date)
    }

//    override func draw(_ rect: CGRect) {
//        super.draw(rect)
//        
//        if let time = currentTime {
//            drawTime(time: time)
//        }
//    }
    
    
    func invCor(def: Double, max: Double, min: Double) -> Double{
        let diameter = max - min //461
//        let result = (max+min)/2 + def*diameter
        let result = min + (def+1)/2*diameter
        return result
    }
    
    func drawClockHand(ctx: CGContext, time: Date, countInSecond: Int, lineWidth: CGFloat, color: CGColor, xMin: Double, xMax: Double, yMin: Double, yMax: Double){
        
        // Pobieramy współrzędne środka obrazka
        let imageCenter = imageView.center
        
        print("\(yMin), \(yMax)")
        print("\(imageCenter.x), - \(  (yMin+yMax)/2) )")
        
        
        ctx.setLineWidth(lineWidth)
        ctx.setStrokeColor(color)
        ctx.move(to: CGPoint(x: (xMin+xMax)/2, y: (yMin+yMax)/2))
//        let countInSecond: Int =
        var time  = Int(time.timeIntervalSinceReferenceDate*Double(countInSecond))
//        time=5
        let timeInSec = time%(60*countInSecond)
        
        print(timeInSec)
    
        if(lastStepNr != timeInSec){
            lastStepNr = timeInSec
        }
        let movDiam = 6.0/Double(countInSecond)
        let rad = Double(lastStepNr) * movDiam * Double.pi/180
        let x = invCor(def: sin(rad), max: xMax, min: xMin)
        let y = invCor(def: -1*cos(rad), max: yMax, min: yMin)
        
        ctx.addLine(to: CGPoint(x: CGFloat(x), y: CGFloat(y)))
        ctx.strokePath()
    }


    override func draw(_ rect: CGRect) {
        super.draw(rect)
        
        guard let ctx = UIGraphicsGetCurrentContext() else { return }
        
        drawClockHand(ctx: ctx, time: currentTime, countInSecond: 20, lineWidth: 3, color: UIColor.orange.cgColor, xMin: imageView.frame.minX, xMax: imageView.frame.maxX, yMin: imageView.frame.minY, yMax: imageView.frame.maxY)
        
        if(roundTime != nil && roundTime != currentTime){
            drawClockHand(ctx: ctx, time: roundTime!, countInSecond: 20, lineWidth: 3, color: UIColor.blue.cgColor, xMin: imageView.frame.minX, xMax: imageView.frame.maxX, yMin: imageView.frame.minY, yMax: imageView.frame.maxY)
        }
        let ic = imageView.center
        drawClockHand(ctx: ctx, time: Date(timeIntervalSinceReferenceDate:  currentTime.timeIntervalSinceReferenceDate/60), countInSecond: 20, lineWidth: 3, color: UIColor.orange.cgColor, xMin: ic.x - 65, xMax: ic.x+65, yMin: ic.y/2, yMax: (ic.y/2.25)+130)
            
        
        
    
        //Draw String
        let font = UIFont.systemFont(ofSize: 40)
//        let string = NSAttributedString(string: String(lastStepNr), attributes: [NSAttributedString.Key.font: font])
        let string = NSAttributedString(string: dateToString(date: currentTime), attributes: [NSAttributedString.Key.font: font])
        let sizeOfText = CGSize(width: CGFloat.greatestFiniteMagnitude, height: .greatestFiniteMagnitude)
//        string.draw(at: CGPoint(x: 384, y: 275))
        
        string.draw(in: CGRect(x: ic.x-85, y: imageView.frame.maxY/1.5, width: 170, height: 40))
        UIGraphicsPopContext()
    }
}


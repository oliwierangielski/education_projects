import Foundation
struct Photo {
    var image:String = ""
    var name:String = ""
    
    init(image: String, name: String){
        self.image = image
        self.name = name
    }
}
